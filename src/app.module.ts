import { Module } from "@nestjs/common";
import { PlayersModule } from "./players/players.module";

@Module({
  imports: [PlayersModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
