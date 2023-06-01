import { CreateCategory } from "../../application/CreateCategory";
import { FindCategory } from "../../application/FindCategory";
import { Category } from "../../domain/Category";
import { CategoryId } from "../../domain/CategoryId";
import { CategoryName } from "../../domain/CategoryName";
import { CategoryRepository } from "../../domain/CategoryRepository";

export class CategoryController {
  private createCategory: CreateCategory;
  private findCategory: FindCategory;

  constructor(pCategoryRepository: CategoryRepository) {
    this.createCategory = new CreateCategory(pCategoryRepository);
    this.findCategory = new FindCategory(pCategoryRepository);
  }

  public async create(pCategoryId: string, pCategoryName: string): Promise<void> {  
    const categoryId = new CategoryId(pCategoryId);
    const categoryName = new CategoryName(pCategoryName);
    await this.createCategory.execute(categoryId, categoryName);
  }

  public async findByCategoryId(pCategoryId: string): Promise<Category | undefined> {
    const categoryId = new CategoryId(pCategoryId);
    return await this.findCategory.execute(categoryId);
  }

}