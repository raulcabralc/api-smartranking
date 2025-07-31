import { Body, Controller, Post, Get, Param } from "@nestjs/common";
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

  // @Get("/:id")
  @Get("/:email")
  async findOnePlayer(@Param("email") email: string): Promise<Error | Player> {
    return await this.playersService.findOnePlayer(email);
  }

  @Post()
  async createUpdatePlayer(@Body() body: CreatePlayerDTO) {
    await this.playersService.createUpdatePlayer(body);
  }
}
