import { CharacterId } from "../../../character/domain/CharacterId";
import { QuestionId } from "../../../question/domain/QuestionId";
import { CreateAnswer } from "../../application/CreateAnswer";
import { AnswerId } from "../../domain/AnswerId";
import { AnswerRepository } from "../../domain/AnswerRepository";

export class AnswerController {
  private createAnswer: CreateAnswer;

  constructor(pAnswerRepository: AnswerRepository) {
    this.createAnswer = new CreateAnswer(pAnswerRepository);
  }

  public async create(pAnswerId: string, pCharacterId: string, pQuestionId: string, pAnswerVideoURL: string): Promise<void> {  
    const answerId = new AnswerId(pAnswerId);
    const questionId = new QuestionId(pQuestionId);
    const characterId = new CharacterId(pCharacterId);
    await this.createAnswer.execute(answerId, characterId, questionId, pAnswerVideoURL);
  }
  
}