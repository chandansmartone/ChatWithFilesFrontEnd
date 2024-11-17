// src/services/apiService.js
import axios from 'axios';
import { toast } from 'react-toastify';

// Create an Axios instance with the base URL
const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});


// Fetch chat history
export const fetchChatHistory = async (fileId, token) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/file/${fileId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.file;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

// Send user message
export const sendMessage = async (fileId, userPrompt, token) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/gpt/message`, {
            fileId,
            userPrompt,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.response;
    } catch (error) {
        handleError(error);
        throw error;
    }
};


// Fetch files
export const fetchFiles = async (token) => {
    try {
        const response = await api.get('/api/files', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.files || [];
    } catch (error) {
        handleError(error);
        throw error;
    }
};

// Delete file
export const deleteFile = async (fileId, token) => {
    try {
        await api.delete(`/api/file/${fileId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        handleError(error);
        throw error;
    }
};

// Upload file
export const uploadFile = async (file, token, onUploadProgress) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await api.post('/api/upload', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress, // Progress callback function
        });
        return response.data.file;
    } catch (error) {
        handleError(error);
        throw error;
    }
};
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, { email, password });
        return response.data; // Return the response data (token and user)
    } catch (error) {
        handleError(error);
        throw error; // Re-throw the error to handle it in the component
    }
};


// Handle errors and show a toast notification
export const handleError = (error) => {
    console.error('API Error:', error.message);
    toast.error(`Error: ${error.response?.data?.message || error.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
};
