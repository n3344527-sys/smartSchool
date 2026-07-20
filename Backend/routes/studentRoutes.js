import express from "express";

import {
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} from "../controller/studentController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import teacherMiddleware from "../middleware/teacherMiddleware.js";
const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getStudents
);

router.post(
  "/",
  authMiddleware,
  teacherMiddleware,
  createStudent
);

router.put(
  "/:id",
  authMiddleware,
  teacherMiddleware,
  updateStudent
);

router.delete(
  "/:id",
  authMiddleware,
  teacherMiddleware,
  deleteStudent
);
export default router;