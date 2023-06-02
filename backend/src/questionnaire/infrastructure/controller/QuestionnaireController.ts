import { CreateQuestionnaire } from "../../application/CreateQuestionnaire";
import { ReadQuestionnaire } from "../../application/ReadQuestionnaire";
import { Questionnaire } from "../../domain/Questionnaire";
import { QuestionnaireId } from "../../domain/QuestionnaireId";
import { QuestionnaireName } from "../../domain/QuestionnaireName";
import { QuestionnaireRepository } from "../../domain/QuestionnaireRepository";

export class QuestionnaireController {
  private createQuestionnaire: CreateQuestionnaire;
  private readQuestionnaire: ReadQuestionnaire;

  constructor(pQuestionnaireRepository: QuestionnaireRepository) {
    this.createQuestionnaire = new CreateQuestionnaire(pQuestionnaireRepository);
    this.readQuestionnaire = new ReadQuestionnaire(pQuestionnaireRepository);
  }

  public async create(pQuestionnaireId: string, pQuestionnaireName: string): Promise<void> {  
    const questionnaireId = new QuestionnaireId(pQuestionnaireId);
    const questionnaireName = new QuestionnaireName(pQuestionnaireName);
    await this.createQuestionnaire.execute(questionnaireId, questionnaireName);
  }

  public async findByQuestionnaireId(pQuestionnaireId: string): Promise<Questionnaire | undefined> {  
    const questionnaireId = new QuestionnaireId(pQuestionnaireId);
    return await this.readQuestionnaire.execute(questionnaireId);
  }

}