import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Fab,
	TextField,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import Profile from "../../components/profile/component";
import { FeetProps } from "../../models/feet/model";
import {
	fetchMyPublicFeet,
	fetchFeet,
	createMyFeet,
} from "../../services/feet/service";
import "./style.scss";
import AddIcon from "@mui/icons-material/Add";
import { Formik } from "formik";
import { onSubmit, formValues } from "./form";
import ProfileItem from "./components/feet/component";

const MyProfile: FC = () => {
	const [feet, setFeet] = useState<FeetProps[]>([]);
	const [publicFeet, setPublicFeet] = useState<Partial<FeetProps>>({});
	const [open, setOpen] = useState(false);

	const initialValues: formValues = {
		image: "",
		description: "",
		title: "",
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const createFeet = (feet: any) => {
		const completeFeet = {
			...feet,
			user: publicFeet.id,
			likes: 0,
			date: Date.now(),
		};
		createMyFeet(completeFeet);
		handleClose();
	};

	useEffect(() => {
		const getPublicFeet = async () => {
			const recivedPublicFeet = await fetchMyPublicFeet();
			setPublicFeet(recivedPublicFeet);
			const recivedFeet = await fetchFeet(recivedPublicFeet.id);
			console.log(recivedFeet);
			setFeet(recivedFeet);
		};
		getPublicFeet();
	}, []);
	return (
		<section className="my-profile-section">
			<Profile
				image={publicFeet.image}
				id={publicFeet.id}
				date={publicFeet.date}
				description={publicFeet.description}
				likes={publicFeet.likes}
				title={publicFeet.title}
				user={publicFeet.user}
			/>
			{feet.map((foot) => (
				<ProfileItem
					key={foot.id}
					user={foot.user}
					title={foot.title}
					likes={foot.likes}
					description={foot.description}
					date={foot.date}
					id={foot.id}
					image={foot.image}
				/>
			))}
			<Fab
				color="primary"
				aria-label="add"
				className="fab-icon"
				onClick={handleClickOpen}
			>
				<AddIcon />
			</Fab>
			<Dialog open={open} onClose={handleClose}>
				<Formik
					initialValues={initialValues}
					onSubmit={(values) => {
						onSubmit(values, createFeet);
					}}
				>
					{(props) => (
						<form onSubmit={props.handleSubmit}>
							<DialogTitle>Create new feet</DialogTitle>
							<DialogContent>
								<TextField
									onChange={props.handleChange}
									onBlur={props.handleBlur}
									value={props.values.title}
									autoFocus
									margin="dense"
									name="title"
									label="Title"
									type="text"
									fullWidth
									variant="standard"
								/>
								<TextField
									onChange={props.handleChange}
									onBlur={props.handleBlur}
									value={props.values.description}
									autoFocus
									margin="dense"
									name="description"
									label="Description"
									type="text"
									fullWidth
									variant="standard"
								/>
								<TextField
									onChange={props.handleChange}
									onBlur={props.handleBlur}
									value={props.values.image}
									autoFocus
									margin="dense"
									name="image"
									label="Image (URL)"
									type="text"
									fullWidth
									variant="standard"
								/>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleClose}>Cancel</Button>
								<Button type="submit">Save</Button>
							</DialogActions>
						</form>
					)}
				</Formik>
			</Dialog>
		</section>
	);
};
export default MyProfile;
