import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/';

const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 3600,
	headers: {
		Authorization: localStorage.getItem('access_token')
			? 'JWT ' + localStorage.getItem('access_token')
			: null,
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
});

axiosInstance.interceptors.response.use(
	(response) => {
		console.log(0)
		return response;
	},
	async function (error) {
		const originalRequest = error.config;
		console.log(2)
		if (typeof error.response === 'undefined') {
			alert(
				'A server/network error occurred. ' +
					'Looks like CORS might be the problem. ' +
					'Sorry about this - we will get it fixed shortly.'
			);
			return Promise.reject(error);
		}

		if (
			error.response.status === 403 &&
			originalRequest.url === baseURL + 'token/refresh/'
		) {
			console.log(1)
			window.location.href = '/phone-book/';
			return Promise.reject(error);
		}

		if (
			error.response.data.code === 'token_not_valid' &&
			error.response.status === 403 &&
			error.response.statusText === 'Forbidden'
		) {
			const refreshToken = localStorage.getItem('refresh_token');

			if (refreshToken) {
				const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

				// exp date in token is expressed in seconds, while now() returns milliseconds:
				const now = Math.ceil(Date.now() / 1000);
				console.log(tokenParts.exp);

				if (tokenParts.exp > now) {
					return axiosInstance
						.post('token/refresh/', { refresh: refreshToken })
						.then((response) => {
							localStorage.setItem('access_token', response.data.access);

							axiosInstance.defaults.headers['Authorization'] =
								'JWT ' + response.data.access;
							originalRequest.headers['Authorization'] =
								'JWT ' + response.data.access;

							return axiosInstance(originalRequest);
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					console.log('Refresh token is expired', tokenParts.exp, now);
					window.location.href = '/login/';
				}
			} else {
				console.log('Refresh token not available.');
				window.location.href = '/login/';
			}
		}

		// specific error handling done elsewhere
		return Promise.reject(error);
	}
);

export default axiosInstance;


// export const BASE_URL = `http://localhost:3000/`
// const axiosInstance = axios.create({
//     withCredentials: true,
//     BASE_URL: BASE_URL,
//     timeout: 1000
// })
//
// axiosInstance.interceptors.request.use((config) => {
//     config.headers.Authorization = `JWT ${localStorage.getItem('access_token')}`
//     return config;
// })
//
// axiosInstance.interceptors.response.use((config) => {
//     return config;
// },async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status == 401 && error.config && !error.config._isRetry) {
//         originalRequest._isRetry = true;
//         try {
//             const response = await axios.get(`${BASE_URL}/token/refresh`, {withCredentials: true})
//             localStorage.setItem('access_token', response.data.access);
//             return axiosInstance.request(originalRequest);
//         } catch (e) {
//             console.log('НЕ АВТОРИЗОВАН')
//         }
//     }
//     throw error;
// })
//
// export default axiosInstance;