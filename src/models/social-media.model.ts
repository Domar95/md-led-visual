export type SocialMedia = {
  facebook: string;
  youtube: string;
  instagram: string;
};

export type SocialMediaCategory = keyof SocialMedia;

export const SOCIAL_MEDIA_URLS: SocialMedia = {
  facebook: 'http://facebook.com/profile.php?id=61555615919454',
  youtube: 'http://youtube.com/@domaradzkimarcin',
  instagram: 'http://instagram.com',
};
