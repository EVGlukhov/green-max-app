import { Brand } from "@/shared/components/Brand/Brand";
import { Dot } from "@/shared/components/Dot/Dot";
import { Flex, Typography } from "@maxhub/max-ui";
import { Link } from "react-router";
import styles from './styles.module.css';

export function Header() {
	return (
		<Flex justify="space-between" className={styles.header}>
			<Link to="/"><Brand /></Link>
			<Flex gapX={10} align="center">
				<Dot />
				<Typography.Label>Подключение к Green-API</Typography.Label>
			</Flex>
		</Flex>
	)
}
