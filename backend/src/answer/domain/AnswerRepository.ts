import { CharacterId } from "../../character/domain/CharacterId";
import { QuestionContent } from "../../question/domain/QuestionContent";
import { QuestionId } from "../../question/domain/QuestionId";
import { Answer } from "./Answer";
import { AnswerId } from "./AnswerId";

export interface AnswerRepository {
    findByAnswerId(pAnswerId: AnswerId): Promise<Answer | undefined>;
    findByCharacterId(pCharacterId: CharacterId): Promise<Answer[]>;
    save(pAnswer: AnswerId, pCharacterId: CharacterId, pQuestionId: QuestionId, pQuestionContent: QuestionContent, pAnswerVideoURL:string): Promise<void>;
}