import axios from "axios";
import type { ClassroomProps } from "../types/Classroom";
import { GetApi } from "../utils/GetApi";

export const GetClassrooms = async (): Promise<ClassroomProps[]> => {
	try {
		const token = localStorage.getItem("token")
		const res = await axios.get<ClassroomProps[]>(`${GetApi()}/teacher/classRooms`, { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } });
		if (res.status === 200) {
			return res.data;
		} else {
			return [];
		}
	} catch (err) {
		console.error("GetClassroomsError", err);
		return [];
	}
}