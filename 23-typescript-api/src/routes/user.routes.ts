import { Router } from "express";
import {
  getAll,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/user.controller";
import { validate } from "../middlewares/validate.middleware";
import { createUserSchema } from "../dtos/user.dto";
const router = Router();

router.get("/", getAll);
router.get("/:id", getUser);
router.post("/", validate(createUserSchema, "body"), createUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

export default router;
