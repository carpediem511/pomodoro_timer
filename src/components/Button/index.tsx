type Props = { name: string }

const Button = ({ name }: Props) => {

	return (

		<>
			<button type="submit" className="px-4 py-2 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg">
				{name}
			</button>
		</>
	)
}

export default Button