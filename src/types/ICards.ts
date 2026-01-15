export interface IYuGiOh {
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
  image_url: string | null;
};