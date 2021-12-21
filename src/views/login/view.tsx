import { FC, useState } from "react";
import "./style.scss";
import { useFormik } from "formik";
import { initialValues, onSubmit } from "./form";
import images from "../../assets";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../models/user/model";
import { login } from "../../services/user/service";
import Loader from "../../components/loader/component";

const Login: FC = () => {
	const { Feet, Logo } = images;
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const loginUser = async (user: Partial<User>) => {
		setIsLoading(true);
		const LoggedUser = await login(user);
		console.log(LoggedUser);
		setIsLoading(false);
		if (
			LoggedUser &&
			LoggedUser.token !== undefined &&
			LoggedUser.username !== undefined
		) {
			localStorage.setItem("user_token", LoggedUser.token);
			localStorage.setItem("user_name", LoggedUser.username);
			navigate("/", { replace: true });
		}
	};

	const formik = useFormik({
		initialValues,
		onSubmit: (values) => onSubmit(values, loginUser),
	});

	return (
		<section className="login-container">
			<img src={Feet} alt="Feet" />
			<form className="form-container" onSubmit={formik.handleSubmit}>
				<img src={Logo} alt="Only Feet" className="logo" />
				<h1>Only Feet</h1>
				<span>Welcome back🥳</span>

				<TextField
					className="inputs"
					type="text"
					name="username"
					label="Username"
					required
					variant="outlined"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.username}
				/>
				<TextField
					className="inputs"
					type="password"
					name="password"
					required
					label="Password"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.password}
				/>
				{isLoading ? (
					<Loader />
				) : (
					<Button
						variant="contained"
						type="submit"
						className="button"
					>
						Log in
					</Button>
				)}
				<Link to="/signup" className="link">
					Don't have an account?
				</Link>
			</form>
		</section>
	);
};

export default Login;
