import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { Category } from "./interfaces/category.interface";
import { CategoriesService } from "./categories.service";

@Controller("/categorias")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async indexCategories(): Promise<Category[]> {
    return await this.categoriesService.indexCategories();
  }

  @Get("/:id")
  async findOneById(@Param("id") id: string) {
    return await this.categoriesService.findOneById(id);
  }

  @Post("/create")
  @UsePipes(ValidationPipe)
  async createCategory(@Body() body: CreateCategoryDTO): Promise<Category> {
    return await this.categoriesService.createCategory(body);
  }
}
