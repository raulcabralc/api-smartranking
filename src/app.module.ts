import { Module } from "@nestjs/common";
import { PlayersModule } from "./players/players.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env" }),
    MongooseModule.forRoot(`${process.env.DB_URI}`),
    PlayersModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
