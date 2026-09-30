import { Button, CellHeader, CellInput, CellList } from "@maxhub/max-ui";
import { useForm, isNumeric, isRequired, isURL, type Validation } from '@/shared/form';
import type { Credentials } from '@/api';

import styles from './style.module.css';

interface Props {
	onConnect(credencials: Credentials): Promise<void>;
}

export function ConnectForm({ onConnect }: Props) {
	const initialState: Credentials = {
		idInstance: '',
		apiTokenInstance: '',
		apiUrl: ''
	};
	const validations: Validation<Credentials>[] = [
		({ idInstance }) => isNumeric(idInstance) || { idInstance: 'Укажите числовой idInstance' },
		({ apiTokenInstance }) => isRequired(apiTokenInstance) || { apiTokenInstance: 'Укажите токен доступа' },
		({ apiUrl }) => isURL(apiUrl) || { apiUrl: 'Введите корректный apiUrl' }
	]

	const { values, changeHandler, submitHandler } = useForm<Credentials>(initialState, validations, onConnect);

	return (
		<form onSubmit={submitHandler} className={styles.form}>
			<CellList mode="island"
				header={
					<CellHeader titleStyle="normal">Настройки</CellHeader>
				}
			>
				<CellInput
					before="ID"
					defaultValue={values.idInstance}
					autoComplete="off"
					placeholder="Ваш idInstance"
					onChange={changeHandler}
				/>
				<CellInput
					defaultValue={values.apiTokenInstance}
					type="password"
					autoComplete="off"
					before="Токен"
					placeholder="Ваш apiTokenInstance"
					onChange={changeHandler}
				/>
				<CellInput
					defaultValue={values.apiUrl}
					type="url"
					autoComplete="url"
					before="Адрес API"
					placeholder="Ваш apiUrl"
					onChange={changeHandler}
				/>
			</CellList>
			<Button
				type="submit"
				stretched
			>
				Подключиться
			</Button>
		</form>
	)
}
