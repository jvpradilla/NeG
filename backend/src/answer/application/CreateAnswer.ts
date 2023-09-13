import { CharacterId } from "../../character/domain/CharacterId";
import { QuestionContent } from "../../question/domain/QuestionContent";
import { QuestionId } from "../../question/domain/QuestionId";
import { AnswerId } from "../domain/AnswerId";
import { AnswerRepository } from "../domain/AnswerRepository";

export class CreateAnswer {
  constructor(private readonly answerRepository: AnswerRepository) {}

  public async execute(pAnswerId: AnswerId, pCharacterId: CharacterId, pQuestionId: QuestionId, pQuestionContent: QuestionContent, pAnswerVideoURL: string): Promise<void> {
    if (await this.answerRepository.findByAnswerId(pAnswerId)) {
      throw new Error("Answer already exists");
    }
    await this.answerRepository.save(pAnswerId, pCharacterId, pQuestionId, pQuestionContent, pAnswerVideoURL);
  }
}