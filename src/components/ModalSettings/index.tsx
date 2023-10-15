import Settings from "../Settings";
import { useState } from "react";

type ModalSettingsProps = {
	setIsModalSettingsOpen: (isOpen: boolean) => void;
};

const ModalSettings = ({ setIsModalSettingsOpen }: ModalSettingsProps) => {
	const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(true);

	const handleModalToggle = () => {
		setIsModalSettingsOpen(false);
	};

	return (
		<>
			{isSettingsOpen && (
				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div
						className="fixed inset-0 w-full h-full bg-black opacity-40"
						onClick={handleModalToggle}
					></div>
					<div className="flex items-center min-h-screen px-4 py-8">
						<div className="relative w-full max-w-lg mx-auto bg-white rounded-md shadow-lg">
							<div className="flex items-center justify-between p-4 border-b">
								<p className="text-teal-600 font-bold text-lg">Настройки:</p>
								<button
									className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
									onClick={handleModalToggle}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-5 h-5 mx-auto"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
											clipRule="evenodd"
										/>
									</svg>
								</button>
							</div>
							<div className="space-y-2 p-4 mt-3 text-[15.5px] leading-relaxed text-gray-500">
								<Settings />
							</div>
							<div className="flex items-center gap-3 p-4 mt-5 border-t">
								<button
									className="border p-1 w-1/2 mx-auto mt-8 rounded-md text-white font-semibold active:shadow-lg flex justify-center bg-teal-600 hover:bg-teal-400 duration-200 hover:text-black"
									onClick={handleModalToggle}
								>
									Применить
								</button>
								<button
									className="border p-1 w-1/2 mx-auto mt-8 rounded-md text-white font-semibold active:shadow-lg flex justify-center bg-red-600 hover:bg-red-400 duration-200 hover:text-black"
									onClick={handleModalToggle}
								>
									Закрыть
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ModalSettings;
