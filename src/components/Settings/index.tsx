import { Slider } from "@mui/material";

type SettingsProps = {

	workTime: number,
	restTime: number,
	setWorkTime: (workTime: number) => void,
	setRestTime: (restTime: number) => void
};

const Settings = ({ workTime, setWorkTime, restTime, setRestTime }: SettingsProps) => {
	const workSliderStyle = {
		color: "red",
	};

	const restSliderstyle = {
		color: "green",
	};

	return (
		<>
			<div className="flex w-full flex-col p-5">
				<label className="mt-10 text-teal-600 text-base font-semibold">
					Время для работы:
				</label>
				<Slider
					max={120}
					min={1}
					step={5}
					valueLabelDisplay="on"
					className="mt-10"
					style={workSliderStyle}
					value={workTime}
					onChange={(event) => {
						const target = event.target as HTMLInputElement
						setWorkTime(parseInt(target.value))
					}}
				/>
				<label className="mt-5 text-teal-600 text-base font-semibold">
					Время для отдыха:
				</label>
				<Slider
					max={60}
					min={1}
					step={5}
					valueLabelDisplay="on"
					className="mt-10"
					value={restTime}
					style={restSliderstyle}
					onChange={(event) => {
						const target = event.target as HTMLInputElement
						setRestTime(parseInt(target.value))
					}}
				/>
			</div>
		</>
	);
};

export default Settings;
