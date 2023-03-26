import React, { Children, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./modal.css"
import axiosInstance from "../axios";
import { PropsWithChildren } from "react";


const Modal = (props) => {
    return   (
      <div className={props.active ? "modal active" : "modal"} onClick={()=>props.setActive(false)}>
            <div className={props.active ? "modal__content active" : "modal__content"} onClick={e=>e.stopPropagation()}>
                {props.children}
            </div>
      </div>
    );
};

export default Modal