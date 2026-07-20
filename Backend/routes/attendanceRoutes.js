import express from "express";

import {
  markAttendance,
  getStudentAttendance,
} from "../controller/attendanceController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import teacherMiddleware from "../middleware/teacherMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  teacherMiddleware,
  markAttendance
);

router.get(
  "/student/:studentId",
  authMiddleware,
  getStudentAttendance
);

export default router;