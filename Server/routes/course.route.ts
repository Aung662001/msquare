import express from "express";
import {
  addQuestion,
  answerQuestion,
  deleteCourse,
  editCourse,
  getAllCourses,
  getAllCoursesAdmin,
  getCourse,
  getCourseByCourseId,
  replyReview,
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

//add reply to review
courseRouter.put('/add-reply',isAuthenticated,accessedRole("admin"),replyReview)

// get all courses for admin
courseRouter.get("/get-courses-admin",isAuthenticated,accessedRole('admin'),getAllCoursesAdmin)

//delete courses for admin
courseRouter.delete('/delete-course/:id',isAuthenticated,accessedRole('admin'),deleteCourse)
