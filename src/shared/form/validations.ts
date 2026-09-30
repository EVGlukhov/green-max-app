export function isURL(value: string): boolean {
  try {
    new URL(value.trim());
	return true;
  } catch {
    return false;
  }
}


export function isNumeric(value: string): boolean {
	return Boolean(value) && /^\d+$/.test(value.trim());
}
export function isRequired(value: string): boolean {
	return Boolean(value) && value.trim().length > 0;
}
