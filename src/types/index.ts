export interface ServiceRequest {
  id: string;
  created_at: string;
  full_name: string;
  contact_info: string;
  service_type: string;
  location: string;
  description: string;
  preferred_date: string;
  preferred_time: string;
  urgency: string;
  budget: string;
  status: 'pending' | 'contacted' | 'in_progress' | 'completed' | 'cancelled';
}

export interface AdminProfile {
  id: string;
  name: string;
  passcode: string;
}

export interface AgencyStats {
  totalLeads: number;
  pendingLeads: number;
  completedLeads: number;
  totalRevenue: string;
}
