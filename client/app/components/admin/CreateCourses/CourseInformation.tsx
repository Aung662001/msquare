import { styles } from "@/app/styles/style";
import React, { FC, useState } from "react";
type Props = {
  courseInformation: any;
  setCourseInformation: ({}:any) => void;
  active:number;
  setActive:(active:number)=>void;
};

const CourseInformation: FC<Props> = ({
  courseInformation: info,
  setCourseInformation: set,
  active,setActive
}) => {
    const [dragging,setDragging] = useState(false)

  function fileInputChange(e: any) {
    const file = e.target.files?.[0];
    if(file){
        const reader = new FileReader();

        reader.onload = () =>{
            if(reader.readyState == 2){
                set({...info,thunbnail:reader.result})
            }
        };
        reader.readAsDataURL(file);
    }
  }

  function onDragOver(e:any){
    e.preventDefault()
    setDragging(true)
  }
  function onDragLeave(e:any){
    e.preventDefault();
    setDragging(false)
  }
  function handleDrop(e: any) {
    e.preventDefault();
    setDragging(false);
  
    const files = e.dataTransfer.files; 
  
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
  
      reader.onload = (e:any) => {
        e.preventDefault();
        if (reader.readyState === 2) {
          set({...info,thunbnail:reader.result})
        }
      };
  
      reader.readAsDataURL(file);
    }
  }
  function submitHandler(){
    setActive(active++);
  }
  return (
    <div>
      {" "}
      <form className="w-[70%]">
        <div className="mb-4">
          <label htmlFor="name" className={`${styles.label}`}>
            Course Name
          </label>
          <input
            type="text"
            id="name"
            className={`${styles.input}`}
            placeholder="React, Angular , etc..."
            value={info.name}
            onChange={(e: any) => set({ ...info, name: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className={`${styles.label}`}>
            Course Description
          </label>
          <textarea
            id="description"
            className={`${styles.textarea}`}
            rows={8}
            value={info.description}
            onChange={(e: any) => set({ ...info, description: e.target.value })}
          />
        </div>

        <div className="mb-4 flex w-full gap-3">
          <div>
            <label htmlFor="price" className={`${styles.label}`}>
              Price
            </label>
            <input
              type="number"
              id="price"
              className={`${styles.input}`}
              value={info.price}
              onChange={(e: any) => set({ ...info, price: e.target.value })}
            />
          </div>
          <div className="flex-grow">
            <label htmlFor="estimate-price" className={`${styles.label} `}>
              Estimate Price
            </label>
            <input
              type="number"
              id="estimate-price"
              className={`${styles.input}`}
              value={info.estimatePrice}
              onChange={(e:any)=>set({...info, estimatePrice:e.target.value})}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="lavel" className={`${styles.label}`}>
            Lavel
          </label>
          <input
            id="lavel"
            className={`${styles.input}`}
            placeholder="Beginner, Intermediate , etc..."
            value={info.lavel}
            onChange={(e:any)=>set({...info, lavel:e.target.value})}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="tags" className={`${styles.label}`}>
            Tags
          </label>
          <input
            id="tags"
            className={`${styles.input}`}
            placeholder="react,frontend,js,etc..."
            value={info.tags}
            onChange={(e:any)=>set({...info,tags:e.target.values})}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="demourl" className={`${styles.label}`}>
            DemoUrl
          </label>
          <input
            id="demourl"
            className={`${styles.input}`}
            placeholder="https://www.youtube.com/watch/demo?course=react"
            value={info.demoUrl}
            onChange={(e:any)=>set({...info,demoUrl:e.target.value})}
          />
        </div>

        <div>
          <input
            type="file"
            className="hidden"
            id="file"
            onChange={(e)=>fileInputChange(e)}
          />
          <label
            htmlFor="file"
            className={`w-full h-[200px]  border border-gray-500 flex justify-center items-center ${dragging?"bg-sky-300":"bg-transparent"}`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={handleDrop}
          >
            {info.thunbnail?<img src={`${info.thunbnail}`} className="object-cover  max-w-fit max-h-[200px] p-2"></img>:"Drop image or click to Browse"}
          </label>
        </div>
        <div>
            <input type="button" onClick={submitHandler} value={"Next"} className={`${styles.button}`}/>
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
