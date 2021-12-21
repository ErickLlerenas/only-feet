export const authorizationFetch = async (
	input: RequestInfo,
	init: RequestInit
): Promise<Response> =>
	fetch(input, {
		...init,
		headers: {
			...init?.headers,
			Authorization: `Bearer ${localStorage.getItem("user_token")}`,
		},
	});
