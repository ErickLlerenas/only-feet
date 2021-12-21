import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Profile from "../../components/profile/component";
import { FeetProps } from "../../models/feet/model";
import {
	fetchFeet,
	fetchSelectedPublicFeet,
} from "../../services/feet/service";
import ProfileItemLocked from "./components/profile-item-locked/component";

const UserProfile: FC = () => {
	const [publicFeet, setPublicFeet] = useState<Partial<FeetProps>>({});
	const [feet, setFeet] = useState<FeetProps[]>([]);
	let { id } = useParams();

	useEffect(() => {
		const getPublicFeet = async () => {
			if (id != undefined) {
				const recivedPublicFeet = await fetchSelectedPublicFeet(id);
				console.log(recivedPublicFeet);
				setPublicFeet(recivedPublicFeet);
				const recivedFeet = await fetchFeet(recivedPublicFeet.id);
				console.log(recivedFeet);
				setFeet(recivedFeet);
			}
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
				<ProfileItemLocked
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
		</section>
	);
};

export default UserProfile;
