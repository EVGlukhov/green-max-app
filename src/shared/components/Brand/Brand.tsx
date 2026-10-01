import { Typography } from '@maxhub/max-ui';
import styles from './styles.module.css';

export function Brand() {
	return (
		<div className={styles.brand} aria-label="MAX">
			<Typography.Title>M</Typography.Title>
		</div>
	)
}
