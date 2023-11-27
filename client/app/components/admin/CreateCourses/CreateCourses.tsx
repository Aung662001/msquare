import { styles } from "@/app/styles/style";
import CourseInformation from "./CourseInformation";
import React, { useState } from "react";
import CreationProgress from "./CreationProgress";
type Props = {};
const CreateCourses = (props: Props) => {
  const [active, setActive] = useState(0);
  const [courseInformation, setCourseInformation] = useState({
    name: "",
    description: "",
    price: 0,
    estimatePrice: 0,
    lavel: "",
    tags: "",
    demoUrl: "",
    thunbnail: "",
  });

  return (
    <div className="flex  w-[90%]">
      <div className="w-[80%]">
        <CourseInformation
          courseInformation={courseInformation}
          setCourseInformation={setCourseInformation}
          active={active}
          setActive={setActive}
        />
      </div>
      <div className="mt-10">
        <CreationProgress active={active} setActive={setActive}/>
      </div>
    </div>
  );
};

export default CreateCourses;
