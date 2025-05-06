import { useEffect } from 'react'
import { useProductStore } from '../store/useProductStore'
import { usePaginatedProducts } from '../hooks/usePaginatedProducts'

export const ProductsList = () => {
	const {
		data,
		total,
		limit,
		searchByDescription,
		setSearchByDescription,
		nextPage,
		prevPage,
		changeLimit,
		getCurrentPage
	} = usePaginatedProducts()

	const { init, removeProduct, setSelectedProduct } = useProductStore()

	useEffect(() => {
		init()
	}, [init])

	return (
		<>
			<div className="lg:col-span-2 overflow-x-auto">
				<div className="text-end space-x-1 mb-2">
					<input
						type="text"
						className="bg-[#1a1a1a] px-2 py-1 rounded focus:outline-none"
						placeholder="Search by description"
						value={searchByDescription}
						onChange={e => setSearchByDescription(e.target.value)}
					/>

					<select
						value={limit}
						onChange={e => changeLimit(Number(e.target.value))}
						className="bg-[#1a1a1a] px-2 py-1 rounded"
					>
						<option value="2">2</option>
						<option value="5">5</option>
						<option value="10">10</option>
					</select>
				</div>

				<table className="w-full text-left table-auto rounded-lg shadow-lg bg-[#1a1a1a]">
					<thead>
						<tr className="text-white bg-[#212121] border-b border-gray-700">
							<th className="px-6 py-4 text-sm font-semibold text-gray-400">
								Description
							</th>
							<th className="px-6 py-4 text-sm font-semibold text-gray-400">
								Status
							</th>
							<th className="px-6 py-4 text-sm text-center font-semibold text-gray-400">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{data.map(p => (
							<tr key={p.id} className="text-gray-300 hover:bg-[#242424]">
								<td className="px-6 py-4 border-b border-gray-700">
									{p.description}
								</td>
								<td className="px-6 py-4 border-b border-gray-700">
									<span
										className={`font-semibold ${
											p.completed ? 'text-green-400' : 'text-red-400'
										}`}
									>
										{p.completed ? 'Completed' : 'Pending'}
									</span>
								</td>
								<td className="flex flex-wrap gap-2 justify-center px-6 py-4 border-b border-gray-700">
									<button
										onClick={() => setSelectedProduct(p.id)}
										className="bg-green-600/80 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600/50 transition duration-300"
									>
										Edit
									</button>
									<button
										onClick={() => removeProduct(p.id)}
										className="bg-red-600/80 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600/50 transition duration-300"
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div className="flex justify-evenly py-2">
					<button onClick={() => prevPage()}>previous</button>
					<span>
						{getCurrentPage()} / {Math.ceil(total / limit)}
					</span>
					<button onClick={() => nextPage()}>next</button>
				</div>
			</div>
		</>
	)
}
