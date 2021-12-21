import "./app.scss";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

//Views
import NotFound from "./views/not-found/view";
import Login from "./views/login/view";
import Home from "./views/home/view";
import Signup from "./views/signup/view";
import MyProfile from "./views/my-profile/view";
import { useEffect } from "react";
import Layout from "./layout";
import UserProfile from "./views/user-profile/view";

function App() {
	const location = useLocation();
	const navigate = useNavigate();
	const tokenUser = localStorage.getItem("user_token");

	useEffect(() => {
		if (
			tokenUser &&
			tokenUser !== "" &&
			(location.pathname === "/login" || location.pathname === "/login/")
		) {
			navigate("/", { replace: true });
		}
		if (
			tokenUser &&
			tokenUser !== "" &&
			(location.pathname === "/signup" ||
				location.pathname === "/signup/")
		) {
			navigate("/", { replace: true });
		}
		return () => {};
	}, [tokenUser]);

	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="*" element={<NotFound />} />
			<Route
				path="/"
				element={
					<Layout>
						<Home />
					</Layout>
				}
			/>
			<Route
				path="/my-profile"
				element={
					<Layout>
						<MyProfile />
					</Layout>
				}
			/>
			<Route
				path="/feet/:id"
				element={
					<Layout>
						<UserProfile />
					</Layout>
				}
			/>
		</Routes>
	);
}

export default App;
