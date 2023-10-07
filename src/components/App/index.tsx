//import React, { useState } from 'react';
//import Timer from '../Timer';
import Settings from '../Settings';
import Timer from '../Timer';
import './styles.css';


const App = () => {

	return (
		<>
			<p className="text-center mt-20 text-3xl text-red-500">
				Управляй своим временем с помощью "Pomodoro"!
			</p>
			<div className="w-1/5 mx-auto p-4 mt-28">

				<Timer />
			</div>
		</>
	);
};

export default App;