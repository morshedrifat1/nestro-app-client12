import React, { use } from 'react';
import { ThemeContext } from '../../context/themeContext/ThemeContext';
import { HashLoader } from "react-spinners";

const LoadingSpiner = () => {
    const {isDark} = use(ThemeContext);
    return (
        <div className='h-screen flex justify-center items-center'>
            <HashLoader color={isDark?"#ffffff":"#171717"} />
        </div>
    );
};

export default LoadingSpiner;