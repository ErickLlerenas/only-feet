import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FC } from "react";
import { FeetProps } from "../../models/feet/model";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomeItem: FC<FeetProps> = ({
	id,
	description,
	image,
	likes,
	title,
	date,
	user,
}) => {
	const navigate = useNavigate();

	return (
		<Card sx={{ width: "100%", marginBottom: "5%" }}>
			<CardActionArea onClick={() => navigate(`/feet/${id}`)}>
				<CardHeader
					avatar={
						<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
							{user.username.charAt(0).toUpperCase()}
						</Avatar>
					}
					title={user.username}
					subheader={new Date(parseInt(date)).toString()}
				/>
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
			</CardActionArea>
		</Card>
	);
};

export default HomeItem;
