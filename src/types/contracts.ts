export type ContractType = 'standard' | 'nda' | 'fixed_price' | 'hourly_rate' | 'milestone_based';

export interface ContractTemplate {
  id: string;
  name: string;
  description: string | null;
  content: string;
  type: ContractType;
  is_public: boolean;
  created_by: string | null;
  created_at: string;
}

export interface ContractFormData {
  title: string;
  terms: string;
  payment_type: "fixed" | "hourly";
  fixed_amount?: number;
  hourly_rate?: number;
  duration?: string;
  currency: string;
  payment_schedule?: string;
  template_id?: string;
  type: ContractType;
  requires_signature?: boolean;
}

export interface ContractVersion {
  id: string;
  contract_id: string;
  version_number: number;
  changes: Record<string, any>;
  created_by: string | null;
  created_at: string;
}

export interface ContractSignature {
  id: string;
  contract_id: string;
  signer_id: string;
  signature_data: string;
  signed_at: string;
  ip_address: string | null;
  user_agent: string | null;
}