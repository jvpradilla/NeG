import fs from "fs";
import { QuestionnaireController } from "../questionnaire/infrastructure/controller/QuestionnaireController";
import { CategoryController } from "../category/infrastructure/controller/CategoryController";
import { QuestionController } from "../question/infrastructure/controller/QuestionController";

const loadQuestionnaire = (pQuestionnaireController: QuestionnaireController): void => {
  fs.readFile(process.cwd() + "/public/data/questionnaire.json", (err, data) => {
    if (err) {
      throw new Error("Error reading questionnaire.json");
    }
    const questionnairesData = JSON.parse(data.toString());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    questionnairesData.questionnaires.forEach(async (questionnaire: any) => {
      await pQuestionnaireController.create(questionnaire.id, questionnaire.name);
    });
  });
};

const loadCategories = (pCategoryController: CategoryController): void => {
  fs.readFile(process.cwd() + "/public/data/category.json", (err, data) => {
    if (err) {
      throw new Error("Error reading category.json");
    }
    const categoriesData = JSON.parse(data.toString());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    categoriesData.categories.forEach(async (category: any) => {
      await pCategoryController.create(category.id, category.name);
    });
  });
};

const loadQuestion = (pQuestionnaireController: QuestionnaireController, pCategoryController: CategoryController, pQuestionController: QuestionController): void => {
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
      await pQuestionController.create(question.id, question.content, category, questionnaire);
    });    
  });
};

export const loadJSONData =  async (pQuestionnaireController: QuestionnaireController, pCategoryController: CategoryController, pQuestionController: QuestionController): Promise<void> => {
  await loadQuestionnaire(pQuestionnaireController);
  await loadCategories(pCategoryController);
  await loadQuestion(pQuestionnaireController, pCategoryController, pQuestionController);
};

export default loadJSONData;