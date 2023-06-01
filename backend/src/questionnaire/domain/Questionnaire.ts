import { Category } from "../../category/domain/Category";
import { Question } from "../../question/domain/Question";
import { QuestionnaireId } from "./QuestionnaireId";
import { QuestionnaireName } from "./QuestionnaireName";

export class Questionnaire {
  public readonly id: QuestionnaireId;
  public readonly name: QuestionnaireName;
  private questions: Question[] = [];

  constructor(pId: QuestionnaireId, pName: QuestionnaireName) {
    this.id = pId;
    this.name = pName;
  }

  public equals(pQuestionnaire: Questionnaire): boolean {
    return (this.id.equals(pQuestionnaire.id));
  }

  public addQuestion(pQuestion: Question): void {
    this.questions.push(pQuestion);
  }

  public findQuestionByCategory(pCategory: Category): Question[] {
    return this.questions.filter((question) => question.category.equals(pCategory));
  }
}