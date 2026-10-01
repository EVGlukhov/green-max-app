import { Container, Grid } from "@maxhub/max-ui";
import { Connect } from "@/features/auth";
import { Header } from "./components/Header/Header";
import { Welcome } from "./components/Welcome/Welcome";

import styles from "./styles.module.css";

export function Home() {
	return (
		<Container className={styles.container}>
			<Header />
			<Grid align="center" gap={40} cols={2} className={styles.grid}>
				<Welcome />
				<Connect />
			</Grid>
		</Container>
	);
}
