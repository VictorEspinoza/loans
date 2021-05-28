import axios from 'axios';

export const baseURL = `https://js-developer-second-round.herokuapp.com/api/v1/application`;

const http = axios.create({
	baseURL,
	headers: {
		'Content-type': 'application/json',
	},
});

export default http;
