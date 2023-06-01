import { Category } from "../../category/domain/Category";
import { Questionnaire } from "../../questionnaire/domain/Questionnaire";
import { QuestionContent } from "./QuestionContent";
import { QuestionId } from "./QuestionId";

export class Question {
  public readonly id: QuestionId;
  public readonly content: QuestionContent;
  public readonly category: Category;
  public readonly questionnaire: Questionnaire;

  constructor(pId: QuestionId, pContent: QuestionContent, pCategory: Category, pQuestionnaire: Questionnaire) {
    this.id = pId;
    this.content = pContent;
    this.category = pCategory;
    this.questionnaire = pQuestionnaire;

    pCategory.addQuestion(this);
    pQuestionnaire.addQuestion(this);
  }

  equals(pQuestion: Question): boolean {
    return (this.id.equals(pQuestion.id));
  }

}