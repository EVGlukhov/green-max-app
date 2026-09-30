import { ConnectForm } from "../ConnectForm/ConnectForm";
import { Flex, Panel, Typography } from "@maxhub/max-ui";
import type { Credentials } from '@/api';

import styles from './styles.module.css';

export function Connect() {
	function handleConnect(credencials: Credentials) {
		return new Promise<void>((resolve) => {
			setTimeout(() => {
				console.log(credencials)
				resolve()
			}, 2000)
		});
	}

  return (
    <Panel mode="primary" className={styles.panel}>
		<Flex direction="column" gapY={24}>
			<Typography.Headline>Подключение к Green-API</Typography.Headline>
			<ConnectForm onConnect={handleConnect} />
		</Flex>
	</Panel>
  )
}
