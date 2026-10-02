export const getInitials = (name: string) => name
		? ((name.match(/(^\S\S?|\s\S)?/g) ?? []).map(v => v.trim()).join("").match(/(^\S|\S$)?/g) ?? []).join("").toLocaleUpperCase()
		: 'N/A'
