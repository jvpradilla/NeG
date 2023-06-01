import { Question } from "../domain/Question";
import { QuestionRepository } from "../domain/QuestionRepository";

export class ReadQuestions {
  constructor(private readonly questionRepository: QuestionRepository) {}

  public async execute(): Promise<Question[]> {
    return await this.questionRepository.findAll();
  }
}