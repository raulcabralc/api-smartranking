import { Injectable, Logger } from "@nestjs/common";
import { CreatePlayerDTO } from "./dto/create-player.dto";
import { Player } from "./interfaces/player.interface";
import { Error } from "src/utils/interfaces/error.interface";

import * as uuid from "uuid";

@Injectable()
export class PlayersService {
  private players: Player[] = [];
  private readonly logger = new Logger(PlayersService.name);

  constructor() {}

  async createUpdatePlayer(body: CreatePlayerDTO): Promise<void> {
    const { email } = body;

    // eslint-disable-next-line @typescript-eslint/await-thenable
    const player = await this.players.find((player) => player.email === email);

    if (player) {
      await this.update(player, body);
    }

    this.logger.log("createsPlayerDTO:", body);

    await this.create(body);
  }

  async indexPlayers(): Promise<Player[]> {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    return await this.players;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async findOnePlayer(email: string): Promise<Error | Player> {
    for (const player of this.players) {
      if (player.email === email) return player;
    }

    return {
      errors: ["player not found"],
    };
  }

  private async create(body: CreatePlayerDTO): Promise<Player> {
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

    // eslint-disable-next-line @typescript-eslint/await-thenable
    await this.players.push(player);

    return player;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  private async update(player: Player, body: CreatePlayerDTO): Promise<Player> {
    const { name } = body;

    player.name = name;

    return player;
  }
}
