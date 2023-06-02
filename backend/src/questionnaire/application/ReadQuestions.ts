import { Question } from "../../question/domain/Question";
import { QuestionnaireRepository } from "../domain/QuestionnaireRepository";

export class ReadQuestions {
  constructor (private readonly questionnaireRepository: QuestionnaireRepository) {}

  public async execute (pQuantity: number): Promise<Question[]> {
    return await this.questionnaireRepository.readQuestions(pQuantity);
  }
}
  