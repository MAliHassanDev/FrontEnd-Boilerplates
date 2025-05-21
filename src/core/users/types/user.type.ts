export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  cnic: string;
  photo: string | null;
  id: string;
  createdAt: Date;
  role: number;
  isActive: boolean;
  isPasswordTemporary: boolean;
}
