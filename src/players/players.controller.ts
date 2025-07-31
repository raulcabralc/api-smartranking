import { Body, Controller, Post } from "@nestjs/common";
import { PlayersService } from "./players.service";
import { CreatePlayerDTO } from "./dto/create-player.dto";

@Controller("/jogadores")
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  createUpdatePlayer(@Body() body: CreatePlayerDTO) {
    this.playersService.createUpdatePlayer(body);
  }
}
