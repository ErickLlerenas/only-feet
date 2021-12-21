import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
	Button,
	CardActions,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	TextField,
} from "@mui/material";
import { FC, useState } from "react";
import { FeetProps } from "../../models/feet/model";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import "./style.scss";
import { Formik } from "formik";
import { formValues, onSubmit } from "./form";
import { updateMyPublicFeet } from "../../services/feet/service";

const Profile: FC<Partial<FeetProps>> = ({
	image,
	id,
	user,
	date,
	description,
	likes,
	title,
}) => {
	const initialValues: formValues = {
		image: image ? image : "",
		description: description ? description : "",
		title: title ? title : "",
	};
	console.log(initialValues);

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const editFeet = (feet: Partial<FeetProps>) => {
		if (id !== undefined) {
			const completeFeet = {
				...feet,
				date,
				id,
				user,
				likes,
			};
			updateMyPublicFeet(id, completeFeet);
			handleClose();
		}
	};

	return (
		<>
			<Card sx={{ maxWidth: "100%", marginBottom: "5%" }}>
				<CardMedia
					component="img"
					height="200"
					image={image}
					alt="feet"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{user?.username}
					</Typography>
					<Typography variant="body1" color="text.primary">
						{title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{description}
					</Typography>
				</CardContent>
				<CardActions disableSpacing>
					<IconButton
						aria-label="add to favorites"
						onClick={handleClickOpen}
					>
						<EditIcon />
					</IconButton>
				</CardActions>
			</Card>
			<Dialog open={open} onClose={handleClose}>
				<Formik
					initialValues={initialValues}
					onSubmit={(values) => {
						onSubmit(values, editFeet);
					}}
				>
					{(props) => (
						<form onSubmit={props.handleSubmit}>
							<DialogTitle>
								Edit public feet
								<IconButton
									aria-label="close"
									onClick={handleClose}
									sx={{
										position: "absolute",
										right: 8,
										top: 8,
										color: (theme) =>
											theme.palette.grey[500],
									}}
								>
									<CloseIcon />
								</IconButton>
							</DialogTitle>
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
		</>
	);
};

export default Profile;
