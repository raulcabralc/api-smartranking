import { Module } from "@nestjs/common";
import { PlayersModule } from "./players/players.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { CategoriesModule } from "./categories/categories.module";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env" }),
    MongooseModule.forRoot(`${process.env.DB_URI}`),
    PlayersModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
