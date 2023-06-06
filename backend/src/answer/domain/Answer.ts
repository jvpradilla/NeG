import { QuestionId } from "../../question/domain/QuestionId";
import { AnswerId } from "./AnswerId";

export class Answer {

  public readonly id: AnswerId;
  public readonly questionId: QuestionId;
  public readonly answerVideoURL: string;

  constructor(pId: AnswerId, pQuestionId: QuestionId, pAnswerVideoURL: string) {
    this.id = pId;
    this.questionId = pQuestionId;
    this.answerVideoURL = pAnswerVideoURL;
  }  
}