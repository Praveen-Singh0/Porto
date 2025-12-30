export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
}

export interface PortfolioInfo {
  id: number;
  email?: string;
  phone?: string;
  location?: string;
  profileImage?: string;
  socialLinks?: SocialLinks;
  createdAt: string;
  updatedAt: string;
}
