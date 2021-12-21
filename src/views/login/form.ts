import * as yup from "yup";
import { User } from "../../models/user/model";

export interface formValues {
	username: string;
	password: string;
}

export const initialValues: formValues = {
	username: "",
	password: "",
};

export const validationSchema: yup.SchemaOf<formValues> = yup.object().shape({
	username: yup.string().required(),
	password: yup.string().required(),
});

export const onSubmit = (
	values: formValues,
	loginUser: (user: Partial<User>) => void
) => {
	loginUser(values);
};
