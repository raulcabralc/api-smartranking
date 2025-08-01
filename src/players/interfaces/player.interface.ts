import { Document } from "mongoose";

export interface Player extends Document {
  readonly phoneNumber: number;
  readonly email: string;
  name: string;
  ranking: string;
  rankingPosition: number;
  photoUrl: string;
}
