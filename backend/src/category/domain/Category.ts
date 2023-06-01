import { Question } from "../../question/domain/Question";
import { CategoryId } from "./CategoryId";
import { CategoryName } from "./CategoryName";

export class Category {
  public readonly id: CategoryId;
  public readonly name: CategoryName;
  private questions: Question[] = [];

  constructor(pId: CategoryId, pName: CategoryName) {
    this.id = pId;
    this.name = pName;
  }

  public equals(pCategory: Category): boolean {
    return (this.id.equals(pCategory.id));
  }

  public addQuestion(pQuestion: Question): void {
    this.questions.push(pQuestion);
  }
}