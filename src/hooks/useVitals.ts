import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Vital {
  id: string;
  patient_id: string;
  heart_rate: number;
  blood_pressure_systolic: number;
  blood_pressure_diastolic: number;
  temperature: number;
  oxygen_saturation: number;
  recorded_at: string;
}

export const useVitals = () => {
  const [vitals, setVitals] = useState<Vital[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchLatestVitals = async () => {
    try {
      const { data, error } = await supabase
        .from('vitals')
        .select('*')
        .order('recorded_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setVitals(data || []);
    } catch (error) {
      console.error('Error fetching vitals:', error);
      toast({
        title: "Error",
        description: "Failed to load vital signs",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestVitals();

    // Set up real-time subscription
    const channel = supabase
      .channel('vitals-changes')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'vitals'
      }, () => {
        fetchLatestVitals();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    vitals,
    loading,
    refetch: fetchLatestVitals
  };
};