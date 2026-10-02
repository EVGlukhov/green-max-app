import { isRequired, useForm, type Validation } from "@/shared/form"
import { Button, Input } from "@maxhub/max-ui"
import { useTransition } from "react"
import type { Contact } from "@/api"

import styles from './styles.module.css'

type Props = {
	onAdd(contact: Contact): void
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

	const { values, changeHandler, submitHandler, isValid } = useForm<Contact>(initialState, validations, () => {
		startTransition(async () => {
			await onAdd(values)
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
			<Button size="medium" type="submit" disabled={!isValid}>
				Добавить
			</Button>
		</form>
	)
}
