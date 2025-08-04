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
  Param,
} from "@nestjs/common";
import { PlayersService } from "./players.service";
import { CreatePlayerDTO } from "./dto/create-player.dto";
import { Player } from "./interfaces/player.interface";
import { Error } from "src/utils/interfaces/error.interface";
import { PlayerQueryValidationPipe } from "./pipes/players-query-validation.pipe";
import type { FindOne } from "./interfaces/find-one.interface";
import { PlayerParamValidationPipe } from "./pipes/players-param-validation.pipe";

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

  @Get("/:id")
  async findOneById(@Param("id", PlayerParamValidationPipe) id: string) {
    return await this.playersService.findOneById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(@Body() body: CreatePlayerDTO) {
    return await this.playersService.createPlayer(body);
  }

  @Patch("/:id")
  async updatePlayer(@Param("id") id: string, @Body() body: CreatePlayerDTO) {
    return await this.playersService.updatePlayer(id, body);
  }

  @Delete("/:id")
  async deletePlayer(@Param("id") id: string): Promise<Error | Player> {
    return await this.playersService.deletePlayer(id);
  }
}
