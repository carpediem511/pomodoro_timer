import './styles.css';

import Button from '../Button';

const App = () => {
	return (
		<>

			<div></div>
			<div className="flex gap-36">
				<Button name="Начинаем!" />
				<Button name="Стоп" />
				<Button name="Сброс таймера" />
			</div >
		</>
	);
}

export default App;

