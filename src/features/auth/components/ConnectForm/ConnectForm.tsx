import { Button, CellHeader, CellInput, CellList } from "@maxhub/max-ui";
import { useForm, isNumeric, isRequired, isURL, type Validation } from '@/shared/form';
import type { Credentials } from '@/features/auth/authApi';
import { useTransition } from "react";

import styles from './style.module.css';

interface Props {
	onConnect(credencials: Credentials): Promise<void>;
}

export function ConnectForm({ onConnect }: Props) {
	const initialState: Credentials = {
		idInstance: '410022748242',
		apiTokenInstance: 'd0e5f705e46746719b3e86787af94ab6707b2d11c80a47b1bb',
		apiUrl: 'https://4100.api.green-api.com'
	};
	const validations: Validation<Credentials>[] = [
		({ idInstance }) => isNumeric(idInstance) || { idInstance: 'Укажите числовой idInstance' },
		({ apiTokenInstance }) => isRequired(apiTokenInstance) || { apiTokenInstance: 'Укажите токен доступа' },
		({ apiUrl }) => isURL(apiUrl) || { apiUrl: 'Введите корректный apiUrl' }
	]

	const [isPending, startTransition] = useTransition();


	const { values, changeHandler, submitHandler, isValid } = useForm<Credentials>(initialState, validations, () => {
		startTransition(async () => {
			debugger;
			await onConnect(values)
		})
	});

	return (
		<form onSubmit={submitHandler} className={styles.form}>
			<CellList mode="island"
				header={
					<CellHeader titleStyle="normal">Настройки</CellHeader>
				}
			>
				<CellInput
					before="ID"
					name="idInstance"
					defaultValue={values.idInstance}
					autoComplete="off"
					placeholder="Ваш idInstance"
					onChange={changeHandler}
				/>
				<CellInput
					defaultValue={values.apiTokenInstance}
					type="password"
					name="apiTokenInstance"
					autoComplete="off"
					before="Токен"
					placeholder="Ваш apiTokenInstance"
					onChange={changeHandler}
				/>
				<CellInput
					defaultValue={values.apiUrl}
					type="url"
					name="apiUrl"
					autoComplete="url"
					before="Адрес API"
					placeholder="Ваш apiUrl"
					onChange={changeHandler}
				/>
			</CellList>
			<Button
				type="submit"
				stretched
				loading={isPending}
				disabled={!isValid}
			>
				Подключиться
			</Button>
		</form>
	)
}
