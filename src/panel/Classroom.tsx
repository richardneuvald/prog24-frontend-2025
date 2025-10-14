import { useState } from "react"
import { Search, Plus, Clock, Calendar, BookOpen, ChevronDown } from "lucide-react"

interface Exam {
	subject: string
	date: string
	time: string
}

interface Room {
	name: string
	bookedTimes: string[]
	exams: Exam[]
}

export default function Classroom() {
	const [search, setSearch] = useState<string>("")
	const [expandedRoom, setExpandedRoom] = useState<string | null>(null)

	const [rooms] = useState<Room[]>([
		{
			name: "Room 101",
			bookedTimes: ["08:00 - 10:00", "13:00 - 14:30"],
			exams: [
				{ subject: "Mathematics Test", date: "2025-10-15", time: "08:00" },
				{ subject: "Programming Basics", date: "2025-10-18", time: "13:00" },
			],
		},
		{
			name: "Room 102",
			bookedTimes: ["09:00 - 11:00"],
			exams: [
				{ subject: "Physics Test", date: "2025-10-16", time: "09:00" },
				{ subject: "Algorithms", date: "2025-10-20", time: "10:00" },
			],
		},
		{
			name: "Room 103",
			bookedTimes: ["10:00 - 12:00", "15:00 - 16:30"],
			exams: [
				{ subject: "Database Management", date: "2025-10-17", time: "10:00" },
				{ subject: "Computer Architecture", date: "2025-10-21", time: "15:00" },
			],
		},
		{
			name: "Room 104",
			bookedTimes: ["11:30 - 13:00"],
			exams: [
				{ subject: "Software Development", date: "2025-10-19", time: "11:30" },
			],
		},
	])

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
						<button className="btn">Add Classroom</button>
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
										<button className="bg-base-100 text-primary px-4 py-2 rounded-lg font-semibold hover:bg-base-200 transition-colors flex items-center gap-2 shadow-md">
											<Plus className="w-4 h-4" />
											Add Class
										</button>
									</div>
									<div className="flex items-center gap-2 text-primary-content/80">
										<Clock className="w-4 h-4" />
										<span className="text-sm">{room.bookedTimes.length} time slots booked</span>
									</div>
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
												{room.bookedTimes.map((time, i) => (
													<div
														key={i}
														className="bg-primary/10 px-4 py-3 rounded-lg border border-primary/20"
													>
														<span className="text-base-content font-medium">{time}</span>
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
												<span className="bg-secondary/20 text-secondary px-2 py-1 rounded-full text-xs font-bold">
													{room.exams.length}
												</span>
											</div>
											<ChevronDown
												className={`w-5 h-5 text-base-content/40 transition-transform ${expandedRoom === `${room.name}-exams` ? "rotate-180" : ""
													}`}
											/>
										</button>
										{expandedRoom === `${room.name}-exams` && (
											<div className="space-y-3 ml-7 animate-in fade-in slide-in-from-top-2 duration-300">
												{room.exams.map((exam, j) => (
													<div
														key={j}
														className="bg-secondary/10 p-4 rounded-lg border border-secondary/20 hover:border-secondary/40 transition-colors"
													>
														<div className="font-semibold text-base-content mb-2">{exam.subject}</div>
														<div className="flex items-center gap-4 text-sm text-base-content/70">
															<div className="flex items-center gap-1">
																<Calendar className="w-4 h-4" />
																<span>{exam.date}</span>
															</div>
															<div className="flex items-center gap-1">
																<Clock className="w-4 h-4" />
																<span>{exam.time}</span>
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