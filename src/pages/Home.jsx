// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../Utils/AuthProvide';
import Sidebar from '../components/Sidebar';
import UploadSection from '../components/UploadSection';
import ChatSection from '../components/ChatSection';
import Header from '../components/Header/Header';
import { useNavigate } from 'react-router-dom';
import { Lsloading } from '../Utils/fullPageLoading/Lsloading';
import { fetchFiles, deleteFile } from '../Utils/ApiCalls';
import './Home.css';
import { toast } from 'react-toastify';

const Home = ({ username }) => {
    const { token, setToken } = useAuth();
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const savedFile = localStorage.getItem('selectedFile');
        if (savedFile) {
            setSelectedFile(JSON.parse(savedFile));
        }

        const loadFiles = async () => {
            if (!token) return;
            try {
                const filesData = await fetchFiles(token);
                setFiles(filesData);
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    localStorage.removeItem('access_token');
                    toast.error(`Session Expired. Please login again.`, { autoClose: 3000 });
                    setToken(null);
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        loadFiles();
    }, [token, setToken, navigate]);

    const handleFileUploaded = (newFile) => {
        localStorage.setItem('selectedFile', JSON.stringify(newFile));
        setFiles((prevFiles) => [...prevFiles, newFile]);
        setSelectedFile(newFile);
    };

    const handleSelectFile = (file) => {
        localStorage.setItem('selectedFile', JSON.stringify(file));
        setSelectedFile(file);
    };

    const handleDelete = async (fileId) => {
        try {
            await deleteFile(fileId, token);
            setFiles((prevFiles) => prevFiles.filter(file => file.fileId !== fileId));

            if (selectedFile && selectedFile.fileId === fileId) {
                localStorage.removeItem('selectedFile');
                setSelectedFile(null);
            }
        } catch (error) {
            console.error('Failed to delete file:', error.message);
        }
    };

    const handleNewFileReq = () => {
        localStorage.removeItem('selectedFile');
        setSelectedFile(null);
    };

    if (loading) return <Lsloading />;

    return (
        <div className="home-container">
            <Header username={username} handleNewFileReq={handleNewFileReq} />
            <div className="main_container flex">
                <Sidebar
                    files={files}
                    selectedFile={selectedFile}
                    onSelectFile={handleSelectFile}
                    onDeleteFile={handleDelete}
                    handleNewFileReq={handleNewFileReq}
                />
                {selectedFile ? (
                    <ChatSection selectedFile={selectedFile} />
                ) : (
                    <UploadSection onFileUploaded={handleFileUploaded} />
                )}
            </div>
        </div>
    );
};

export default Home;
