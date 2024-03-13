"use client";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const axiosCustom: AxiosInstance = axios.create({
	// Configuration
	baseURL: import.meta.env.VITE_SERVER,
	timeout: 8000,
	headers: {
		"Content-Type": "application/json",
	},
    withCredentials: true,
} as AxiosRequestConfig);

axiosCustom.interceptors.request.use(async (config) => {
	return config;
});

export default axiosCustom;
