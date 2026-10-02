export const getInitials = (name: string) => name
		? ((name.match(/(^\S\S?|\s\S)?/g) ?? []).map(v => v.trim()).join("").match(/(^\S|\S$)?/g) ?? []).join("").toLocaleUpperCase()
		: 'N/A'
export function formatMessageTime(timestamp: number): string {
	if (!Number.isFinite(timestamp) || timestamp <= 0) return "";
	return new Intl.DateTimeFormat("ru-RU", {
		hour: "2-digit",
		minute: "2-digit",
	}).format(new Date(timestamp * 1000));
}
