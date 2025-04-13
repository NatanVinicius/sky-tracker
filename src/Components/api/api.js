import axios from 'axios';
import React from 'react';

export const getCityByIp = async () => {
	try {
		const ipResponse = await axios.get('http://ip-api.com/json');
		const ipData = ipResponse.data;
		return {
			city: ipData.city,
			code: ipData.countryCode,
			flag: `https://flagsapi.com/${ipData.countryCode}/shiny/64.png`,
		};
	} catch (error) {
		throw new Error(error);
	}
};

export const weatherData = async (city) => {
	const apiKey = '5fe5be4326834629a5f72644242509';
	const URL_API = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no&alerts=no`;

	try {
		const data = await axios.get(URL_API);
		const response = data.data;
		return response;
	} catch (error) {
		throw new Error(error);
	}
};
