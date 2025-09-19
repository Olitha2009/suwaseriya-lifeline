import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface EmergencyAlert {
  id: string;
  type: string;
  patient_name: string;
  location: string;
  condition: string;
  status: 'active' | 'responding' | 'resolved';
  created_at: string;
}

export const useEmergencyAlerts = () => {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAlerts = async () => {
    try {
      const { data, error } = await supabase
        .from('emergency_alerts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAlerts((data || []) as EmergencyAlert[]);
    } catch (error) {
      console.error('Error fetching alerts:', error);
      toast({
        title: "Error",
        description: "Failed to load emergency alerts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const respondToAlert = async (alertId: string) => {
    try {
      const { error } = await supabase
        .from('emergency_alerts')
        .update({ status: 'responding' })
        .eq('id', alertId);

      if (error) throw error;
      
      await fetchAlerts();
      toast({
        title: "Response Initiated",
        description: "Emergency response team notified",
      });
    } catch (error) {
      console.error('Error responding to alert:', error);
      toast({
        title: "Error",
        description: "Failed to respond to alert",
        variant: "destructive"
      });
    }
  };

  const resolveAlert = async (alertId: string) => {
    try {
      const { error } = await supabase
        .from('emergency_alerts')
        .update({ status: 'resolved' })
        .eq('id', alertId);

      if (error) throw error;
      
      await fetchAlerts();
      toast({
        title: "Alert Resolved",
        description: "Emergency alert marked as resolved",
      });
    } catch (error) {
      console.error('Error resolving alert:', error);
      toast({
        title: "Error",
        description: "Failed to resolve alert",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchAlerts();

    // Set up real-time subscription
    const channel = supabase
      .channel('alerts-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'emergency_alerts'
      }, () => {
        fetchAlerts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    alerts,
    loading,
    respondToAlert,
    resolveAlert,
    refetch: fetchAlerts
  };
};