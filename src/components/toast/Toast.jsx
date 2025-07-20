import React from 'react';
import { Slide, toast } from 'react-toastify';

const Toast = ({type,message}) => {
    return toast[type](message, {
        autoClose: 3000,
        hideProgressBar: true,
        transition: Slide,
      });
};

export default Toast;