import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import { persist } from 'zustand/middleware'
import { filterAndSortProducts } from '../utils/product.utils'

export interface ICreateProduct {
	description: string
	completed: boolean
}

export interface IProduct extends ICreateProduct {
	id: string
}

interface ProductsState {
	products: IProduct[]
	getProducts: (
		offset: number,
		limit: number,
		filters?: { description?: string }
	) => { data: IProduct[]; totalRecords: number }
	selectedProduct: IProduct | undefined
	addProduct: (product: ICreateProduct) => void
	updateProduct: (product: IProduct) => void
	setSelectedProduct: (id: string | undefined) => void
	removeProduct: (id: string) => void
	init: () => void
}

export const useProductStore = create<ProductsState>()(
	persist(
		(set, get) => ({
			products: [],
			selectedProduct: undefined,

			addProduct: ({ description, completed }) => {
				const data: IProduct = {
					id: uuidv4(),
					description,
					completed
				}

				set(state => ({ products: [...state.products, data] }))
			},

			getProducts: (
				offset: number,
				limit: number,
				filters?: {
					description?: string
				}
			) => {
				const all = get().products

				const filtered = filterAndSortProducts(all, filters)

				return {
					data: filtered.slice(offset, offset + limit),
					totalRecords: filtered.length
				}
			},

			setSelectedProduct: (id: string | undefined) => {
				const { products } = get()
				const selectedProduct = id ? products.find(p => p.id === id) : undefined

				set({ selectedProduct })
			},

			updateProduct: (product: IProduct) =>
				set(state => ({
					products: state.products.map(p =>
						product.id === p.id ? { ...p, ...product } : p
					)
				})),

			removeProduct: (id: string) =>
				set(state => ({
					products: state.products.filter(p => p.id != id)
				})),

			init: () => {
				const { products } = get()

				if (products.length === 0) {
					const defaultProduct: IProduct = {
						id: uuidv4(),
						description: 'Producto inicial',
						completed: false
					}

					set({ products: [defaultProduct] })
				}
			}
		}),
		{ name: 'products-storage' }
	)
)
