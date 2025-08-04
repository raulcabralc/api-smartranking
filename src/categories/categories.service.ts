import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { Category } from "./interfaces/category.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Error } from "src/utils/interfaces/error.interface";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel("Category") private readonly categoryModel: Model<Category>,
  ) {}

  async createCategory(body: CreateCategoryDTO): Promise<Category> {
    const { category } = body;

    const categoryExists = await this.categoryModel
      .findOne({ category })
      .exec();

    if (categoryExists) {
      throw new BadRequestException("Category already exists");
    }

    const createdCategory = new this.categoryModel(body);

    return await createdCategory.save();
  }

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
}
