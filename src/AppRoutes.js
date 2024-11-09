import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import LandingPage from './pages/LandingPage';
import NotebookPage from './pages/NotebookPage';
import NotebookManagementPage from './pages/NotebookManagementPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/notebooks" element={<NotebookManagementPage />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/notebook/:notebookId" element={<NotebookPage />} />
        </Routes>
    );
};

export default AppRoutes;