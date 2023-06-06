import { QuestionId } from "../../question/domain/QuestionId";
import { AnswerId } from "../domain/AnswerId";
import { AnswerRepository } from "../domain/AnswerRepository";

export class CreateAnswer {
  constructor(private readonly answerRepository: AnswerRepository) {}

  public async execute(pAnswerId: AnswerId, pQuestionId: QuestionId, pAnswerVideoURL: string): Promise<void> {
    if (await this.answerRepository.findByAnswerId(pAnswerId)) {
      throw new Error("Answer already exists");
    }
    await this.answerRepository.save(pAnswerId, pQuestionId, pAnswerVideoURL);
  }
}