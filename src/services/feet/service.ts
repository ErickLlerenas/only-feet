import { FeetProps } from "../../models/feet/model";
import { authorizationFetch } from "../../utils/requests/auth";

export const fetchPublicFeet = async () => {
	try {
		const response = await authorizationFetch(
			"http://104.237.129.63:8007/api/feet/public/",
			{
				method: "GET",
			}
		);

		if (response.status === 200) {
			const feet = await response.json();
			return feet;
		} else {
			return null;
		}
	} catch {
		return null;
	}
};

export const fetchMyPublicFeet = async () => {
	try {
		const response = await authorizationFetch(
			"http://104.237.129.63:8007/api/feet/public/",
			{
				method: "GET",
			}
		);

		if (response.status === 200) {
			const feet = await response.json();
			const username = localStorage.getItem("user_name");
			let userFeet: Partial<FeetProps> = {};
			feet.forEach((foot: any) => {
				if (foot.user.username == username) {
					userFeet = foot;
				}
			});
			return userFeet;
		} else {
			return {};
		}
	} catch {
		return {};
	}
};

export const fetchSelectedPublicFeet = async (id: String) => {
	try {
		const response = await authorizationFetch(
			`http://104.237.129.63:8007/api/feet/public/${id}`,
			{
				method: "GET",
			}
		);

		if (response.status === 200) {
			return await response.json();
		} else {
			return {};
		}
	} catch {
		return {};
	}
};

export const updateMyPublicFeet = async (
	id: number,
	feet: Partial<FeetProps>
) => {
	try {
		const response = await fetch(
			`http://104.237.129.63:8007/api/feet/public/${id}/`,
			{
				headers: {
					"content-type": "application/json",
					Authorization: `Bearer ${localStorage.getItem(
						"user_token"
					)}`,
				},
				method: "PUT",
				body: JSON.stringify(feet),
			}
		);
		// window.location.reload();

		return await response.json();
	} catch {
		return null;
	}
};

export const updateMyFeet = async (id: number, feet: Partial<FeetProps>) => {
	try {
		const response = await fetch(
			`http://104.237.129.63:8007/api/feet/private/${id}/`,
			{
				headers: {
					"content-type": "application/json",
					Authorization: `Bearer ${localStorage.getItem(
						"user_token"
					)}`,
				},
				method: "PUT",
				body: JSON.stringify(feet),
			}
		);
		window.location.reload();

		return await response.json();
	} catch {
		return null;
	}
};

export const deleteMyFeet = async (id: number) => {
	try {
		const response = await fetch(
			`http://104.237.129.63:8007/api/feet/private/${id}/`,
			{
				headers: {
					"content-type": "application/json",
					Authorization: `Bearer ${localStorage.getItem(
						"user_token"
					)}`,
				},
				method: "DELETE",
			}
		);
		window.location.reload();

		return await response.json();
	} catch {
		return null;
	}
};

export const fetchFeet = async (id: any) => {
	try {
		const response = await authorizationFetch(
			"http://104.237.129.63:8007/api/feet/private/",
			{
				method: "GET",
			}
		);

		if (response.status === 200) {
			const feet = await response.json();
			let userFeet: FeetProps[] = [];
			feet.forEach((foot: any) => {
				if (foot.user == id) {
					userFeet.push(foot);
				}
			});
			return userFeet;
		} else {
			return [];
		}
	} catch {
		return [];
	}
};

export const createMyFeet = async (feet: Partial<FeetProps>) => {
	try {
		const response = await fetch(
			`http://104.237.129.63:8007/api/feet/private/`,
			{
				headers: {
					"content-type": "application/json",
					Authorization: `Bearer ${localStorage.getItem(
						"user_token"
					)}`,
				},
				method: "POST",
				body: JSON.stringify(feet),
			}
		);
		window.location.reload();

		return await response.json();
	} catch {
		return null;
	}
};
