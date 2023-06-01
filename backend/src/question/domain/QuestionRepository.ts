
import { Question } from "./Question";
import { QuestionId } from "./QuestionId";

export interface QuestionRepository {
  findByQuestionId(pQuestionId: QuestionId): Promise<Question | undefined>;
  save(pQuestion: Question): Promise<void>;
  findAll(): Promise<Question[]>;
}