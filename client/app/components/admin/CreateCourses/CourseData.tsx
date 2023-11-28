import { styles } from "@/app/styles/style";
import { AddCircleOutlined } from "@mui/icons-material";
import { redirect } from "next/dist/server/api-utils";
import React, { FC, useEffect } from "react";

type Props = {
  benefits: { title: string }[];
  setBenefits: (x: any) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (x: any) => void;
  active: number;
  setActive: (p: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  function benefitsChange(location: number, value: any) {
    const addedBenefits = benefits.map((benefit, index) => {
      if (index == location) {
        benefit.title = value;
      }
      return benefit;
    });
    setBenefits([...addedBenefits]);
  }

  function addBenefitRow() {
    if (benefits[benefits.length - 1].title == "") return;
    setBenefits([...benefits, { title: "" }]);
  }

  function preReqChange(location: number, value: any) {
    const newPreReq = prerequisites.map((pre, index) => {
      if (index == location) {
        pre.title = value;
      }
      return pre;
    });
    setPrerequisites([...newPreReq]);
  }

  function addPreReqRow() {
    if (prerequisites[prerequisites.length - 1].title == "") return;
    setPrerequisites([...prerequisites, { title: "" }]);
    console.log(prerequisites, benefits);
  }

  function nextHandle() {
    if (benefits[benefits.length - 1].title == "") return;
    if (prerequisites[prerequisites.length - 1].title == "") return;
    setActive(active + 1);
  }
  return (
    <form className="w-[70%]">
      <div>
        <label htmlFor="" className={`${styles.label}`}>
          What will get after this course?
        </label>
        {benefits.map((benefit, index) => (
          <input
            type="text"
            id={`benefit-${index}`}
            className={`${styles.input}`}
            key={index}
            value={benefit.title}
            onChange={(e: any) => benefitsChange(index, e.target.value)}
            autoFocus
          />
        ))}
        <AddCircleOutlined onClick={addBenefitRow} />
      </div>
      <div className="mt-6">
        <label htmlFor="" className={`${styles.label}`}>
          What will be required to enroll this course?
        </label>
        {prerequisites.map((pre, index) => (
          <input
            type="text"
            id={`benefit-${index}`}
            className={`${styles.input}`}
            key={index}
            value={pre.title}
            onChange={(e: any) => preReqChange(index, e.target.value)}
            autoFocus
          />
        ))}
        <AddCircleOutlined onClick={addPreReqRow} />
      </div>
      <div className="flex justify-between">
          <input
            type="button"
            value={"Back"}
            onClick={() => setActive(active - 1)}
            className={`${styles.button} bg-red-400`}
          />
        <input
          type="button"
          value={"Next"}
          onClick={nextHandle}
          className={`${styles.button}`}
        />
      </div>
    </form>
  );
};

export default CourseData;
