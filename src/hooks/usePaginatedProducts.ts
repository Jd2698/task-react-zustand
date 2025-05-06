import { useEffect, useState } from 'react'
import { IProduct, useProductStore } from '../store/useProductStore'

export const usePaginatedProducts = () => {
	const { getProducts, products } = useProductStore()
	const [data, setData] = useState<IProduct[]>([])
	const [searchByDescription, setSearchByDescription] = useState('')
	const [offset, setOffset] = useState(0)
	const [limit, setLimit] = useState(2)
	const [total, setTotal] = useState(0)

	useEffect(() => {
		setOffset(0)
	}, [searchByDescription])

	useEffect(() => {
		const { data, totalRecords } = getProducts(offset, limit, {
			description: searchByDescription
		})
		setData(data)
		setTotal(totalRecords)
	}, [offset, limit, searchByDescription, getProducts, products])

	const nextPage = () => {
		if (offset + limit < total) setOffset(o => o + limit)
	}

	const prevPage = () => {
		if (offset > 0) setOffset(o => o - limit)
	}

	const changeLimit = (newLimit: number) => {
		setOffset(0)
		setLimit(newLimit)
	}

	const getCurrentPage = () => Math.floor(offset / limit) + 1

	return {
		data,
		total,
		offset,
		limit,
		searchByDescription,
		setSearchByDescription,
		nextPage,
		prevPage,
		changeLimit,
		getCurrentPage
	}
}
