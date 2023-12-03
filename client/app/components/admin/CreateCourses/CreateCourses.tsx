import { styles } from "@/app/styles/style";
import CourseInformation from "./CourseInformation";
import React, { useState } from "react";
import CreationProgress from "./CreationProgress";
import CourseData from "./CourseData";
import MainCourseData from "./MainCourseData"
type Props = {};
const CreateCourses = (props: Props) => {
  const [active, setActive] = useState(2);
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
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [mainCourseData, setMainCourseData] = useState([{
    title: "",
    description: "",
    videoUrl: "",
    videoThumbnail: {},
    videoSection: "Untitled section",
    links: [{ title: "", url: "" }],
    suggection: "",
  }]);
  const [courseData, setCourseData] = useState({});
  function handleSubmit(){

  }
  return (
    <div className="flex  w-[90%]">
      {active === 0 && (
        <div className="w-[80%]">
          <CourseInformation
            courseInformation={courseInformation}
            setCourseInformation={setCourseInformation}
            active={active}
            setActive={setActive}
          />
        </div>
      )}
      {active === 1 && (
        <div className="w-[80%]">
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites = {setPrerequisites}
            active={active}
            setActive={setActive}
          />
        </div>
      )}
       {active === 2 && (
        <div className="w-[80%]">
          <MainCourseData
            active={active}
            setActive={setActive}
            mainCourseData = {mainCourseData}
            setMainCourseData = {setMainCourseData}
            handleSubmit={handleSubmit}
          />
        </div>
      )}
      <div className="mt-10">
        <CreationProgress active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourses;
