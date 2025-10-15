export interface ClassroomProps {
	id: string
	name: string
}

export interface ExamFormData {
	name: string
	startTime: string
	endTime: string
	isExam: boolean
}

export interface LessonProps {
	name: string,
	startTime: string,
	endTime: string,
	isExam: true,
	classRoomId: string,
	id: string,
	teacherName: string
}