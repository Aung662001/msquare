import React, { FC } from "react";
import { Box, Modal } from "@mui/material";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeNumber: any;
  component: any;
  setRoute?: (route: string) => void;
}
const CustumModal: FC<Props> = ({ open, setOpen, activeNumber,component:Component,setRoute }) => {
  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute w-[500px] top-[50%] left-[50%]  -translate-y-1/2 outline-none rounded-lg shadow-md p-4 -translate-x-1/2 bg-white dark:bg-slate-900 ">
         <Component setOpen={setOpen} setRoute={setRoute}/>
        </Box>
      </Modal>
    </>
  );
};

export default CustumModal;
