import { ConnectForm } from "../ConnectForm/ConnectForm";
import { Flex, Panel, Typography } from "@maxhub/max-ui";
import { useAuth } from '@/features/auth';

import styles from './styles.module.css';
import { useEffect } from "react";
import { useNavigate } from "react-router";

export function Connect() {
	const { onConnect, stateInstance } = useAuth();
	const navigate = useNavigate();

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

				<ConnectForm onConnect={onConnect} />

				<Flex align="center" className={styles.help}>
					<span>i</span>
					<span>Данные можно найти в личном кабинете Green-API</span>
				</Flex>
			</Flex>
		</Panel>
	)
}
