import { RouterProvider } from "react-router"
import { router } from "./routes"
import { GreenProvider } from "@/api"

function App() {
  return (
		<GreenProvider>
			<RouterProvider router={router} />
		</GreenProvider>
  )
}

export default App
