export type YuGiOhApi = {
  id: number;
  name: string;
  type: string;
  frameType: string;
  desc: string;
  atk: number;
  def: number;
  level: number;
  race: string;
  attribute: string;
  scale: number;
  linkval: number;
  card_images: { image_url: string }[];
};