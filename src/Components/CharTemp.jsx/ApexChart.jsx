import React, { useContext } from 'react';
import ReactApexChart from 'react-apexcharts';
import { WeatherContext } from '../Context/WeatherContext';

const ApexChart = ({ id, preciptation }) => {
	const now = new Date();
	const hours = now.getHours() + 1;
	const { weather } = useContext(WeatherContext);
	const forecast = weather.forecast.forecastday[id].hour;
	let newHour = 0;

	const formartHours = (hour) => {
		console.log(weather);
		const normalizedHour = hour % 24;
		const suffix = normalizedHour >= 12 ? 'pm' : 'am';
		let displayHour = normalizedHour % 12;
		if (displayHour === 0) displayHour = 12;
		return `${displayHour} ${suffix}`;
	};

	const checkHoursForecast = (hour) => {
		if (hour > 23) {
			newHour = hour - 23;
			return newHour;
		}
		newHour = hours;

		// console.log(newHour);
		return newHour;
	};

	const temp = [
		{
			name: 'Temperature',
			data: [
				Math.floor(forecast[checkHoursForecast(hours)].temp_c),
				Math.floor(
					forecast[checkHoursForecast(hours + 3)].temp_c,
				),
				Math.floor(
					forecast[checkHoursForecast(hours + 6)].temp_c,
				),
				Math.floor(
					forecast[checkHoursForecast(hours + 9)].temp_c,
				),
				Math.floor(
					forecast[checkHoursForecast(hours + 12)].temp_c,
				),
				Math.floor(
					forecast[checkHoursForecast(hours + 15)].temp_c,
				),
				Math.floor(
					forecast[checkHoursForecast(hours + 18)].temp_c,
				),
				Math.floor(
					forecast[checkHoursForecast(hours + 21)].temp_c,
				),
			],
		},
	];

	const precip = [
		{
			name: 'Preciptation',
			data: [
				Math.floor(
					forecast[checkHoursForecast(hours)].chance_of_rain,
				),
				Math.floor(
					forecast[checkHoursForecast(hours + 3)].chance_of_rain,
				),
				Math.floor(
					forecast[checkHoursForecast(hours + 6)].chance_of_rain,
				),
				Math.floor(
					forecast[checkHoursForecast(hours + 9)].chance_of_rain,
				),
				Math.floor(
					forecast[checkHoursForecast(hours + 12)]
						.chance_of_rain,
				),
				Math.floor(
					forecast[checkHoursForecast(hours + 15)]
						.chance_of_rain,
				),
				Math.floor(
					forecast[checkHoursForecast(hours + 18)]
						.chance_of_rain,
				),
				Math.floor(
					forecast[checkHoursForecast(hours + 21)]
						.chance_of_rain,
				),
			],
		},
	];

	const options = {
		chart: {
			type: 'line',
			width: '100%',
			color: preciptation ? '#8AB4F8' : '#F8A43B',
			dropShadow: {
				enabled: true,
				color: preciptation ? '#8AB4F8' : '#F8A43B',
				top: 18,
				left: 7,
				blur: 10,
				opacity: 0.5,
			},
			zoom: {
				enabled: false,
			},
			toolbar: {
				show: false,
			},
		},
		tooltip: {
			enabled: false,
		},

		dataLabels: {
			offsetY: -10,
			style: {
				colors: preciptation
					? ['#8AB4F8', '#8AB4F8']
					: ['#000', '#000'],
			},
			background: {
				enabled: false,
			},
			enabled: true, // ✅ desativa os números nos pontos
			formatter: (value) => (preciptation ? `${value}%` : value),
		},
		stroke: {
			colors: preciptation
				? ['#8AB4F8', '#8AB4F8']
				: ['#F8A43B', '#F8A43B'],
			curve: 'straight',
		},
		title: {
			text: 'Temperature and Preciptation',
			align: 'center',
			style: {
				color: preciptation ? '#fff' : '#042747',
			},
		},
		markers: {
			size: 1,
			hover: {
				size: 0,
			},
		},
		xaxis: {
			offsetY: 0,
			categories: [
				formartHours(hours),
				formartHours(hours + 3),
				formartHours(hours + 6),
				formartHours(hours + 9),
				formartHours(hours + 12),
				formartHours(hours + 15),
				formartHours(hours + 18),
				formartHours(hours + 21),
			],
			title: {
				enabled: false,
				text: '',
			},
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false,
			},
			labels: {
				show: true,

				style: {
					colors: preciptation ? '#fff' : '#555',
				},
			},
			crosshairs: {
				show: false, // ✅ remove linha pontilhada ao passar o mouse
			},
		},
		yaxis: {
			min: 0,
			max: 100,
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false,
			},
			labels: {
				show: false,
			},
		},
		grid: {
			show: false,
			xaxis: {
				lines: {
					show: false,
				},
			},
			yaxis: {
				lines: {
					show: false,
				},
			},
			row: {
				colors: undefined,
				opacity: 0,
			},
		},
		legend: {
			position: 'top',
			horizontalAlign: 'right',
			floating: true,
			offsetY: -25,
			offsetX: -5,
		},
	};

	return (
		<div id='chart'>
			<ReactApexChart
				options={options}
				series={preciptation ? precip : temp}
				type='line'
				height={180}
			/>
		</div>
	);
};

export default ApexChart;
