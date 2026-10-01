import { useContext } from "react";
import { GreenContext } from "./GreenContext";

export const useGreen = () => {
	const context = useContext(GreenContext);
	if (!context) {
		throw new Error("useGreen must be used within an GreenProvider");
	}
	return context;
};
