import { Injectable } from "@nestjs/common";
import { CreatePlayerDTO } from "./dto/create-player.dto";

@Injectable()
export class PlayersService {
  constructor() {}

  create(body: CreatePlayerDTO) {
    return body;
  }
}
