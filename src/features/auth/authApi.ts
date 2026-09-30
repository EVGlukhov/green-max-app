export interface Credentials {
	idInstance: string;
	apiTokenInstance: string;
	apiUrl: string;
}

export const connect = (credentials: Credentials) =>
  fetch(`${credentials.apiUrl}/waInstance${credentials.idInstance}/getStateInstance/${credentials.apiTokenInstance}`, {
    method: "GET",
  }).then((response) => response.json());
