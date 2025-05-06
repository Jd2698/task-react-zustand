import Form from '../components/Form'
import { ProductsList } from '../components/ProductsList'

function Home() {
	return (
		<>
			<main className="max-w-7xl m-auto my-10 pt-10 px-20 grid auto-rows-auto grid-cols-1 lg:grid-cols-3 gap-4">
				<Form />
				<ProductsList />
			</main>
		</>
	)
}

export default Home
