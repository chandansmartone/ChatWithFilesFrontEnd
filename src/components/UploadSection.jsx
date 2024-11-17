import React, { useState } from 'react';
import { useAuth } from '../Utils/AuthProvide';
import { uploadFile } from '../Utils/ApiCalls';
import './uploadSection.css';
import { toast } from 'react-toastify';

const UploadSection = ({ onFileUploaded }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const { token } = useAuth();
    const fileInputRef = React.createRef();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        if (event.dataTransfer.files.length > 0) {
            setFile(event.dataTransfer.files[0]);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleUpload = async () => {
        if (!file) {
            toast.error(`Upload File`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        };

        setLoading(true);
        setProgress(0);

        try {
            const uploadedFile = await uploadFile(file, token, (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setProgress(percentCompleted);
            });
            onFileUploaded(uploadedFile);
            toast.success(`File uploaded successfully`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setFile(null);
            setProgress(0);
        } catch (error) {
            console.error('File upload error:', error);
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <div 
            className="upload-section"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current && fileInputRef.current.click()} // Trigger file input on click
        >
            <div className="upload-instructions">
                <div className="upload-icon">
                    <img src="https://img.icons8.com/ios-glyphs/90/000000/file.png" alt="Upload Icon" />
                </div>
                <p>Click to upload, or drag file here</p>
            </div>
            <input
                type="file"
                onChange={handleFileChange}
                className="file-input"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept=".pdf, .doc, .docx, .xls, .xlsx, .png, .jpg, .jpeg, .txt, .css, .js"
            />
            <button onClick={(e) => { e.stopPropagation(); handleUpload(); }} className="upload-button" disabled={loading}>
                {loading ? `Uploading... ${progress-1}%` : 'Upload File'}
            </button>
            {file && <p className="file-name">Selected file: {file.name}</p>}
            {loading && <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                <p className="progress-percentage">{progress-1}%</p>
            </div>}
        </div>
    );
};

export default UploadSection;
