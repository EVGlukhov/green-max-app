import { Flex, IconButton, Input, Typography } from '@maxhub/max-ui';

import styles from './styles.module.css';

type Props = {
	onSearch(term: string): void
}

export function ChatListHeader({ onSearch }: Props) {
	return (
		<header className={styles.sidebarHeader}>
			<Flex justify="space-between">
				<Typography.Headline>Чаты</Typography.Headline>
				<IconButton variant="primary" size="small">+</IconButton>
			</Flex>
			<Input type="search"
				onChange={(event) => onSearch(event.target.value)}
				placeholder="Поиск">
			</Input>
		</header>
	)
}
