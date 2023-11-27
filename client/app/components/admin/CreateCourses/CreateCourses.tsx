import { styles } from "@/app/styles/style";
import CourseInformation from "./CourseInformation"
import React, { useState } from "react";
type Props = {};
const CreateCourses = (props: Props) => {
  const [active,setActive] = useState(0)
  const [courseInformation,setCourseInformation] = useState({
    name:"",
    description:"",
    price:0,
    estimatePrice:0,
    lavel:"",
    tags:"",
    demoUrl:"",
    thunbnail:"",
})

  return (
    <div>
      <CourseInformation courseInformation={courseInformation} setCourseInformation={setCourseInformation} active={active} setActive={setActive}/>
    </div>
  );
};

export default CreateCourses;
