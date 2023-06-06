import "dotenv/config";
import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import UserRoutes from "./user/infrastructure/route/UserRoutes";
import { PostgreSQLUserRepository } from "./user/infrastructure/repository/PostgreSQLUserRepository";
import CharacterRoutes from "./character/infrastructure/route/CharacterRoutes";
import { PostgreSQLCharacterRepository } from "./character/infrastructure/repository/PostgreSQLCharacterRepository";

import { JSONQuestionnaireRepository } from "./questionnaire/infrastructure/repository/JSONQuestionnaireRepository";
import { QuestionnaireController } from "./questionnaire/infrastructure/controller/QuestionnaireController";
import { JSONCategoryRepository } from "./category/infrastructure/repository/JSONCategoryRepository";
import { CategoryController } from "./category/infrastructure/controller/CategoryController";
import { JSONQuestionRepository } from "./question/infrastructure/repository/JSONQuestionRepository";
import { QuestionController } from "./question/infrastructure/controller/QuestionController";
import QuestionnaireRoutes from "./questionnaire/infrastructure/route/QuestionnaireRoutes";
import loadJSONData from "./util/LoadJSONData";
import AnswerRoutes from "./answer/infrastructure/route/AnswerRoutes";
import { PostgreSQLAnswerRepository } from "./answer/infrastructure/repository/PostgreSQLAnswerRepository";

const PORT = process.env.PORT || 5001;

const APP = express();

APP.use(cors());
APP.use(express.json());
APP.use(fileUpload());
APP.use(express.raw({ limit: "10mb" }));

APP.use("/public", express.static(`${__dirname}/../public/`));

const questionnairesRepository = new JSONQuestionnaireRepository();
const questionnaireController = new QuestionnaireController(questionnairesRepository);
const categoriesController = new CategoryController(new JSONCategoryRepository());
const questionController = new QuestionController(new JSONQuestionRepository());
loadJSONData(questionnaireController, categoriesController, questionController);

new UserRoutes(new PostgreSQLUserRepository()).registerRoutes("/user", APP);
new CharacterRoutes(new PostgreSQLCharacterRepository()).registerRoutes("/character", APP);
new AnswerRoutes(new PostgreSQLAnswerRepository()).registerRoutes("/answer", APP);
new QuestionnaireRoutes(questionnairesRepository).registerRoutes("/questionnaire", APP);

APP.listen(PORT, () => console.log(`Server ready on port: ${PORT}`));