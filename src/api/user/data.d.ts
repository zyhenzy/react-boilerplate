export interface RegisterParams {
  userName: string;
  name: string;
  sex?: 'M' | 'F' | 'O' | null;
  phoneNumber: string;
  countryNumber: string;
  password: string;
  agentId?: string | null;
  role?: string | null;
  enable: boolean;
}
