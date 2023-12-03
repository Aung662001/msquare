import { styles } from "@/app/styles/style";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";
import {
  AiOutlineArrowDown,
  AiOutlineDelete,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { BsLink45Deg } from "react-icons/bs";

type Props = {
  active: number;
  setActive: (active: number) => void;
  mainCourseData: any;
  setMainCourseData: (mainCourseData: any) => void;
  handleSubmit: any;
};

const MainCourseData: FC<Props> = ({
  active,
  setActive,
  mainCourseData,
  setMainCourseData,
  handleSubmit: handleCourseSubmit,
}) => {
  const [collapsed, setCollapsed] = useState(
    Array(mainCourseData.length).fill(false)
  );
  const [activeSection, setActiveSection] = useState(1);

  function handleCollapsedToggle(index: number) {
    const collapsedData = [...collapsed];
    collapsedData[index] = !collapsedData[index];
    setCollapsed(collapsedData);
  }
  function AddLink(index: number) {
    let newLink = { title: "", url: "" };
    let data = [...mainCourseData];
    data[index].links.push(newLink);
    setMainCourseData(data);
  }
  function deleteLink(linkIndex: number, index: number) {
    let data = [...mainCourseData];
    data[index].links.splice(linkIndex, 1);
    setMainCourseData(data);
  }
  function addNewContent(item: any) {
    if (
      item.title == "" ||
      item.description == "" ||
      item.videoUrl == "" ||
      item.links[0].title == "" ||
      item.links[0].url == ""
    ) {
      toast.error("Please fill all fields.");
    } else {
      let lastVideoSection =
        mainCourseData[mainCourseData.length - 1].videoSection;
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: lastVideoSection || "",
        links: [{ title: "", url: "" }],
      };
      setMainCourseData([...mainCourseData, newContent]);
    }
  }
  function addNewSection() {
    if (
      mainCourseData[mainCourseData.length - 1].title == "" ||
      mainCourseData[mainCourseData.length - 1].videoUrl == "" ||
      mainCourseData[mainCourseData.length - 1].links[0].title == "" || 
      mainCourseData[mainCourseData.length -1].links[0].url == ""||
      mainCourseData[mainCourseData.length -1].description =="" 
    ) {
      toast.error("Please fill all fields")
    }else{
      setActiveSection(activeSection + 1);
      let newSectionData = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: "Untitled section "+activeSection,
        links: [{ title: "", url: "" }],
      }
      setMainCourseData([...mainCourseData,newSectionData])
    }
  }
  function prevButton(){
    setActive(active-1)
  }
  function nextButton(){
    if(
      mainCourseData[mainCourseData.length - 1].title == "" ||
      mainCourseData[mainCourseData.length - 1].videoUrl == "" ||
      mainCourseData[mainCourseData.length - 1].links[0].title == "" || 
      mainCourseData[mainCourseData.length -1].links[0].url == ""||
      mainCourseData[mainCourseData.length -1].description =="" 
    ){
      toast.error("You need to fill all fields")
    }else{
      setActive(active+1)
    }
  }
  return (
    <div className="w-[90%] mt-20 mb-[100px]">
      <form action="">
        {mainCourseData.map((item: any, index: number) => {
          let showSectionInput =
            index == 0 ||
            item.videoSection !== mainCourseData[index - 1].videoSection;
          return (
            <div
              className={`w-full bg-[#cdc8c817] p-4 ${
                showSectionInput ? "mt-10" : "mb-0"
              }`}
              key={index}
            >
              {showSectionInput && (
                <div>
                  <label htmlFor="videoSection" className="flex items-center">
                    <input
                      type="text"
                      id="videoSection"
                      value={item.videoSection}
                      className={`${styles.input} w-min bg-transparent outline-none border-none text-[20px] font-bold`}
                      onChange={(e: any) => {
                        let data = [...mainCourseData];
                        data[index].videoSection = e.target.value;
                        setMainCourseData(data);
                      }}
                    />
                    <BiPencil className="cursor-pointer" />
                  </label>
                </div>
              )}
              <div className="w-full flex items-center justify-between my-0">
                {collapsed[index] ? (
                  item.title ? (
                    <p className="font-Poppins dark:text-white text-black">
                      {index + 1}. {item.title}
                    </p>
                  ) : (
                    <p></p>
                  )
                ) : (
                  <div></div>
                )}
                <div className="flex gap-2">
                  <AiOutlineDelete
                    className={`${
                      index > 0 ? "cursor-pointer" : "cursor-no-drop"
                    }`}
                    onClick={() => {
                      const updateData = [...mainCourseData];
                      updateData.splice(index, 1);
                      setMainCourseData(updateData);
                    }}
                  />
                  <AiOutlineArrowDown
                    className="cursor-pointer"
                    style={{
                      transform: !collapsed[index]
                        ? "rotate(180deg) "
                        : "rotate(0deg) ",
                    }}
                    onClick={() => handleCollapsedToggle(index)}
                  />
                </div>
              </div>
              {!collapsed[index] && (
                <>
                  <div>
                    <label htmlFor="videoTitle" className={styles.label}>
                      Video Title
                    </label>
                    <input
                      type="text"
                      id="videoTitle"
                      className={styles.input}
                      value={item.title}
                      onChange={(e: any) => {
                        let data = [...mainCourseData];
                        data[index].title = e.target.value;
                        setMainCourseData(data);
                      }}
                    />
                  </div>
                  <br></br>

                  <div>
                    <label htmlFor="videoUrl" className={styles.label}>
                      Video Url
                    </label>
                    <input
                      type="text"
                      id="videoUrl"
                      className={styles.input}
                      value={item.videoUrl}
                      onChange={(e: any) => {
                        let data = [...mainCourseData];
                        data[index].videoUrl = e.target.value;
                        setMainCourseData(data);
                      }}
                    />
                  </div>
                  <br></br>

                  <div>
                    <label htmlFor="videoDescription" className={styles.label}>
                      Video Description
                    </label>
                    <textarea
                      rows={6}
                      cols={20}
                      id="videoDescription"
                      className={styles.textarea}
                      value={item.description}
                      onChange={(e: any) => {
                        let data = [...mainCourseData];
                        data[index].description = e.target.value;
                        setMainCourseData(data);
                      }}
                    />
                  </div>
                  <br></br>
                  <div>
                    {item.links.map((item: any, linkIndex: number) => {
                      return (
                        <div key={index}>
                          <div className="flex items-center justify-between">
                            <label htmlFor="url" className={`${styles.label}`}>
                              Link {linkIndex + 1}
                            </label>
                            <AiOutlineDelete
                              className={`${
                                linkIndex > 0
                                  ? "cursor-pointer"
                                  : "cursor-no-drop"
                              }`}
                              onClick={() => {
                                deleteLink(linkIndex, index);
                              }}
                            />
                          </div>
                          <input
                            type="text"
                            id="title"
                            placeholder="Link title"
                            className={`${styles.input}`}
                            value={item.title}
                            onChange={(e) => {
                              let data = [...mainCourseData];
                              data[index].links[linkIndex].title =
                                e.target.value;
                              setMainCourseData(data);
                            }}
                          />
                          <input
                            type="text"
                            placeholder="Link url"
                            className={`${styles.input}`}
                            id="url"
                            value={item.url}
                            onChange={(e) => {
                              let data = [...mainCourseData];
                              console.log(data[index].links);
                              data[index].links[linkIndex].url = e.target.value;
                              setMainCourseData(data);
                            }}
                          />
                          <br></br>
                        </div>
                      );
                    })}
                    <div className="block cursor-pointer">
                      <p
                        className="flex items-center "
                        onClick={() => AddLink(index)}
                      >
                        <BsLink45Deg /> Add Link
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex cursor-pointer mt-2"
                    onClick={() => addNewContent(item)}
                  >
                    <AiOutlinePlusCircle className={` mt-1`} /> Add Content
                  </div>
                </>
              )}
            </div>
          );
        })}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => addNewSection()}
        >
          <AiOutlinePlusCircle />
          Add New Section
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
          onClick={nextButton}
          className={`${styles.button}`}
        />
      </div>
      </form>
    </div>
  );
};

export default MainCourseData;
