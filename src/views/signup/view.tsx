import { FC, useState } from "react";
import "./style.scss";
import { useFormik } from "formik";
import { initialValues, onSubmit, validationSchema } from "./form";
import images from "../../assets";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { User } from "../../models/user/model";
import { signup } from "../../services/user/service";
import Loader from "../../components/loader/component";
import { useNavigate } from "react-router-dom";

const SignUp: FC = () => {
	const { Feet, Logo } = images;
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const signupUser = async (user: Partial<User>) => {
		setIsLoading(true);
		const signedIn = await signup(user);
		setIsLoading(false);
		if (signedIn) {
			navigate("/login", { replace: true });
		}
	};

	const formik = useFormik({
		initialValues,
		onSubmit: (values) => onSubmit(values, signupUser),
		validationSchema,
	});

	return (
		<section className="signup-container">
			<form className="form-container" onSubmit={formik.handleSubmit}>
				<img src={Logo} alt="Only Feet" className="logo" />
				<h1>Only Feet</h1>
				<span>Create an account</span>
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
					type="email"
					name="email"
					label="Email"
					required
					variant="outlined"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.email}
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
						Sign up
					</Button>
				)}
			</form>
			<img src={Feet} alt="Feet" />
		</section>
	);
};

export default SignUp;
