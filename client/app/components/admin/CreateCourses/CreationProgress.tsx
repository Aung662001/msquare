import React, { FC } from "react";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

type Props = {
  active: number;
  setActive: (active: number) => void;
};

const CreationProgress: FC<Props> = ({ active, setActive }) => {
  const progerss = [
    "Course Information",
    "Course Options",
    "Course Content",
    "Course Preview",
  ];
  return (
    <div className="fixed -z-40">
      {progerss.map((item, index) => {
        return (
          <div className="flex flex-col" key={index}>
            <div className="flex ">
              <span
                className={`${
                  index < active+1 ? "bg-sky-400" : "bg-gray-500"
                } w-[30px] h-[30px] p-1 rounded-full flex  text-center justify-center mr-1`}
              >
                <CheckOutlinedIcon />
              </span>
              {item}
            </div>
            {index<progerss.length-1 && <div className={`w-[4px] h-8 ${index <active+1?"bg-sky-400":"bg-gray-700 "} ml-3`}></div>}
          </div>
        );
      })}
    </div>
  );
};

export default CreationProgress;
