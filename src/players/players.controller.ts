import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  Delete,
  Patch,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { PlayersService } from "./players.service";
import { CreatePlayerDTO } from "./dto/create-player.dto";
import { Player } from "./interfaces/player.interface";
import { Error } from "src/utils/interfaces/error.interface";
import { PlayerQueryValidationPipe } from "./pipes/players-query-validation.pipe";
import type { FindOne } from "./interfaces/find-one.interface";

@Controller("/jogadores")
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  async indexPlayers(): Promise<Player[]> {
    return await this.playersService.indexPlayers();
  }

  @Get("/one")
  async findOnePlayer(
    @Query(PlayerQueryValidationPipe) query: FindOne,
  ): Promise<Error | Player> {
    return await this.playersService.findOnePlayer(
      query.email,
      query.phoneNumber,
    );
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(@Body() body: CreatePlayerDTO) {
    return await this.playersService.createPlayer(body);
  }

  @Patch("/:email")
  async updatePlayer(
    @Query("email") email: string,
    @Body() body: CreatePlayerDTO,
  ) {
    return await this.playersService.updatePlayer(email, body);
  }

  @Delete("/:email")
  async deletePlayer(
    @Query("email") email: string,
    phoneNumber: string,
  ): Promise<Error | Player> {
    return await this.playersService.deletePlayer(email, phoneNumber);
  }
}
