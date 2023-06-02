import { Category } from "../../category/domain/Category";
import { CategoryId } from "../../category/domain/CategoryId";
import { Question } from "../../question/domain/Question";
import { QuestionnaireId } from "./QuestionnaireId";
import { QuestionnaireName } from "./QuestionnaireName";

export class Questionnaire {
  public readonly id: QuestionnaireId;
  public readonly name: QuestionnaireName;
  public readonly categories: Map<CategoryId, Question[]>;

  constructor(pId: QuestionnaireId, pName: QuestionnaireName) {
    this.id = pId;
    this.name = pName;
    this.categories = new Map<CategoryId, Question[]>();
  }

  public equals(pQuestionnaire: Questionnaire): boolean {
    return (this.id.equals(pQuestionnaire.id));
  }

  public addQuestion(pQuestion: Question): void {
    const questionsInCateogory = this.categories.get(pQuestion.category.id);
    if (questionsInCateogory) {
      questionsInCateogory.push(pQuestion);
    } else {
      this.categories.set(pQuestion.category.id, [pQuestion]);
    }
  }

  public findQuestionByCategory(pCategory: Category): Question[] {
    return this.categories.get(pCategory.id) || [];
  }
}