import { Body, Controller, Get, Post } from "@nestjs/common";
import { PlayersService } from "./players.service";
import { CreatePlayerDTO } from "./dto/create-player.dto";

@Controller("/jogadores")
export class PlayersController {
  constructor(readonly playersService: PlayersService) {}

  @Get()
  async playerGet() {}

  @Post()
  createUpdatePlayer(@Body() body: CreatePlayerDTO) {
    // this.playersService.create(body);
    const { email, name, phoneNumber } = body;

    return {
      email,
      name,
      phoneNumber,
    };
  }
}
