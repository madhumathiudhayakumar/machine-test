import React, { Suspense, lazy,  } from "react";
import { Route, Routes, } from "react-router-dom";
// import PrivateRoute from "./privateRoute";

const Login = lazy(() => import("../screens/loginForm"));
const HomeScreen = lazy(() => import("../screens/homeScreen"));

const AppRoutes = () => {

	return (
		<Suspense fallback={<div className="spinner-border"></div>}>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route
					path="/home"
					element={
						// <PrivateRoute>
						<HomeScreen />
						// </PrivateRoute>
					}
				/>
			</Routes>
		</Suspense>
	);
}

export default AppRoutes;