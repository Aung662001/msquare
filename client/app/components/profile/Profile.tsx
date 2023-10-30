import React, { useState ,FC} from "react";
import ProfileSideBar from "./ProfileSideBar"

type Props = {
  user: any;
};

const Profile:FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [active,setActive] = useState(1);
  const [avatar,setAvater] = useState(user.avatar.url || null)

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }
  const logoutHandler = () =>{}
  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-white bg-opacityp-90 dark:border-0 border-[1px] border-gray-300  rounded-sm shadow-lg mt-[80px] mb-[80px] sticky ${
          scroll ? "top-120px" : "top-[30px"
        } left-[30px]`}
      >
        <ProfileSideBar 
        user={user}
        active={active}
        setActive={setActive}
        avatar={avatar}
        logoutHandler={logoutHandler}
        />
      </div>
    </div>
  );
};

export default Profile;
