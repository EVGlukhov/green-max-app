import { isRequired, useForm, type Validation } from "@/shared/form"
import { Button, Input } from "@maxhub/max-ui"
import { useState, useTransition } from "react"
import type { Contact } from "@/api"

import styles from './styles.module.css'

type Props = {
	onAdd: (contact: Contact) => Promise<void>
}
export function ChatSearchContact({ onAdd }: Props) {
	const initialState = {
		chatId: '',
		firstName: '',
		lastName: ''
	}
	const validations: Validation<Contact>[] = [
		({ chatId }) => isRequired(chatId) || { chatId: 'Укажите номер телефона' },
	]
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);

	const { changeHandler, submitHandler, isValid } = useForm<Contact>(initialState, validations, (values) => {
		setError(null);
		startTransition(async () => {
			try {
				await onAdd(values);
			} catch (requestError) {
				setError(requestError instanceof Error ? requestError.message : "Не удалось добавить контакт.");
			}
		})
	});

	return (
		<form onSubmit={submitHandler}>
			<Input type="text"
				name="firstName"
				placeholder="Имя"
				onChange={changeHandler}
				className={styles.input}
			/>
			<Input type="text"
				name="lastName"
				placeholder="Фамилия"
				onChange={changeHandler}
				className={styles.input}
			/>
			<Input type="tel"
				name="chatId"
				placeholder="Введите номер телефона"
				onChange={changeHandler}
				className={styles.input}
			/>
			{error && <p role="alert">{error}</p>}
			<Button size="medium" type="submit" disabled={!isValid || isPending} loading={isPending}>
				Добавить
			</Button>
		</form>
	)
}
