import React, { FC } from "react";
import { Modal } from "@mui/material";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: any;
  component: any;
  setRoute: (route: string) => void;
}
const CustumModal: FC<Props> = ({ open, setOpen, activeItem }) => {
  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      ></Modal>
    </>
  );
};

export default CustumModal;
