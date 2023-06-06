import { QuestionId } from "../../question/domain/QuestionId";
import { Answer } from "./Answer";
import { AnswerId } from "./AnswerId";

export interface AnswerRepository {
    findByAnswerId(pAnswerId: AnswerId): Promise<Answer | undefined>;
    save(pAnswer: AnswerId, pQuestionId: QuestionId, pAnswerVideoURL:string): Promise<void>;
}