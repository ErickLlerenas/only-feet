import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FC } from "react";
import { FeetProps } from "../../../../models/feet/model";

import { updateMyFeet, deleteMyFeet } from "../../../../services/feet/service";

const ProfileItemLocked: FC<FeetProps> = ({
	id,
	description,
	image,
	likes,
	title,
}) => {
	return (
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
			</CardActions>
		</Card>
	);
};

export default ProfileItemLocked;
