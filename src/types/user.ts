export interface UserProfile {
  _id: string;
  username: string;
  email: string;
  profilePic?: string;
  roles: string[] | string;
  createdAt?: string;
  status?: "ACTIVE" | "SUSPENDED";
}
