import { useEffect } from 'react'
import { ICreateProduct, useProductStore } from '../store/useProductStore'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

type FormData = {
	description: string
	status: 'completed' | 'pending'
}

const Form = () => {
	const {
		addProduct,
		selectedProduct,
		setSelectedProduct,
		updateProduct
	} = useProductStore(state => state)

	/** Definición del esquema de validación */
	const validationSchema = yup.object({
		description: yup
			.string()
			.required('Description is required')
			.min(3, 'Description must be at least 3 characters'),
		status: yup
			.string()
			.oneOf(['completed', 'pending'])
			.required('Status is required')
	})

	/** Configuración del formulario con React Hook Form */
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<FormData>({
		mode: 'all',
		resolver: yupResolver(validationSchema),
		defaultValues: { status: 'pending' }
	})

	/** Inicializar el formulario si hay un producto seleccionado */
	useEffect(() => {
		if (selectedProduct) {
			reset({
				description: selectedProduct.description,
				status: selectedProduct.completed ? 'completed' : 'pending'
			})
		}
	}, [selectedProduct, reset])

	const handleFormSubmit: SubmitHandler<FormData> = data => {
		const product: ICreateProduct = {
			description: data.description,
			completed: data.status === 'completed'
		}

		if (selectedProduct) {
			updateProduct({ ...selectedProduct, ...product })
		} else {
			addProduct(product)
		}

		clearForm()
	}

	const clearForm = () => {
		if (selectedProduct) setSelectedProduct(undefined)
		reset({ description: '', status: 'pending' })
	}

	return (
		<form
			onSubmit={handleSubmit(handleFormSubmit)}
			className="max-h-[400px] bg-[#1a1a1a] p-6 rounded-xl shadow-lg flex flex-col justify-evenly gap-6"
		>
			{/* Descripción */}
			<div className="space-y-6 flex flex-col">
				<label
					htmlFor="input-description"
					className="text-lg text-gray-200 font-medium"
				>
					Task Description *
				</label>
				<input
					id="input-description"
					type="text"
					{...register('description')}
					className="p-3 bg-zinc-800 rounded-lg text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent placeholder:text-zinc-400 transition"
					placeholder="Enter task description"
				/>
				{errors.description && (
					<span className="text-red-400">{errors.description.message}</span>
				)}
			</div>

			{/* Estado (completado o pendiente) */}
			<div className="space-y-4">
				<div className="flex items-center gap-3">
					<input
						type="radio"
						id="input-completed"
						value="completed"
						{...register('status')}
						className="bg-green-600 border-transparent focus:ring-2 focus:ring-green-500"
					/>
					<label htmlFor="input-completed" className="text-gray-300">
						Completed
					</label>
				</div>

				<div className="flex items-center gap-3">
					<input
						type="radio"
						id="input-pending"
						value="pending"
						{...register('status')}
						className="bg-red-600 border-transparent focus:ring-2 focus:ring-red-500"
					/>
					<label htmlFor="input-pending" className="text-gray-300">
						Pending
					</label>
				</div>
				{errors.status && (
					<span className="text-red-400">{errors.status.message}</span>
				)}
			</div>

			{/* Botones de acción */}
			<div className="flex gap-2">
				{selectedProduct && (
					<button
						onClick={clearForm}
						type="reset"
						className="w-2/4 bg-red-600/80 text-white py-2 px-4 rounded-lg hover:bg-red-600/50 transition duration-300 focus:outline-none focus:ring-4 focus:ring-red-600/50 cursor-pointer"
					>
						Cancel
					</button>
				)}

				<button
					type="submit"
					className={`${
						selectedProduct ? 'w-2/4' : 'w-full'
					} bg-green-600/80 text-white py-2 px-4 rounded-lg hover:bg-green-600/50 transition duration-300 focus:outline-none focus:ring-4 focus:ring-green-600/50 cursor-pointer`}
				>
					Register
				</button>
			</div>
		</form>
	)
}

export default Form
