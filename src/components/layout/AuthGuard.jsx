import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loader from '../ui/Loader';

function AuthGuard({ roles = [] }) {
    const { user, loading, authChecked } = useAuth();

    if (loading || !authChecked) return <Loader />;
    if (!user) return <Navigate to="/" replace />;
    if (roles.length > 0 && !roles.includes(user.role)) {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
}

export default AuthGuard;
