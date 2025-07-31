import { Injectable, Logger } from "@nestjs/common";
import { CreatePlayerDTO } from "./dto/create-player.dto";
import { Player } from "./interfaces/player.interface";
import * as uuid from "uuid";

@Injectable()
export class PlayersService {
  private players: Player[] = [];
  private readonly logger = new Logger(PlayersService.name);

  constructor() {}

  createUpdatePlayer(body: CreatePlayerDTO): void {
    this.logger.log("createsPlayerDTO:", body);

    this.create(body);
  }

  private create(body: CreatePlayerDTO): Player {
    const { name, email, phoneNumber } = body;

    const player: Player = {
      _id: uuid.v1(),
      name,
      email,
      phoneNumber,
      ranking: "A",
      rankingPosition: 1,
      photoUrl: "url da foto",
    };

    this.players.push(player);

    return player;
  }
}
