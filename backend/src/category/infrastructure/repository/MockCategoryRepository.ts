import { Category } from "../../domain/Category";
import { CategoryId } from "../../domain/CategoryId";
import { CategoryRepository } from "../../domain/CategoryRepository";

export class MockCategoryRepository implements CategoryRepository{

  private categories: Category[] = [];

  public async findByCategoryId(pCategoryId: CategoryId): Promise<Category | undefined> {
    return await this.categories.find((category) => category.id.equals(pCategoryId)); 
  }

  public async save(pCategory: Category): Promise<void> {
    this.categories.push(pCategory);
  }    
}