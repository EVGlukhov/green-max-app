import { Flex, IconButton, Input, Typography } from '@maxhub/max-ui';

import styles from './styles.module.css';

type Props = {
	onSearch: (term: string) => void
	onAdd: () => void
}

export function ChatListHeader({ onSearch, onAdd }: Props) {
	return (
		<header className={styles.chatListHeader}>
			<Flex justify="space-between" className={styles.chatListEyebrow}>
				<Typography.Headline>Чаты</Typography.Headline>
				<IconButton variant="primary" size="small" onClick={onAdd}>
					+
				</IconButton>
			</Flex>
			<Input type="search"
				size="medium"
				onChange={(event) => onSearch(event.target.value)}
				placeholder="Поиск">
			</Input>
		</header>
	)
}
