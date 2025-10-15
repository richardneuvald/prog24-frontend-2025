import { useEffect, useState } from "react"
import { UserPlus, Search, Users, Check } from "lucide-react"
import Popup from "reactjs-popup"
import type { AddStudentToLessonProps, UserData } from "../../types/Classroom"
import { AddStudentToLesson, GetAllUsers } from "../../services/ClassroomService"

export default function AddStudent({ classroomId }: { classroomId: string }) {
	const [allUsers, setAllUsers] = useState<UserData[]>([])
	const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set()) // ✅ store IDs
	const [searchTerm, setSearchTerm] = useState("")

	useEffect(() => {
		const fetchUsers = async () => {
			const users = await GetAllUsers()
			setAllUsers(users)
		}
		fetchUsers()
	}, [])

	const filteredUsers = allUsers.filter(
		(user) =>
			user.realName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.neptunCode?.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const toggleUser = (userId: string) => {
		const newSelected = new Set(selectedUsers)
		if (newSelected.has(userId)) {
			newSelected.delete(userId)
		} else {
			newSelected.add(userId)
		}
		setSelectedUsers(newSelected)
	}

	const handleAddStudents = (close: () => void) => {
		console.log("Adding students to classroom:", classroomId)
		console.log("Selected user IDs:", Array.from(selectedUsers))

		selectedUsers.forEach((userId) => {
			const studentData: AddStudentToLessonProps = {
				oraId: classroomId,
				studentId: userId,
			}
			AddStudentToLesson(studentData)
		})

		setSelectedUsers(new Set())
		setSearchTerm("")
		close()
	}

	return (
		<Popup
			trigger={
				<button className="px-3 py-1.5 rounded-lg bg-info/20 text-info hover:bg-info hover:text-info-content transition-all flex items-center gap-1.5 text-sm font-semibold shadow-sm hover:shadow-md">
					<UserPlus className="w-4 h-4" />
					Add Student
				</button>
			}
			modal
			nested
			overlayStyle={{ background: "rgba(0,0,0,0.7)" }}
			contentStyle={{
				background: "transparent",
				border: "none",
				padding: 0,
				width: "90%",
				maxWidth: "700px",
			}}
		>
			<div className="bg-base-100 rounded-2xl shadow-2xl overflow-hidden border border-base-content/10 max-h-[90vh] flex flex-col">
				{/* Header */}
				<div className="bg-gradient-to-r from-info to-primary p-6 text-primary-content">
					<div className="flex items-center gap-3">
						<div className="bg-primary-content/20 p-3 rounded-lg">
							<Users className="w-6 h-6" />
						</div>
						<div>
							<h2 className="text-2xl font-bold">Add Students to Class</h2>
							<p className="text-primary-content/80 text-sm">
								Select students to add to the classroom
							</p>
						</div>
					</div>
				</div>

				{/* Search Bar */}
				<div className="p-6 border-b border-base-content/10">
					<div className="relative">
						<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/40 w-5 h-5" />
						<input
							type="search"
							className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-base-content/10 focus:border-info focus:outline-none bg-base-200 text-base-content transition-all placeholder:text-base-content/50"
							placeholder="Search by name or Neptun code..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
					{selectedUsers.size > 0 && (
						<div className="mt-3 flex items-center gap-2 text-sm">
							<div className="bg-info/20 text-info px-3 py-1.5 rounded-lg font-semibold">
								{selectedUsers.size} selected
							</div>
						</div>
					)}
				</div>

				{/* User List */}
				<div className="flex-1 overflow-y-auto p-6 space-y-2">
					{filteredUsers.length > 0 ? (
						filteredUsers.map((user) => (
							<label
								key={user.id}
								className="flex items-center gap-4 p-4 rounded-lg bg-base-200 hover:bg-base-300 border border-base-content/10 hover:border-info/30 transition-all cursor-pointer group"
							>
								{/* Checkbox */}
								<div className="relative">
									<input
										type="checkbox"
										checked={selectedUsers.has(user.id)}
										onChange={() => toggleUser(user.id)}
										className="sr-only peer"
									/>
									<div className="w-6 h-6 border-2 border-base-content/30 rounded-md peer-checked:bg-info peer-checked:border-info transition-all flex items-center justify-center">
										{selectedUsers.has(user.id) && (
											<Check className="w-4 h-4 text-info-content" />
										)}
									</div>
								</div>

								{/* User Info */}
								<div className="flex-1">
									<div className="font-semibold text-base-content group-hover:text-info transition-colors">
										{user.realName || "Unknown User"}
									</div>
									<div className="text-sm text-base-content/60">
										{user.neptunCode || "No code"}
									</div>
								</div>

								{/* Badge */}
								{selectedUsers.has(user.id) && (
									<div className="bg-info/20 text-info px-2 py-1 rounded text-xs font-bold">
										SELECTED
									</div>
								)}
							</label>
						))
					) : (
						<div className="text-center py-12">
							<Users className="w-16 h-16 text-base-content/20 mx-auto mb-4" />
							<p className="text-base-content/60">
								{searchTerm ? "No users found" : "No users available"}
							</p>
						</div>
					)}
				</div>

				{/* Action Buttons */}
				<div className="p-6 border-t border-base-content/10 bg-base-200/50">
					<div className="flex gap-3">
						<button
							type="button"
							onClick={close}
							className="flex-1 px-6 py-3 rounded-lg font-semibold bg-base-300 text-base-content hover:bg-base-content/20 transition-colors"
						>
							Cancel
						</button>
						<button
							type="button"
							onClick={() => handleAddStudents(close)}
							disabled={selectedUsers.size === 0}
							className="flex-1 px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-info to-primary text-primary-content hover:opacity-90 transition-opacity shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							<UserPlus className="w-5 h-5" />
							Add {selectedUsers.size > 0 ? `${selectedUsers.size} ` : ""}
							Student{selectedUsers.size !== 1 ? "s" : ""}
						</button>
					</div>
				</div>
			</div>
		</Popup>
	)
}
