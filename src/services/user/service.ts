import { User } from "../../models/user/model";

export const signup = async (user: Partial<User>) => {
	const response = await fetch(
		"http://104.237.129.63:8007/api/users/register",
		{
			headers: {
				"content-type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(user),
		}
	);

	if (user.email && user.password && response.status === 200) {
		return true;
	} else {
		return false;
	}
};

export const login = async (basicUser: Partial<User>) => {
	try {
		const response = await fetch("http://104.237.129.63:8007/api/token/", {
			headers: {
				"content-type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(basicUser),
		});

		if (
			basicUser.username &&
			basicUser.password &&
			response.status === 200
		) {
			const tokens: { access: string; refresh: string } =
				await response.json();

			const logUser: Partial<User> = {
				username: basicUser.username,
				password: basicUser.password,
				token: tokens.access,
			};

			return logUser;
		} else {
			return null;
		}
	} catch {
		return null;
	}
};
