import { Router } from "express";
import FeedbackController from "../controllers/FeedbackController";

const FeedbackRouter = Router();

// Listar todos os feedbacks
FeedbackRouter.get("/feedbacks/all", FeedbackController.listAllFeedback);

// Listar feedbacks válidos (validContent e validName como 'valido')
FeedbackRouter.get("/feedbacks", FeedbackController.listFeedback);

// Inserir um novo feedback
FeedbackRouter.post("/feedback", FeedbackController.createFeedback);

// Deletar um feedback pelo ID
FeedbackRouter.delete("/feedback/:id", FeedbackController.deleteFeedback);

export default FeedbackRouter;
