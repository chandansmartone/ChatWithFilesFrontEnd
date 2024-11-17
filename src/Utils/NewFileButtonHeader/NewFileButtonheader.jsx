
import React from 'react';
import { FaFileAlt } from 'react-icons/fa';
import './buttonCss.css';

const NewFileButtonheader = () => {
    return (
        <button className="header-new-file-button">
            <FaFileAlt className="icon" />
            New File
        </button>
    );
};

export default NewFileButtonheader;
