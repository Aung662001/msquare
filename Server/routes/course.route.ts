import express from "express";
import {
  editCourse,
  getAllCourses,
  getCourseByCourseId,
  uploadCourse,
} from "../controllers/course.controller";
import { accessedRole, isAuthenticated } from "../middleware/auth";
const courseRouter = express.Router();

//create new course
courseRouter.post(
  "/create-course",
  isAuthenticated,
  accessedRole("admin"),
  uploadCourse
);

//edit course
courseRouter.put(
  "/edit-course/:id",
  isAuthenticated,
  accessedRole("admin"),
  editCourse
);

//get single course by id for all users
courseRouter.get("/get-course/:id", getCourseByCourseId);
export default courseRouter;

//get all courses
courseRouter.get("/get-courses", getAllCourses);
