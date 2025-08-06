import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { Category } from "./interfaces/category.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Error } from "src/utils/interfaces/error.interface";
import { Falsy } from "rxjs";
import { Player } from "src/players/interfaces/player.interface";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel("Category") private readonly categoryModel: Model<Category>,
    @InjectModel("Player") private readonly playerModel: Model<Player>,
  ) {}

  async indexCategories() {
    return await this.categoryModel.find().exec();
  }

  async findOneById(id: string): Promise<Category | Error> {
    const category = await this.categoryModel.findById(id).exec();

    if (!category) {
      return {
        errors: ["category not found"],
      };
    }

    return category;
  }

  async createCategory(body: CreateCategoryDTO): Promise<Category> {
    const { category } = body;

    if (await this.categoryExists(category)) {
      throw new BadRequestException("Category already exists");
    }

    const createdCategory = new this.categoryModel(body);

    return await createdCategory.save();
  }

  async attributePlayer(category: string, id: string): Promise<Category> {
    const existingCategory = (await this.categoryModel
      .findOne({ category })
      .exec()) as Category;

    if (!existingCategory) {
      throw new BadRequestException("Category does not exist.");
    }

    const player = (await this.playerModel.findById(id)) as Player;

    if (!player) {
      throw new BadRequestException("Player was not found.");
    }

    if (existingCategory.players.includes(player._id)) {
      throw new BadRequestException(
        "Player is already attributed to this category.",
      );
    }

    const updatedCategory = await this.categoryModel
      .findOneAndUpdate(
        { category },
        { $push: { players: player._id } },
        { new: true },
      )
      .exec();

    return updatedCategory as Category;
  }

  async updateCategory(id: string, body: CreateCategoryDTO): Promise<Category> {
    const { category } = body;

    const existingCategory = await this.categoryExists(category);

    if (existingCategory && existingCategory._id !== id) {
      throw new BadRequestException("Category already exists.");
    }

    const updatedCategory = await this.categoryModel.findByIdAndUpdate(
      id,
      body,
      { new: true },
    );

    if (!updatedCategory) {
      throw new BadRequestException("Category does not exist.");
    }

    return updatedCategory as Category;
  }

  async removePlayer(category: string, id: string) {
    const existingCategory = (await this.categoryModel
      .findOne({ category })
      .exec()) as Category;

    if (!existingCategory) {
      throw new BadRequestException("Category does not exist.");
    }

    const player = (await this.playerModel.findById(id)) as Player;

    if (!player) {
      throw new BadRequestException("Player was not found.");
    }

    if (!existingCategory.players.includes(player._id)) {
      throw new BadRequestException(
        "Player is not attributed to this category.",
      );
    }

    const deletedPlayerInCategory = await this.categoryModel.findOneAndUpdate(
      { category },
      { $pull: { players: id } },
      { new: true },
    );

    return deletedPlayerInCategory;
  }

  private async categoryExists(category: string): Promise<Category | Falsy> {
    const categoryExists = await this.categoryModel.findOne({ category });

    return categoryExists as Category;
  }
}
