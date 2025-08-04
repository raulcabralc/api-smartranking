import { Injectable } from "@nestjs/common";
import { CreatePlayerDTO } from "./dto/create-player.dto";
import { Player } from "./interfaces/player.interface";
import { Error } from "src/utils/interfaces/error.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Falsy } from "rxjs";

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel("Player") private readonly playerModel: Model<Player>,
  ) {}

  async createPlayer(body: CreatePlayerDTO): Promise<Player | Error> {
    const playerExists = await this.exists(body.email, body.phoneNumber);

    if (!playerExists) {
      const playerCreated = await this.create(body);

      return playerCreated;
    }

    return {
      errors: ["phone number or email is already registered"],
    };
  }

  async updatePlayer(
    id: string,
    body: CreatePlayerDTO,
  ): Promise<Player | Falsy | Error> {
    const player = await this.findOneById(id);

    if (player) {
      const updatedPlayer = await this.update(id, body);

      return updatedPlayer;
    }

    return {
      errors: ["player not found"],
    };
  }

  async indexPlayers(): Promise<Player[]> {
    return await this.playerModel.find().exec();
  }

  async findOnePlayer(
    email: string,
    phoneNumber: string,
  ): Promise<Error | Player> {
    const player = await this.exists(email, phoneNumber);

    if (player) {
      return player;
    }

    return {
      errors: ["player not found"],
    };
  }

  async findOneById(id: string): Promise<Error | Player> {
    const player = await this.playerModel.findById(id).exec();

    if (player) {
      return player as Player;
    }

    return {
      errors: ["player not found"],
    };
  }

  async deletePlayer(id: string): Promise<Error | Player> {
    const player = await this.playerModel.findByIdAndDelete(id);

    if (player) {
      return player;
    }

    return {
      errors: ["player not found"],
    };
  }

  private async create(body: CreatePlayerDTO): Promise<Player> {
    const player: Player = new this.playerModel(body);

    return await player.save();
  }

  private async update(
    id: string,
    body: CreatePlayerDTO,
  ): Promise<Player | Falsy> {
    return await this.playerModel
      .findOneAndUpdate({ id }, { $set: body }, { new: true })
      .exec();
  }

  private async exists(
    email: string,
    phoneNumber: string,
  ): Promise<Player | Falsy> {
    const playerExists = await this.playerModel.findOne({ email }).exec();
    const existsPhone = await this.playerModel
      .findOne({ phoneNumber: phoneNumber })
      .exec();

    return playerExists || existsPhone;
  }
}
