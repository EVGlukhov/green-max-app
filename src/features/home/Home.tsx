import { Container } from "@maxhub/max-ui";
import { Connect } from "@/features/auth";

import styles from './styles.module.css';

export function Home() {
  return (
      <Container className={styles.container}>
				<Connect />
      </Container>
  );
}
