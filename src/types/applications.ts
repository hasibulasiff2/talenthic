export interface Application {
  id: string;
  internship_id: string;
  applicant_id: string;
  status: string;
  cover_letter: string;
  created_at: string;
  internship: {
    title: string;
  };
  applicant: {
    full_name: string;
    email: string;
  };
}