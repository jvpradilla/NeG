import { Router, Request, Response } from "express";
import { UserRepository } from "../../domain/UserRepository";
import { UserController } from "../controller/UserController";
import { UploadedFile } from "express-fileupload";
import {v4 as uuidv4} from "uuid";

export default class UserRoutes {


  private repository: UserRepository;
  private controller: UserController;

  constructor(pRepository: UserRepository) {
    this.repository = pRepository;
    this.controller = new UserController(this.repository);
  }

  public registerRoutes(pPath: string, pRouter: Router): void {

    pRouter.get(pPath, (pRequest: Request, pResponse: Response) => {
      pResponse.send(
        [{
          name: "user1",
          email: "user1@mail.com"
        },
        {
          name: "user2",
          email: "user2@mail.com"
        },{
          name: "user3",
          email: "user3@mail.com"
        },{
          name: "user4",
          email: "user4@mail.com"
        }]
      );
    }); 
  
    pRouter.post(pPath, async (pRequest: Request, pResponse: Response) => {
      try {
        const { username, password, avatar } = pRequest.body;
        console.log("Desde userRoutes");
  
        await this.controller.register( username, password, avatar);
        pResponse.status(200).send();
      } catch (err) { 
        const typedError = err as Error;
        pResponse.status(400).json({ error: typedError.message });
      }
    }); 
  
    pRouter.post(pPath+"/avatar", async (pRequest: Request, pResponse: Response) => {

      if (!pRequest.files || Object.keys(pRequest.files).length === 0 || !pRequest.files?.file) {
        return pResponse.status(400).json({ error: "No files were uploaded"});
      }    
  
      const file: UploadedFile = pRequest.files.file as UploadedFile;
      const uploadPath = `public/uploads/${uuidv4()}`;
      const uploadURL = `/${uploadPath}` ;
  
      file.mv(uploadPath, err => {
        if(err) {return pResponse.status(500).send({ message : err });}
        return pResponse.status(200).json({ url: uploadURL});
      });
    });
  }

}
