import { FC, useEffect, useState } from "react";
import "./style.scss";
import HomeItem from "../../components/home-item/component";
import { FeetProps } from "../../models/feet/model";
import { fetchPublicFeet } from "../../services/feet/service";
import LoadingCard from "../../components/loading-item/component";

const Home: FC = () => {
	const [feet, setFeet] = useState<FeetProps[] | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const getPublicFeet = async () => {
			const recivedFeet = await fetchPublicFeet();
			console.log(recivedFeet);
			setFeet(recivedFeet);
			if (recivedFeet) setIsLoading(false);
		};
		getPublicFeet();
	}, []);
	return (
		<>
			{isLoading ? (
				<>
					<LoadingCard />
					<LoadingCard />
					<LoadingCard />
				</>
			) : (
				feet &&
				feet.map((foot) => (
					<HomeItem
						image={foot.image}
						likes={foot.likes}
						title={foot.title}
						description={foot.description}
						id={foot.id}
						date={foot.date}
						key={foot.id}
						user={foot.user}
					/>
				))
			)}
		</>
	);
};

export default Home;
