import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { PlayersService } from "./players.service";
import { CreatePlayerDTO } from "./dto/create-player.dto";
import { Player } from "./interfaces/player.interface";
import { Error } from "src/utils/interfaces/error.interface";

@Controller("/jogadores")
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  async indexPlayers(): Promise<Player[]> {
    return await this.playersService.indexPlayers();
  }

  @Get("/:email")
  async findOnePlayer(@Param("email") email: string): Promise<Error | Player> {
    return await this.playersService.findOnePlayer(email);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(@Body() body: CreatePlayerDTO) {
    return await this.playersService.createPlayer(body);
  }

  @Patch("/:email")
  async updatePlayer(
    @Param("email") email: string,
    @Body() body: CreatePlayerDTO,
  ) {
    return await this.playersService.updatePlayer(email, body);
  }

  @Delete("/:email")
  async deletePlayer(@Param("email") email: string): Promise<Error | Player> {
    return await this.playersService.deletePlayer(email);
  }
}
