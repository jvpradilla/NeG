import "dotenv/config";
import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import UserRoutes from "./user/infrastructure/route/UserRoutes";
import { PostgreSQLUserRepository } from "./user/infrastructure/repository/PostgreSQLUserRepository";
import CharacterRoutes from "./character/infrastructure/route/CharacterRoutes";
import { PostgreSQLCharacterRepository } from "./character/infrastructure/repository/PostgreSQLCharacterRepository";

import { loadQuestionnaire, loadCategories, loadQuestion } from "./util/LoadJSONData";
import { JSONQuestionnaireRepository } from "./questionnaire/infrastructure/repository/JSONQuestionnaireRepository";
import { QuestionnaireController } from "./questionnaire/infrastructure/controller/QuestionnaireController";
import { CategoryController } from "./category/infrastructure/controller/CategoryController";
import { JSONCategoryRepository } from "./category/infrastructure/repository/JSONCategoryRepository";
import { JSONQuestionRepository } from "./question/infrastructure/repository/JSONQuestionRepository";
import { QuestionController } from "./question/infrastructure/controller/QuestionController";

import { Router, Request, Response } from "express";
import fs from "fs";

const PORT = process.env.PORT || 5001;

const APP = express();
APP.use(cors());
APP.use(express.json());
APP.use(fileUpload());

APP.use("/public", express.static(`${__dirname}/public`));

const questionnaireController = new QuestionnaireController(new JSONQuestionnaireRepository());
loadQuestionnaire(questionnaireController);

const categoriesController = new CategoryController(new JSONCategoryRepository());
loadCategories(categoriesController);

const questionController = new QuestionController(new JSONQuestionRepository());
loadQuestion(questionnaireController, categoriesController, questionController);

new UserRoutes(new PostgreSQLUserRepository()).registerRoutes("/user", APP);
new CharacterRoutes(new PostgreSQLCharacterRepository()).registerRoutes("/character", APP);

/*const blobToFile = (theBlob: Blob, fileName:string): File => {       
  return new File(
    [theBlob as any], // cast as any
    fileName, 
    {
      lastModified: new Date().getTime(),
      type: theBlob.type 
    }
  );
};*/

APP.post("/seed", express.raw({ limit: "10mb" }), (pRequest: Request, pResponse: Response) => {
  /*const f: File = blobToFile(pRequest.body, "video.webm");
  console.log(f);*/
  const uploadPath = "public/uploads/user/avatar/video.webm";
  //const uploadURL = `/${uploadPath}` ;
  fs.writeFile(uploadPath, Buffer.from(pRequest.body), (err) => {
    console.log(err);
  });
 
});


APP.listen(PORT, () => console.log(`Server ready on port: ${PORT}`));

