import express from "express";
import { createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,} from "../controllers/user.controller"

  import { validate } from "../middleware/validator";
  import { userSchema } from "../validators/user.validator";


  const router = express.Router();

  router.post("/", validate(userSchema),createUser);
  router.put("/:id",validate(userSchema),updateUser);

  
  router.delete("/:id",deleteUser);
  router.get("/",getUsers);
  router.get("/:id",getUser)

  export default router;