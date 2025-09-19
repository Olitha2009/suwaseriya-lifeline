import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  status: 'critical' | 'monitoring' | 'stable';
  last_update: string;
  location: string;
  allergies: string[];
  medications: string[];
}

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPatients = async () => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPatients((data || []) as Patient[]);
    } catch (error) {
      console.error('Error fetching patients:', error);
      toast({
        title: "Error",
        description: "Failed to load patients",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePatientStatus = async (patientId: string, status: Patient['status']) => {
    try {
      const { error } = await supabase
        .from('patients')
        .update({ status, last_update: new Date().toISOString() })
        .eq('id', patientId);

      if (error) throw error;
      
      await fetchPatients();
      toast({
        title: "Success",
        description: "Patient status updated",
      });
    } catch (error) {
      console.error('Error updating patient:', error);
      toast({
        title: "Error",
        description: "Failed to update patient status",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchPatients();

    // Set up real-time subscription
    const channel = supabase
      .channel('patients-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'patients'
      }, () => {
        fetchPatients();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    patients,
    loading,
    updatePatientStatus,
    refetch: fetchPatients
  };
};