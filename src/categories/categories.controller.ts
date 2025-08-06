import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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
  @UsePipes(ValidationPipe)
  async findOneById(@Param("id") id: string) {
    return await this.categoriesService.findOneById(id);
  }

  @Post("/criar")
  @UsePipes(ValidationPipe)
  async createCategory(@Body() body: CreateCategoryDTO): Promise<Category> {
    return await this.categoriesService.createCategory(body);
  }

  @Post("/atribuir/:category/:id")
  @UsePipes(ValidationPipe)
  async attributePlayer(
    @Param("category") category: string,
    @Param("id") id: string,
  ): Promise<Category> {
    return await this.categoriesService.attributePlayer(category, id);
  }

  @Patch("/:id")
  async updateCategory(
    @Param("id") id: string,
    @Body() body: CreateCategoryDTO,
  ): Promise<Category> {
    return await this.categoriesService.updateCategory(id, body);
  }

  @Delete("/desatribuir/:category/:id")
  @UsePipes(ValidationPipe)
  async removePlayer(
    @Param("category") category: string,
    @Param("id") id: string,
  ) {
    return await this.categoriesService.removePlayer(category, id);
  }
}
