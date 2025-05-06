import { IProduct } from '../store/useProductStore'

export const filterAndSortProducts = (
	products: IProduct[],
	filters?: { description?: string }
): IProduct[] => {
	let result = products

	if (filters?.description) {
		const desc = filters.description.toLowerCase()
		result = result.filter(p => p.description.toLowerCase().includes(desc))
	}

	return result.sort((a, b) => a.description.localeCompare(b.description))
}
