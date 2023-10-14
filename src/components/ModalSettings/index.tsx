import Settings from "../Settings"
import { useState } from "react"

const ModalSettings = () => {

	const [isModalOpen, setIsModalOpen] = useState(false)

	const handleModalToggle = () => {
		setIsModalOpen(!isModalOpen);
	}

	return (

		<>
			<button onClick={handleModalToggle}>Настройки</button>
			{isModalOpen && (
				<div className="modal">
					<div className="modal-content">
						<button onClick={handleModalToggle}>Закрыть</button>
						<Settings />
					</div>
				</div>
			)}
		</>
	)
}

export default ModalSettings