-- Create patients table
CREATE TABLE public.patients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  condition TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('critical', 'monitoring', 'stable')),
  last_update TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  location TEXT NOT NULL,
  allergies TEXT[] DEFAULT '{}',
  medications TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create vitals table
CREATE TABLE public.vitals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  heart_rate INTEGER NOT NULL,
  blood_pressure_systolic INTEGER NOT NULL,
  blood_pressure_diastolic INTEGER NOT NULL,
  temperature DECIMAL(4,2) NOT NULL,
  oxygen_saturation INTEGER NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create emergency_alerts table
CREATE TABLE public.emergency_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL,
  patient_name TEXT NOT NULL,
  location TEXT NOT NULL,
  condition TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'responding', 'resolved')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create messages table  
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (medical emergency system)
CREATE POLICY "Allow all access to patients" ON public.patients FOR ALL USING (true);
CREATE POLICY "Allow all access to vitals" ON public.vitals FOR ALL USING (true);
CREATE POLICY "Allow all access to emergency_alerts" ON public.emergency_alerts FOR ALL USING (true);
CREATE POLICY "Allow all access to messages" ON public.messages FOR ALL USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_patients_updated_at
  BEFORE UPDATE ON public.patients
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_emergency_alerts_updated_at
  BEFORE UPDATE ON public.emergency_alerts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO public.patients (name, age, condition, status, location, allergies, medications) VALUES
('John Smith', 65, 'Acute Myocardial Infarction', 'critical', 'Ambulance Unit 7', ARRAY['Penicillin', 'Aspirin'], ARRAY['Metoprolol', 'Lisinopril']),
('Maria Garcia', 58, 'Unstable Angina', 'monitoring', 'Emergency Room', ARRAY['Latex'], ARRAY['Atorvastatin', 'Clopidogrel']);

INSERT INTO public.vitals (patient_id, heart_rate, blood_pressure_systolic, blood_pressure_diastolic, temperature, oxygen_saturation) 
SELECT id, 92, 140, 90, 37.2, 95 FROM public.patients WHERE name = 'John Smith'
UNION ALL
SELECT id, 78, 130, 85, 36.8, 98 FROM public.patients WHERE name = 'Maria Garcia';

INSERT INTO public.emergency_alerts (type, patient_name, location, condition, status) VALUES
('Cardiac Emergency', 'John Smith', 'Ambulance Unit 7', 'Acute MI', 'active'),
('High Priority', 'Maria Garcia', 'Emergency Room', 'Chest Pain', 'responding');

INSERT INTO public.messages (sender, role, content) VALUES
('Dr. Sarah Wilson', 'Doctor', 'Patient vitals looking stable. Continue monitoring.'),
('Paramedic Jones', 'Ambulance', 'ETA 5 minutes to hospital'),
('Nurse Patricia', 'Nurse', 'IV access established, medications administered');