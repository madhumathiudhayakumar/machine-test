import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const storedData = JSON.parse(localStorage.getItem("userCredentials"))
  const checksIsLogin = Object.values(storedData).every(value => value !== "");
  return checksIsLogin ? children : <Navigate to="/" />;
};

export default PrivateRoute;
