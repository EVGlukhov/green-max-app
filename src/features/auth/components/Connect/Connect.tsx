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
			<Flex direction="column" gapY={24}>
				<Typography.Headline>Подключение к Green-API</Typography.Headline>
				<ConnectForm onConnect={onConnect} />
			</Flex>
		</Panel>
	)
}
