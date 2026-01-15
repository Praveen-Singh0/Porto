
export interface PortfolioInfo {
  email: string;
  phone: string;
  location: string;
  profileImage: File | string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}