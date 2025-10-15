import axios from "axios";
import type { ClassroomProps, ExamFormData, LessonProps } from "../types/Classroom";
import { GetApi } from "../utils/GetApi";
import { toastMessage } from "../utils/Toast";

export const GetClassrooms = async (): Promise<ClassroomProps[]> => {
	try {
		const token = localStorage.getItem("token")
		const res = await axios.get<ClassroomProps[]>(`${GetApi()}/user/classRooms`, { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } });
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

export const GetLessons = async (): Promise<LessonProps[]> => {
	return await axios.get<LessonProps[]>(`${GetApi()}/teacher/ora`, { headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` } })
		.then(res => res.data)
		.catch(err => {
			console.error("GetLessonsError", err)
			return []
		})
}

export const CreateExam = async (data: ExamFormData): Promise<void> => {
	const token = localStorage.getItem("token")
	await axios.post(`${GetApi()}/teacher/ora`, data, { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } })
		.then(() => { toastMessage("Exam created successfully!", "success") })
		.catch(err => {
			toastMessage("Error occurred while creating exam", "danger")
			console.error("CreateExamError", err)
		})
}