import "dotenv/config";
import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import UserRoutes from "./user/infrastructure/route/UserRoutes";
import { PostgreSQLUserRepository } from "./user/infrastructure/repository/PostgreSQLUserRepository";
import CharacterRoutes from "./character/infrastructure/route/CharacterRoutes";
import { PostgreSQLCharacterRepository } from "./character/infrastructure/repository/PostgreSQLCharacterRepository";

const PORT = process.env.PORT || 5001;

const APP = express();
APP.use(cors());
APP.use(express.json());
APP.use(fileUpload());

APP.use("/public", express.static(`${__dirname}/public`));

new UserRoutes(new PostgreSQLUserRepository()).registerRoutes("/user", APP);
new CharacterRoutes(new PostgreSQLCharacterRepository()).registerRoutes("/character", APP);


APP.listen(PORT, () => console.log(`Server ready on port: ${PORT}`));

