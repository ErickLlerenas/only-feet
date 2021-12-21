import * as yup from "yup";
import { FeetProps } from "../../models/feet/model";

export interface formValues {
	image: string;
	description: string;
	title: string;
}

export const validationSchema: yup.SchemaOf<formValues> = yup.object().shape({
	image: yup.string().required(),
	description: yup.string().required(),
	title: yup.string().required(),
});

export const onSubmit = (
	values: formValues,
	editFeet: (feet: Partial<FeetProps>) => void
) => {
	editFeet(values);
};
