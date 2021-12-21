import * as yup from "yup";
import { User } from "../../models/user/model";

export interface formValues {
	email: string;
	password: string;
	username: string;
}

export const initialValues: formValues = {
	email: "",
	password: "",
	username: "",
};

export const validationSchema: yup.SchemaOf<formValues> = yup.object().shape({
	username: yup.string().required(),
	email: yup.string().email().required(),
	password: yup.string().required(),
});

export const onSubmit = (
	values: formValues,
	signupUser: (user: Partial<User>) => void
) => {
	signupUser(values);
};
