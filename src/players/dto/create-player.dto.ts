/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreatePlayerDTO {
  @IsNotEmpty()
  readonly phoneNumber: number;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly name: string;
}
