export interface FeetProps {
	id: number;
	image: string;
	title: string;
	description: string;
	likes: number;
	date: string;
	user: User;
}

interface User {
	username: String;
}
