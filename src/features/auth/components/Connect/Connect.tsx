import { Flex, Panel, Typography } from "@maxhub/max-ui";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useGreen, type Credentials } from '@/api';
import { ConnectForm } from "../ConnectForm/ConnectForm";

import styles from './styles.module.css';

export function Connect() {
	const { getStateInstance, stateInstance } = useGreen();
	const navigate = useNavigate();

	const handleConnect = async (credencials: Credentials) => {
		await getStateInstance(credencials);
	}

	useEffect(() => {
		if (!stateInstance) return
		navigate('/chat');
	}, [stateInstance, navigate])

	return (
		<Panel mode="primary" className={styles.panel}>
			<Flex direction="column" gapY={20}>
				<Flex direction="column" gap={8}>
					<span className={styles.heading}>НАЧНЁМ РАБОТУ</span>
					<Typography.Headline>Подключите аккаунт</Typography.Headline>
					<Typography.Label>Введите данные Green-API, чтобы открыть ваши чаты</Typography.Label>
				</Flex>

				<ConnectForm onConnect={handleConnect} />

				<Flex align="center" className={styles.help}>
					<span>i</span>
					<span>Данные можно найти в личном кабинете Green-API</span>
				</Flex>
			</Flex>
		</Panel>
	)
}
