import { Questionnaire } from "./Questionnaire";
import { QuestionnaireId } from "./QuestionnaireId";

export interface QuestionnaireRepository {
  findByQuestionnaireId(pQuestionnaireId: QuestionnaireId): Promise<Questionnaire | undefined>;
  save(pQuestionnaire: Questionnaire): Promise<void>;
}