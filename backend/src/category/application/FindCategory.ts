import { Category } from "../domain/Category";
import { CategoryId } from "../domain/CategoryId";
import { CategoryRepository } from "../domain/CategoryRepository";

export class FindCategory {
  constructor (private readonly categoryRepository: CategoryRepository) {}

  public async execute (pCategoryId: CategoryId): Promise<Category | undefined> {
    return await this.categoryRepository.findByCategoryId(pCategoryId);
  }
}