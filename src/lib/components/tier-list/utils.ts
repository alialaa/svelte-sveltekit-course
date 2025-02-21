import { v4 as uuid } from 'uuid';

export type TierImage = { image: string; id: string; tier?: string };

export type Tier = { id: string; label: string; color: string };

export const defaultTiers: Tier[] = [
	{
		id: uuid(),
		label: 'S',
		color: '#fe7f7e'
	},
	{
		id: uuid(),
		label: 'A',
		color: '#ffbf7e'
	},
	{
		id: uuid(),
		label: 'B',
		color: '#feff7f'
	},
	{
		id: uuid(),
		label: 'C',
		color: '#7fff7f'
	},
	{
		id: uuid(),
		label: 'D',
		color: '#7ffffe'
	},
	{
		id: uuid(),
		label: 'E',
		color: '#807fff'
	},
	{
		id: uuid(),
		label: 'F',
		color: '#ff7ffe'
	}
];

export function getBase64(file?: File) {
	return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
		if (!file) {
			resolve('');
			return;
		}
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
}
