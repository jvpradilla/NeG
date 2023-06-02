import { Questionnaire } from "../../domain/Questionnaire";
import { QuestionnaireId } from "../../domain/QuestionnaireId";
import { QuestionnaireRepository } from "../../domain/QuestionnaireRepository";

export class JSONQuestionnaireRepository implements QuestionnaireRepository{

  private questionnaires: Questionnaire[] = [];

  public async findByQuestionnaireId(pQuestionnaireId: QuestionnaireId): Promise<Questionnaire | undefined> {
    return await this.questionnaires.find((questionnaire) => questionnaire.id.equals(pQuestionnaireId)); 
  }

  public async save(pQuestionnaire: Questionnaire): Promise<void> {
    this.questionnaires.push(pQuestionnaire);
  }    
}