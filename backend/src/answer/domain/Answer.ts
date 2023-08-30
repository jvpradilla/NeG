import { CharacterId } from "../../character/domain/CharacterId";
import { QuestionId } from "../../question/domain/QuestionId";
import { AnswerId } from "./AnswerId";

export class Answer {

  public readonly id: AnswerId;
  public readonly characterId: CharacterId;
  public readonly questionId: QuestionId;
  public readonly answerVideoURL: string;

  constructor(pId: AnswerId, pCharacterId: CharacterId, pQuestionId: QuestionId, pAnswerVideoURL: string) {
    this.id = pId;
    this.characterId = pCharacterId;
    this.questionId = pQuestionId;
    this.answerVideoURL = pAnswerVideoURL;
  }  
}