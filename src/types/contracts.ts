export interface ContractFormData {
  title: string;
  terms: string;
  payment_type: "fixed" | "hourly";
  fixed_amount?: number;
  hourly_rate?: number;
  duration?: string;
  currency: string;
  payment_schedule?: string;
}