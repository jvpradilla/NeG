
import { QuestionContent } from "../domain/QuestionContent";
import { QuestionId } from "../domain/QuestionId";
import { Question } from "../domain/Question";
import { Category } from "../../category/domain/Category";
import { Questionnaire } from "../../questionnaire/domain/Questionnaire";

import { QuestionRepository } from "../domain/QuestionRepository";

export class CreateQuestion {
  constructor (private readonly QuestionRepository: QuestionRepository) {}

  public async execute (pQuestionId: QuestionId, pContent: QuestionContent, pCategory: Category, pQuestionnaire: Questionnaire): Promise<void> {
    if ( await this.QuestionRepository.findByQuestionId(pQuestionId)) {
      throw new Error( "Question already exists" );
    }
    await this.QuestionRepository.save(new Question(pQuestionId, pContent, pCategory, pQuestionnaire));
  }
}