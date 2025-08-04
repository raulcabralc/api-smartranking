import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { Category } from "./interfaces/category.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

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
}
