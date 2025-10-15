import { useEffect, useState } from "react"
import { Search, Clock, Calendar, BookOpen, ChevronDown, User, Trash2 } from "lucide-react"
import type { ClassroomProps, LessonProps } from "../types/Classroom"
import { DeleteLesson, GetClassrooms, GetLessons } from "../services/ClassroomService"
import AddExam from "./operation/AddExam"
import AddStudent from "./operation/AddStudent"
import AddClassRoom from "./operation/AddClassroom"

export default function Classroom() {
	const [search, setSearch] = useState<string>("")
	const [expandedRoom, setExpandedRoom] = useState<string | null>(null)

	const [rooms, setRooms] = useState<ClassroomProps[]>([])
	const [lessons, setLessons] = useState<LessonProps[]>([])
	const [notExams, setNotExams] = useState<LessonProps[]>([])

	useEffect(() => {
		const fetchRooms = async () => {
			const data: ClassroomProps[] = await GetClassrooms()
			setRooms(data)
		}

		const fetchLessons = async () => {
			const data: LessonProps[] = await GetLessons()
			// Only future lessons
			const selectedData = data.filter(l => new Date(l.startTime).getTime() > Date.now())
			const selectNotExams = data.filter(l => !l.isExam && new Date(l.startTime).getTime() > Date.now())
			setLessons(selectedData)
			setNotExams(selectNotExams)
		}
		fetchLessons()
		fetchRooms()
	}, [])


	const filteredRooms = rooms.filter((room) =>
		room.name.toLowerCase().includes(search.toLowerCase())
	)

	const toggleRoom = (roomName: string) => {
		setExpandedRoom(expandedRoom === roomName ? null : roomName)
	}

	return (
		<div className="p-6">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="mb-8 flex justify-between items-center">
					<div>
						<h1 className="text-4xl font-bold text-base-content mb-2">Classroom Manager</h1>
						<p className="text-base-content/70">Manage rooms, schedules, and exams efficiently</p>
					</div>
					<div>
						<AddClassRoom />
					</div>
				</div>

				{/* Search bar */}
				<div className="mb-8">
					<div className="relative max-w-2xl">
						<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/40 w-5 h-5" />
						<input
							type="search"
							className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-base-content/10 focus:border-primary focus:outline-none bg-base-100 shadow-sm transition-all text-base-content placeholder:text-base-content/50"
							placeholder="Search by room name..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
				</div>

				{/* Rooms grid */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{filteredRooms.length > 0 ? (
						filteredRooms.map((room, index) => (
							<div
								key={index}
								className="bg-base-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-base-content/10"
							>
								{/* Room header */}
								<div className="bg-gradient-to-r from-primary to-secondary p-6 text-primary-content">
									<div className="flex justify-between items-center mb-4">
										<h2 className="text-2xl font-bold">{room.name}</h2>
										<AddExam classroomId={room.id} />
									</div>
									{/*<div className="flex items-center gap-2 text-primary-content/80">
										<Clock className="w-4 h-4" />
										<span className="text-sm">{room.bookedTimes.length} time slots booked</span>
									</div>*/}
								</div>

								{/* Room content */}
								<div className="p-6">
									{/* Booked times section */}
									<div className="mb-6">
										<button
											onClick={() => toggleRoom(`${room.name}-times`)}
											className="flex items-center justify-between w-full mb-3 group"
										>
											<div className="flex items-center gap-2">
												<Clock className="w-5 h-5 text-primary" />
												<h3 className="font-semibold text-base-content text-lg">Booked Time Slots</h3>
											</div>
											<ChevronDown
												className={`w-5 h-5 text-base-content/40 transition-transform ${expandedRoom === `${room.name}-times` ? "rotate-180" : ""
													}`}
											/>
										</button>
										{expandedRoom === `${room.name}-times` && (
											<div className="space-y-2 ml-7 animate-in fade-in slide-in-from-top-2 duration-300">
												{notExams.filter(r => r.classRoomId == room.id).map((exam, j) => (
													<div
														key={j}
														className="bg-secondary/10 p-4 rounded-lg border border-secondary/20 hover:border-secondary/40 transition-colors"
													>
														<div className="flex flex-end">
															<div className="font-semibold text-base-content mb-2">{exam.name}</div>
															<div>
																<button className="btn btn-info">Add User</button>
																<button className="btn btn-danger">Delete Exam</button>
															</div>
														</div>
														<div className="flex items-center gap-4 text-sm text-base-content/70">
															<div className="flex items-center gap-1">
																<Calendar className="w-4 h-4" />
																<span>{exam.startTime}</span>
															</div>
															<div className="flex items-center gap-1">
																<Clock className="w-4 h-4" />
																<span>{exam.endTime}</span>
															</div>

															<div>
																{exam.teacherName}
															</div>
														</div>
													</div>
												))}
											</div>
										)}
									</div>

									{/* Exams section */}
									<div>
										<button
											onClick={() => toggleRoom(`${room.name}-exams`)}
											className="flex items-center justify-between w-full mb-3 group"
										>
											<div className="flex items-center gap-2">
												<BookOpen className="w-5 h-5 text-secondary" />
												<h3 className="font-semibold text-base-content text-lg">Upcoming Exams</h3>
												{/*<span className="bg-secondary/20 text-secondary px-2 py-1 rounded-full text-xs font-bold">
													{room.exams.length}
												</span>*/}
											</div>
											<ChevronDown
												className={`w-5 h-5 text-base-content/40 transition-transform ${expandedRoom === `${room.name}-exams` ? "rotate-180" : ""
													}`}
											/>
										</button>
										{expandedRoom === `${room.name}-exams` && (
											<div className="space-y-3 ml-7 animate-in fade-in slide-in-from-top-2 duration-300">
												{lessons.filter(r => r.classRoomId == room.id && r.state == 0).map((exam, j) => (
													<div
														key={j}
														className="bg-secondary/10 p-4 rounded-lg border border-secondary/20 hover:border-secondary/40 transition-colors"
													>
														<div className="flex items-start justify-between mb-4">
															<h3 className="font-bold text-lg text-base-content group-hover:text-secondary transition-colors">
																{exam.name}
															</h3>
															<div className="flex gap-2">
																<AddStudent classroomId={exam.id} />
																<button className="px-3 py-1.5 rounded-lg bg-error/20 text-error hover:bg-error hover:text-error-content transition-all flex items-center gap-1.5 text-sm font-semibold shadow-sm hover:shadow-md" onClick={() => DeleteLesson(exam.id)}>
																	<Trash2 className="w-4 h-4" />
																	Delete
																</button>
															</div>
														</div>

														{/* Info Section */}
														<div className="flex items-center gap-6 text-sm text-base-content/70">
															{/* Start Time */}
															<div className="flex items-center gap-2 bg-base-200/50 px-3 py-2 rounded-lg">
																<Calendar className="w-4 h-4 text-secondary" />
																<span className="font-medium">{exam.startTime}</span>
															</div>

															{/* End Time */}
															<div className="flex items-center gap-2 bg-base-200/50 px-3 py-2 rounded-lg">
																<Clock className="w-4 h-4 text-secondary" />
																<span className="font-medium">{exam.endTime}</span>
															</div>

															{/* Teacher */}
															<div className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-lg ml-auto">
																<User className="w-4 h-4 text-primary" />
																<span className="font-semibold text-base-content">{exam.teacherName}</span>
															</div>
														</div>
													</div>
												))}
											</div>
										)}
									</div>
								</div>
							</div>
						))
					) : (
						<div className="col-span-2 text-center py-16">
							<div className="bg-base-100 rounded-2xl shadow-lg p-12 max-w-md mx-auto border border-base-content/10">
								<Search className="w-16 h-16 text-base-content/20 mx-auto mb-4" />
								<p className="text-xl text-base-content/60">
									No results found for "<span className="font-semibold text-base-content">{search}</span>"
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}