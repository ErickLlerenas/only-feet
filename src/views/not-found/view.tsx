import "./style.scss";
import images from "../../assets";
import { FC } from "react";

const NotFound: FC = () => {
	const { NotFound } = images;

	return (
		<section className="not-found-container">
			<img src={NotFound} alt="NotFound" />
			<p>Feet Not Found</p>
		</section>
	);
};
export default NotFound;
