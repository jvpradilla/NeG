import { Questionnaire } from "../domain/Questionnaire";
import { QuestionnaireId } from "../domain/QuestionnaireId";
import { QuestionnaireRepository } from "../domain/QuestionnaireRepository";

export class FindQuestionnaire {
  constructor (private readonly QuestionnaireRepository: QuestionnaireRepository) {}

  public async execute (pQuestionnaireId: QuestionnaireId): Promise<Questionnaire | undefined> {
    return await this.QuestionnaireRepository.findByQuestionnaireId(pQuestionnaireId);
  }
}