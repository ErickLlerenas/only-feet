import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FC, useState } from "react";
import { FeetProps } from "../../../../models/feet/model";
import EditIcon from "@mui/icons-material/Edit";
import { formValues, onSubmit } from "../../form";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from "@mui/material";
import { Formik } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import { updateMyFeet, deleteMyFeet } from "../../../../services/feet/service";
import "./style.scss";
import DeleteIcon from "@mui/icons-material/Delete";

const ProfileItem: FC<FeetProps> = ({
	id,
	description,
	image,
	likes,
	title,
	date,
	user,
}) => {
	const initialValues: formValues = {
		image: image ? image : "",
		description: description ? description : "",
		title: title ? title : "",
	};
	console.log(initialValues);

	const [open, setOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleDeleteClickOpen = () => {
		setDeleteOpen(true);
	};

	const handleDeleteClose = () => {
		setDeleteOpen(false);
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
			updateMyFeet(id, completeFeet);
			handleClose();
		}
	};

	const deleteFeet = () => {
		deleteMyFeet(id);
	};

	return (
		<>
			<Card sx={{ width: "100%", marginBottom: "5%" }}>
				<CardMedia
					component="img"
					height="auto"
					image={image}
					alt="Paella dish"
				/>
				<CardContent>
					<Typography variant="body1" color="text.primary">
						{title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{description}
					</Typography>
				</CardContent>
				<CardActions disableSpacing>
					<IconButton aria-label="add to favorites">
						<FavoriteIcon />
					</IconButton>
					<Typography variant="body2" color="text.secondary">
						{likes}
					</Typography>
					<IconButton
						aria-label="edit icon"
						onClick={handleClickOpen}
					>
						<EditIcon />
					</IconButton>
					<IconButton
						aria-label="delete icon"
						onClick={handleDeleteClickOpen}
					>
						<DeleteIcon />
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
			<Dialog onClose={handleDeleteClose} open={deleteOpen}>
				<DialogTitle>Delete this feet?</DialogTitle>
				<DialogContent>
					<Typography>
						You are going to delete this feet permanently
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDeleteClose}>Cancel</Button>
					<Button type="submit" color="error" onClick={deleteFeet}>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ProfileItem;
