import { Question } from "../../../question/domain/Question";
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

  public async readQuestions(pQuantity: number): Promise<Question[]> {
    const questionsResponse: Question[] = [];

    this.questionnaires.forEach((questionnaire) => {
      const questionsByCateory = pQuantity / questionnaire.categories.size;

      questionnaire.categories.forEach((category) => {
        if(pQuantity == 98) {
          questionsResponse.push(...category);
        } else {
          const randomLimit = Math.floor(Math.random() * (category.length - questionsByCateory + 1) + questionsByCateory );
          questionsResponse.push(...category.slice(randomLimit - questionsByCateory, randomLimit));
        }
      });
    });
    return questionsResponse;
  }
}