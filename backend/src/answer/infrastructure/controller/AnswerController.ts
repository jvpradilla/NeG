import { CharacterId } from "../../../character/domain/CharacterId";
import { QuestionContent } from "../../../question/domain/QuestionContent";
import { QuestionId } from "../../../question/domain/QuestionId";
import { CreateAnswer } from "../../application/CreateAnswer";
import { FindByCharacterIDAnswer } from "../../application/FindByCharacterIDAnswer";
import { Answer } from "../../domain/Answer";
import { AnswerId } from "../../domain/AnswerId";
import { AnswerRepository } from "../../domain/AnswerRepository";

export class AnswerController {
  private createAnswer: CreateAnswer;
  private findByCharacterIDAnswer: FindByCharacterIDAnswer;

  constructor(pAnswerRepository: AnswerRepository) {
    this.createAnswer = new CreateAnswer(pAnswerRepository);
    this.findByCharacterIDAnswer = new FindByCharacterIDAnswer(pAnswerRepository);
  }

  public async create(pAnswerId: string, pCharacterId: string, pQuestionId: string, pQuestionContent: string, pAnswerVideoURL: string): Promise<void> {  
    const answerId = new AnswerId(pAnswerId);
    const questionId = new QuestionId(pQuestionId);
    const questionContent = new QuestionContent(pQuestionContent);
    const characterId = new CharacterId(pCharacterId);
    await this.createAnswer.execute(answerId, characterId, questionId, questionContent, pAnswerVideoURL);
  }

  public async findByCharacterId(pCharacterId: string): Promise<Answer[]> {
    const characterId = new CharacterId(pCharacterId);
    return await this.findByCharacterIDAnswer.execute(characterId);
  }
  
}