import axios from "axios"
import { GetApi } from "../utils/GetApi"
import type { LogProps } from "../types/Log"

export const GetLogs = async (): Promise<LogProps[]> => {
	try {
		const token = localStorage.getItem("token")
		const res = await axios.get(`${GetApi()}/admin/logs`, { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } });
		if (res.status === 200) {
			return res.data;
		} else {
			return [];
		}
	} catch (err) {
		console.error("GetLogsError", err);
		return [];
	}
}