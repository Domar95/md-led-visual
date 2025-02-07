export type SocialMedia = {
  facebook: string,
  youtube: string,
  instagram: string
}

export type SocialMediaCategory = keyof SocialMedia

export const SOCIAL_MEDIA_URLS: SocialMedia = {
  facebook: 'http://facebook.com',
  youtube: 'http://youtube.com',
  instagram: 'http://instagram.com'
}