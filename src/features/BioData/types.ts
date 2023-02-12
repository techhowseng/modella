export type BioCompleteFormType = {
  bio: string;
  DOB: string;
  phone: {
    phone_1: string;
  };
  address?: string;
};

export type SocialFormType = {
  social: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedIn: string;
  };
};

export type ModelAttributesType = {
  height: string;
  bust: string;
  waist: string;
  hip: string;
  shoeSize: string;
  weight: string;
  complexion: string;
  isAvailable: boolean;
};
