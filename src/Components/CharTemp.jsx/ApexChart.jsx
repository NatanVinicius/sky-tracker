import React, { useContext } from 'react';
import ReactApexChart from 'react-apexcharts';
import { WeatherContext } from '../Context/WeatherContext';

const ApexChart = ({ id }) => {
	const now = new Date();
	const hours = now.getHours() + 1;
	const { weather } = useContext(WeatherContext);
	const forecast = weather.forecast.forecastday[id].hour;
	let newHour = 0;

	const formartHours = (hour) => {
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

	const series = [
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

	const options = {
		chart: {
			height: 0,
			type: 'line',
			width: '100%',
			color: 'F8A43B',
			dropShadow: {
				enabled: true,
				color: '#F8A43B',
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
			enabled: false, // ✅ tooltip desativado
		},
		dataLabels: {
			offsetY: -10,
			style: {
				colors: ['#042848'], // Define a cor do dataLabel aqui
			},
			background: {
				enabled: false,
			},
			enabled: true, // ✅ desativa os números nos pontos
		},
		stroke: {
			colors: ['#F8A43B', '#F8A43B'],
			curve: 'straight',
		},
		title: {
			text: 'Average High & Low Temperature',
			align: 'center',
		},
		markers: {
			size: 1,
			hover: {
				size: 0,
			},
		},
		xaxis: {
			offsetY: -25,
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
			},
			crosshairs: {
				show: false, // ✅ remove linha pontilhada ao passar o mouse
			},
		},
		yaxis: {
			min: 5,
			max: 40,
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
				series={series}
				type='line'
				height={250}
			/>
		</div>
	);
};

export default ApexChart;
