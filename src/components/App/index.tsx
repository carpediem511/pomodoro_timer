import Timer from "../Timer";
import "./styles.css";

const App = () => {
	return (
		<div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: "url('/background(1).jpg')" }}>
			<div className="text-center mt-20 text-3xl font-extrabold text-red-500 relative">
				Управляй временем с помощью "Pomodoro"!
			</div>
			<div className="w-1/5 mx-auto p-4 mt-16">
				<Timer />
			</div>
		</div>
	);
};


export default App;
