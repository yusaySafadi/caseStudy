import {Navigate} from "react-router-dom";

const ProtectedRoute = ({ user, children, redirectTo }) => {
    if (!user) {
        return <Navigate to={redirectTo} />;
    }
    return children;
};

export default ProtectedRoute;