import { CharacterId } from "../../character/domain/CharacterId";
import { QuestionContent } from "../../question/domain/QuestionContent";
import { QuestionId } from "../../question/domain/QuestionId";
import { AnswerId } from "./AnswerId";

export class Answer {

  public readonly id: AnswerId;
  public readonly characterId: CharacterId;
  public readonly questionId: QuestionId;
  public readonly questionContent: QuestionContent;
  public readonly answerVideoURL: string;

  constructor(pId: AnswerId, pCharacterId: CharacterId, pQuestionId: QuestionId, pQuestionContent: QuestionContent, pAnswerVideoURL: string) {
    this.id = pId;
    this.characterId = pCharacterId;
    this.questionId = pQuestionId;
    this.questionContent = pQuestionContent;
    this.answerVideoURL = pAnswerVideoURL;
  }  
}