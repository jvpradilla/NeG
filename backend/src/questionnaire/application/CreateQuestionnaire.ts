import { Questionnaire } from "../domain/Questionnaire";
import { QuestionnaireId } from "../domain/QuestionnaireId";
import { QuestionnaireName } from "../domain/QuestionnaireName";
import { QuestionnaireRepository } from "../domain/QuestionnaireRepository";

export class CreateQuestionnaire {
  constructor (private readonly QuestionnaireRepository: QuestionnaireRepository) {}

  public async execute (pQuestionnaireId: QuestionnaireId, pQuestionnaireName: QuestionnaireName): Promise<void> {
    if ( await this.QuestionnaireRepository.findByQuestionnaireId(pQuestionnaireId)) {
      throw new Error( "Questionnaire already exists" );
    }
    await this.QuestionnaireRepository.save(new Questionnaire(pQuestionnaireId, pQuestionnaireName));
  }
}