import { Category } from "../domain/Category";
import { CategoryId } from "../domain/CategoryId";
import { CategoryName } from "../domain/CategoryName";
import { CategoryRepository } from "../domain/CategoryRepository";

export class CreateCategory {
  constructor (private readonly categoryRepository: CategoryRepository) {}

  public async execute (pCategoryId: CategoryId, pCategoryName: CategoryName): Promise<void> {
    if (await this.categoryRepository.findByCategoryId(pCategoryId)) {
      throw new Error( "Category already exists" );
    }
    await this.categoryRepository.save(new Category(pCategoryId, pCategoryName));
  }
}