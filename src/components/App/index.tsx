import Timer from '../Timer';
import './styles.css';
import { useState } from 'react'
import Settings from '../Settings';


const App = () => {

	const [showSettings, setShowSettings] = useState<boolean>(true)
	return (
		<>
			<p className='text-center mt-20 text-3xl text-red-500'>Управляй своим временем с помощью "Pomodoro"!</p>
			<div className='w-1/5 mx-auto p-4 mt-28'>

				{showSettings ? <Settings /> : <Timer />}
			</div>
		</>
	);
}

export default App;

