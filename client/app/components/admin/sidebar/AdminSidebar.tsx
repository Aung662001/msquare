"use client";
import React, { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
  ReceiptOutlined,
  BarChartOutlined,
  MapOutlined,
  Groups,
  OndemandVideo,
  VideoCall,
  Web,
  Quiz,
  Wysiwyg,
  ManageHistory,
  Settings,
  ExitToApp,
  PeopleOutline,
  ArrowBackIos,
  ArrowForwardIos,
  HomeOutlined,
} from "./Icon";
import { useTheme } from "next-themes";
import Image from "next/image";
import {  Box, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useLogoutQuery } from "@/redux/features/auth/authApiSlice";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";

type Props = {
  title: string;
  hoverText: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: (selected: string) => void;
};

const Item = ({ title, to, icon, selected, setSelected,hoverText }: Props) => {
  return (
    <Link href={to} title={hoverText}>
      <MenuItem
        onClick={() => setSelected(title)}
        active={selected == title}
        icon={icon}
      >
        <Typography className="!text-[16px] !font-Poppins">{title}</Typography>
      </MenuItem>
    </Link>
  );
};
const SideBar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setLogout] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useLogoutQuery(undefined,{skip:!logout})
  
  useEffect(() => {
    setMounted(true)
    document.documentElement.clientWidth < 900 && setIsCollapsed(true) 
  }, []);
  if (!mounted) return null;

  const logoutHandler = () =>{
    setLogout(true);
    signOut();
  } 
  
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${
            theme == "dark" ? "#111C43 !important" : "#fff !important"
          }`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-inner-item.active": {
          color: "#6870fa !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
          opacity: 1,
          display: "flex",
          alignItems: "flex-start",
          gap: "10px",
        },
        "& .pro-menu-item": {
          color: `${theme !== "dark" && "#000"}`,
        },
      }}
      className="!bg-white dark:bg-[#111c43] "
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          overflowY:!isCollapsed?"scroll":"hidden",
          overflowX:"hidden",
          top: 0,
          left: 0,
          height: "100%",
          width: isCollapsed ? "60px" : "210px",
        }}
      >
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <ArrowForwardIos /> : ""}
            style={{ margin: "10px 0px 20px 0px" }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Link href="/">
                  <h3 className="text-[25px] font-Poppins uppercase dark:text-white text-black">
                    Msquare
                  </h3>
                </Link>
                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="inline-block"
                  style={{marginLeft:"20px"}}
                >
                  <ArrowBackIos className="dark:text-white text-black" />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Image
                  alt="user-pf-img"
                  width={100}
                  height={100}
                  src={
                    user?.avatar ? user.avatar.url : "/../../Route/msquare.jpg"
                  }
                  style={{
                    cursor: "pointer",
                    // borderRadius: "100%",
                    border: "3px solid #5b6fe6",
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  className="!text-[16px] text-black dark:text-white m-[10px]"
                >
                  {user?.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ m: "10px 0 0 0" }}
                  className="!text-[16px] text-black dark:text-white capitalize"
                >
                  -{user?.role}
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={isCollapsed ? undefined : "10%"} >
            <Item
              title={isCollapsed ?"":"Dashboard"}
              hoverText={!isCollapsed ?"":"Dashboard"}
              to="/admin"
              icon={<HomeOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 10px" }}
              className="!text-[18px] text-black dark:text-white capitalize !font-[400]"
            >
              {!isCollapsed && "Data"}
            </Typography>
            <Item
              hoverText={!isCollapsed ?"":"Users"}
              title={isCollapsed ?"":"Users"}
              to="/admin/users"
              icon={<Groups />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              hoverText={!isCollapsed ?"":"Invoices"}
              title={isCollapsed ?"":"Invoices"}
              to="/admin/invoices"
              icon={<ReceiptOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              className="!text-[18px] text-black dark:text-white capitalize !font-[400]"
              sx={{ m: "15px 0 5px 10px" }}
            >
              {!isCollapsed && "Content"}
            </Typography>
            <Item
              hoverText={!isCollapsed ?"":"Create Courses"}
              title={isCollapsed ?"":"Create Courses"}
              to="/admin/create-courses"
              icon={<VideoCall />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              hoverText={!isCollapsed ?"":"Live Courses"}
              title={isCollapsed ?"":"Live Courses"}
              to="/admin/courses"
              icon={<OndemandVideo />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              className="!text-[18px] text-black dark:text-white capitalize !font-[400]"
              sx={{ m: "15px 0 5px 10px" }}
            >
              {!isCollapsed && "Customizations"}
            </Typography>
            <Item
              hoverText={!isCollapsed ?"":"Hero"}
              title={isCollapsed ?"":"Hero"}
              to="/admin/hero"
              icon={<Web />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              hoverText={!isCollapsed ?"":"FAQ"}
              title={isCollapsed ?"":"FAQ"}
              to="/faq"
              icon={<Quiz />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              hoverText={!isCollapsed ?"":"Categories"}
              title={isCollapsed ?"":"Categories"}
              to="/admin/categories"
              icon={<Wysiwyg />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              className="!text-[18px] text-black dark:text-white capitalize !font-[400]"
              sx={{ m: "15px 0 5px 10px" }}
            >
              {!isCollapsed && "Controllers"}
            </Typography>
            <Item
              title={isCollapsed ?"":"Manage Team"}
              hoverText={!isCollapsed ?"":"Manage Team"}
              to="/admin/team"
              icon={<PeopleOutline />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              className="!text-[18px] text-black dark:text-white capitalize !font-[400]"
              sx={{ m: "15px 0 5px 10px" }}
            >
              {!isCollapsed && "Analytics"}
            </Typography>
            <Item
              hoverText={!isCollapsed ?"":"Courses Analytics"}
              title={isCollapsed ?"":"Courses Analytics"}
              to="/admin/courses-analytics"
              icon={<BarChartOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              hoverText={!isCollapsed ?"":"Orders Analytics"}
              title={isCollapsed ?"":"Orders Analytics"}
              to="/admin/orders-analytics"
              icon={<MapOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              hoverText={!isCollapsed ?"":"Users Analytics"}
              title={isCollapsed ?"":"Users Analytics"}
              to="/admin/users-analytics"
              icon={<ManageHistory />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              className="!text-[18px] text-black dark:text-white capitalize !font-[400]"
              sx={{ m: "15px 0 5px 10px" }}
            >
              {!isCollapsed && "Extras"}
            </Typography>
            <Item
              hoverText={!isCollapsed ?"":"Settings"}
              title={isCollapsed ?"":"Settings"}
              to="/admin/settings"
              icon={<Settings />}
              selected={selected}
              setSelected={setSelected}
            />
            <div onClick={logoutHandler}>
              <Item
              hoverText={!isCollapsed ?"":"Logout"}
              title={isCollapsed ?"":"Logout"}
                to="/"
                icon={<ExitToApp />}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};
export default SideBar;
