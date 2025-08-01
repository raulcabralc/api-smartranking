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

  async createUpdatePlayer(body: CreatePlayerDTO): Promise<Player> {
    const { email } = body;

    const player = await this.exists(email);

    if (player) {
      await this.update(player, body);

      return player;
    }

    this.logger.log("createsPlayerDTO:", body);

    const playerCreated = await this.create(body);

    return playerCreated;
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

  async deletePlayer(email: string): Promise<Error | Player> {
    const player = await this.exists(email);

    if (player) {
      await this.delete(player);

      return player;
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

  private async delete(player: Player): Promise<Error | Player> {
    const index = this.players.indexOf(player);

    if (index > -1) {
      // eslint-disable-next-line @typescript-eslint/await-thenable
      await this.players.splice(index, 1);

      return player;
    }

    return {
      errors: ["player not found"],
    };
  }

  private async exists(email: string): Promise<Player | undefined> {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    return await this.players.find((player) => player.email === email);
  }
}
