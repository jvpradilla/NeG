import { Category } from "./Category";
import { CategoryId } from "./CategoryId";

export interface CategoryRepository {
  findByCategoryId(pCategoryId: CategoryId): Promise<Category | undefined>;
  save(pCategory: Category): Promise<void>;
}