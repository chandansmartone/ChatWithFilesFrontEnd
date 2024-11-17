import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { FaImage, FaFilePdf, FaFileAlt, FaFileCode, FaFileExcel, FaSignOutAlt } from 'react-icons/fa';
import { SmLoading } from '../Utils/smallLoadingComponent/SmLoading';
import NewFileButton from '../Utils/NewFileButton/NewFileButton';


const Sidebar = ({ files, selectedFile, onSelectFile, onDeleteFile ,handleNewFileReq}) => {
    const [loadingFileId, setLoadingFileId] = useState(null); // Track which file is being deleted

    const getFileIcon = (fileName) => {
      
        
        
        const extension = fileName.split('.').pop().toLowerCase();
        switch (extension) {
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                return <FaImage />;
            case 'pdf':
                return <FaFilePdf />;
            case 'doc':
            case 'docx':
                return <FaFileAlt />;
            case 'js':
            case 'css':
                return <FaFileCode />;
            case 'xlsx':
            case 'xls':
                return <FaFileExcel />;
            case 'txt':
                return <FaFileAlt />;
            default:
                return <FaFileAlt />;
        }
    };

    const handleDelete = async (fileId) => {
        setLoadingFileId(fileId); // Set loading state
        await onDeleteFile(fileId); // Call the delete function
        setLoadingFileId(null); // Reset loading state
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2>Files</h2>
            </div>

            <ul className="sidebar-menu">
                <div onClick={handleNewFileReq}>
                <NewFileButton />
                </div>
                {files.map((file) => (
                    <div key={file.fileId}>
                        <li
                            className={selectedFile?.fileId === file.fileId ? 'selectedFileClass' : ''}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                        >
                            <Link
                                to="#"
                                onClick={() => onSelectFile(file.fileId)}
                                className={selectedFile?.fileId === file.fileId ? 'selectedFileClassAnchor' : ''}
                                style={{ display: 'flex', alignItems: 'center', flex: '1 1 auto', overflow: 'hidden' }}
                            >
                                {getFileIcon(file.fileName)}
                                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {file.fileName}
                                </span>
                                
                            </Link>
                            {loadingFileId === file.fileId ? (
                                <SmLoading /> // Show loading spinner while deleting
                            ) : (
                                <RiDeleteBin2Fill
                                    onClick={() => handleDelete(file.fileId)}
                                    style={{ marginLeft: '8px', cursor: 'pointer' }}
                                />
                            )}
                        </li>
                        <hr />
                    </div>
                ))}
                <li>
                    <Link to="/logout">
                        <FaSignOutAlt /> Logout
                    </Link>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
