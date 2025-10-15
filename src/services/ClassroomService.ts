import axios from "axios";
import type { AddStudentToLessonProps, ClassroomProps, ExamFormData, LessonProps, UserData } from "../types/Classroom";
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
	return await axios.get<LessonProps[]>(`${GetApi()}/teacher/lessons`, { headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` } })
		.then(res => res.data)
		.catch(err => {
			console.error("GetLessonsError", err)
			return []
		})
}

export const CreateExam = async (data: ExamFormData): Promise<void> => {
	const token = localStorage.getItem("token")
	await axios.post(`${GetApi()}/teacher/lessons`, data, { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } })
		.then(() => { toastMessage("Exam created successfully!", "success") })
		.catch(err => {
			toastMessage("Error occurred while creating exam", "danger")
			console.error("CreateExamError", err)
		})
}

export const DeleteLesson = async (lessonId: string): Promise<void> => {
	const token = localStorage.getItem("token")
	await axios.delete(`${GetApi()}/teacher/lessons?oraId=${lessonId}`, { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } })
		.then(() => { toastMessage("Lesson deleted successfully!", "success"); location.reload() })
		.catch(err => {
			toastMessage("Error occurred while deleting lesson", "danger")
			console.error("DeleteLessonError", err)
		})
}

export const AddStudentToLesson = async (studentData: AddStudentToLessonProps): Promise<void> => {
	const token = localStorage.getItem("token")
	await axios.post(`${GetApi()}/teacher/lessons/students`, studentData, { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } })
		.then(() => { toastMessage("Student added successfully!", "success") })
		.catch(err => {
			toastMessage("Error occurred while adding student", "danger")
			console.error("AddStudentToLessonError", err)
		})
}


export const GetAllUsers = async (): Promise<UserData[]> => {
	return await axios.get<UserData[]>(`${GetApi()}/teacher/students`, { headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` } })
		.then(res => res.data)
		.catch(err => {
			console.error("GetAllUsersError", err)
			return []
		})
}


export const GetSignedInUsers = async (oraId: string): Promise<UserData[]> => {
	return await axios.get<UserData[]>(`${GetApi()}/teacher/lessons/students?oraId=${oraId}`, { headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` } })
		.then(res => res.data)
		.catch(err => {
			console.error("GetSignedInUsersError", err)
			return []
		})
}

export const AddClassroom = async (name: string): Promise<void> => {
	const token = localStorage.getItem("token")
	await axios.post(`${GetApi()}/admin/classRoom?classRoomName=${name}`, { name }, { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } })
		.then(() => { toastMessage("Classroom created successfully!", "success") })
		.catch(err => {
			toastMessage("Error occurred while creating classroom", "danger")
			console.error("AddClassroomError", err)
		})
}