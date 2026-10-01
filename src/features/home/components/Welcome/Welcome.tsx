import { Flex, Typography } from '@maxhub/max-ui';
import styles from './styles.module.css';

export function Welcome() {
	return (
		<section className={styles.welcome}>
			<Typography.Headline className={styles.display}>
				Ваш бизнес
				<br />
				<span className={styles.displayAccent}>всегда на связи</span>
			</Typography.Headline>
			<br />
			<Typography.Body>
				Подключите аккаунт WhatsApp через Green-API и управляйте
				перепиской в удобном и понятном интерфейсе.
			</Typography.Body>

			<Flex className={styles.features} gapX={20} gapY={14}>
				<div className={styles.feature}>
					<span className={styles.featureIcon}>↗</span>
					<span>Быстрый старт</span>
				</div>
				<div className={styles.feature}>
					<span className={styles.featureIcon}>⌘</span>
					<span>Всё в одном месте</span>
				</div>
			</Flex>
		</section>
	)
}
