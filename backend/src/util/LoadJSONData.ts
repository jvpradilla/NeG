import fs from "fs";
import { QuestionnaireController } from "../questionnaire/infrastructure/controller/QuestionnaireController";
import { CategoryController } from "../category/infrastructure/controller/CategoryController";
import { QuestionController } from "../question/infrastructure/controller/QuestionController";

export const loadQuestionnaire = (pQuestionnaireController: QuestionnaireController): void => {
  fs.readFile(process.cwd() + "/public/data/questionnaire.json", (err, data) => {
    if (err) {
      throw new Error("Error reading questionnaire.json");
    }
    const questionnairesData = JSON.parse(data.toString());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    questionnairesData.questionnaires.forEach((questionnaire: any) => {
      pQuestionnaireController.create(questionnaire.id, questionnaire.name);
    });
  });
};

export const loadCategories = (pCategoryController: CategoryController): void => {
  fs.readFile(process.cwd() + "/public/data/category.json", (err, data) => {
    if (err) {
      throw new Error("Error reading category.json");
    }
    const categoriesData = JSON.parse(data.toString());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    categoriesData.categories.forEach((category: any) => {
      pCategoryController.create(category.id, category.name);
    });
  });
};

export const loadQuestion = (pQuestionnaireController: QuestionnaireController, pCategoryController: CategoryController, pQuestionController: QuestionController): void => {
  fs.readFile(process.cwd() + "/public/data/question.json", (err, data) => {
    if (err) {
      throw new Error("Error reading category.json");
    }
    const questionsData = JSON.parse(data.toString());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    questionsData.questions.forEach(async (question: any) => {
      const category = await pCategoryController.findByCategoryId(question.category);
      const questionnaire = await pQuestionnaireController.findByQuestionnaireId(question.questionnaire);
      if(!category || !questionnaire) {
        throw new Error("Error reading category.json");
      }
      pQuestionController.create(question.id, question.content, category, questionnaire);
    });    
  });
};