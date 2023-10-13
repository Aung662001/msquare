import express from "express";
import {
  addQuestion,
  answerQuestion,
  editCourse,
  getAllCourses,
  getCourse,
  getCourseByCourseId,
  reviewCourse,
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

//get purchase courses
courseRouter.get("/get-course-content/:id", isAuthenticated, getCourse);

//add question to course
courseRouter.put('/add-question',isAuthenticated,addQuestion)

//answer question
courseRouter.put('/add-answer',isAuthenticated,answerQuestion)

//add review
courseRouter.put('/add-review',isAuthenticated,reviewCourse)
