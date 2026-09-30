import { Link } from 'react-router';
import styles from './styles.module.css';
import { Button, Container, Flex, Panel, Typography } from '@maxhub/max-ui';

export default function NoMatch() {
	return (
		<Panel centeredY centeredX
			className={styles.main}
		>
			<Flex direction="column" gapY={16} align="center">
				<Typography.Display>404</Typography.Display>
				<Typography.Headline>Страница не найдена</Typography.Headline>
				<Typography.Label>Извините, мы не смогли найти страницу, которую вы ищете.</Typography.Label>
				<Button size="small" variant="overlay" asChild>
					<Link to="/">Вернуться на главную</Link>
				</Button>
			</Flex>
		</Panel>
	);
}
