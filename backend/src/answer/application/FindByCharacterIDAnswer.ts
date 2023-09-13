
import { CharacterId } from "../../character/domain/CharacterId";
import { Answer } from "../domain/Answer";
import { AnswerRepository } from "../domain/AnswerRepository";


export class FindByCharacterIDAnswer {
  constructor(private readonly answerRepository: AnswerRepository) {}

  public async execute(pCharacterId: CharacterId): Promise<Answer[]> {
    return await this.answerRepository.findByCharacterId(pCharacterId);
  }
}