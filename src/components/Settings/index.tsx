import { Slider } from "@mui/material";

const Settings = () => {
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
					min={25}
					step={5}
					valueLabelDisplay="on"
					className="mt-10"
					style={workSliderStyle}
				/>
				<label className="mt-5 text-teal-600 text-base font-semibold">
					Время для отдыха:
				</label>
				<Slider
					max={60}
					min={0}
					step={5}
					valueLabelDisplay="on"
					className="mt-10"
					style={restSliderstyle}
				/>

			</div>
		</>
	);
};

export default Settings;
