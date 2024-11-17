import React from 'react';
import { FaFileAlt } from 'react-icons/fa';
import './buttonCSS.css';

const NewFileButton = () => {
    return (
        <button className="new-file-button">
            <FaFileAlt className="icon" />
            New File
        </button>
    );
};

export default NewFileButton;
