import { useState, type ChangeEventHandler, type SubmitEventHandler } from "react";

export type Validation<T> = (values: T) => boolean | { [key in keyof T]?: string };

export function validate<T>(validations: Validation<T>[], values: T) {
  const errors = validations
    .map(validation => validation(values))
    .filter(validation => typeof validation === 'object');

  return {
	isValid: errors.length === 0,
	errors: errors.reduce((errors, error) => ({...errors, ...error}), {})
  };
}

export function useForm<T>(
	initialState: T,
	validations: Validation<T>[] = [],
	onSubmit: (values: T) => void = () => {}
) {
  const {
	isValid: initialIsValid,
	errors: initialErrors
  } = validate(validations, initialState);

  const [ values, setValues ] = useState(initialState);
  const [ errors, setErrors ] = useState(initialErrors);
  const [ isValid, setValid ] = useState(initialIsValid);
  const [ touched, setTouched ] = useState({});

  const changeHandler: ChangeEventHandler<HTMLInputElement> =
  	({ target: { name, value } }) => {
		const newValues = { ...values, [name]: value };
		const {isValid, errors} = validate(validations, newValues);
		setValues(newValues);
		setValid(isValid);
		setErrors(errors);
		setTouched({ ...touched, [name]: true });
	};

  const submitHandler: SubmitEventHandler = event => {
    event.preventDefault();
    onSubmit(values);
  }

  return { values, changeHandler, isValid, errors, submitHandler, touched };
}

