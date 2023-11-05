import { Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard } from '../Dashboard/Dashboard';

export const AuthorizedRoutes = () => {
    return(
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
    );
};