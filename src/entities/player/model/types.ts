export type Player = {
  id: number;
  number: number;
  name: string;
  position: string;
  image: string;
  bio: string;
  joinedDate: string;
  height: string;
  weight: string;
};

export type PlayerPayload = Omit<Player, 'id'>;

export type UploadPlayerPhotoResponse = Pick<Player, 'image'>;
