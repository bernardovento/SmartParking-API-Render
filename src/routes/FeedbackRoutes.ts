import { Router } from "express";

import FeedbackController from "../controllers/FeedbackController";

const FeedbackRouter = Router()

//Listar usuários
FeedbackRouter.get("/feedbacks", FeedbackController.listFeedback);

//Inserir usuários
FeedbackRouter.post("/feedback", FeedbackController.createFeedback);

FeedbackRouter.delete("/feedback/:id", FeedbackController.deleteFeedback);


export default FeedbackRouter;