import { useEffect, useState } from "react"
import { Trash2, CreditCard, UserCircle, Shield, GraduationCap } from "lucide-react"
import type { UserData } from "../types/Classroom"
import { CreateNewUser, DeleteUser, GetAllRegisteredUsers } from "../services/UserService"
import CreateNewUserPopUp from "./operation/CreateNewUser"

export default function User() {
	const [users, setUsers] = useState<UserData[]>([])
	const [loading, setLoading] = useState(true)
	const [searchTerm, setSearchTerm] = useState("")
	const [roleFilter, setRoleFilter] = useState<number | "all">("all")

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const data: UserData[] = await GetAllRegisteredUsers()
				setUsers(data)
			} catch (error) {
				console.error("Failed to fetch users:", error)
			} finally {
				setLoading(false)
			}
		}
		fetchUsers()
	}, [])

	const roleName = (role: number) => {
		switch (role) {
			case 0:
				return "Student"
			case 1:
				return "Teacher"
			case 2:
				return "Admin"
		}
	}

	const getRoleIcon = (role: number) => {
		switch (role) {
			case 0:
				return <GraduationCap className="w-4 h-4" />
			case 1:
				return <UserCircle className="w-4 h-4" />
			case 2:
				return <Shield className="w-4 h-4" />
		}
	}

	const getRoleBadgeColor = (role: number) => {
		switch (role) {
			case 0:
				return "badge-info"
			case 1:
				return "badge-success"
			case 2:
				return "badge-error"
		}
	}

	const handleDelete = (userId: string) => {
		DeleteUser(userId)
		console.log("Delete user:", userId)
	}

	const handleNFCTag = (userId: string) => {
		// TODO: Implement NFC tag assignment
		console.log("Assign NFC tag to user:", userId)
	}

	const filteredUsers = users.filter((user) => {
		const matchesSearch =
			user.realName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.neptunCode.toLowerCase().includes(searchTerm.toLowerCase())
		const matchesRole = roleFilter === "all" || user.role === roleFilter
		return matchesSearch && matchesRole
	})

	return (
		<div className="p-6">
			<div className="max-w-7xl mx-auto">
				<div className="flex items-center justify-between mb-8">
					<div>
						<h1 className="text-4xl font-bold text-base-content mb-2">Registered Users</h1>
						<p className="text-base-content/60">Manage user accounts and permissions</p>
					</div>
					<div>
						<div className="badge badge-lg badge-primary">{filteredUsers.length} of {users.length} Users</div>
						<CreateNewUserPopUp />
					</div>
				</div>

				<div className="card bg-base-100 shadow-xl mb-6">
					<div className="card-body">
						<div className="flex flex-col md:flex-row gap-4">
							<div className="form-control flex-1">
								<div className="input-group">
									<input
										type="text"
										placeholder="Search by name or Neptun code..."
										className="input input-bordered w-full"
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
									/>
								</div>
							</div>
							<div className="form-control md:w-64">
								<select
									className="select select-bordered w-full"
									value={roleFilter}
									onChange={(e) => setRoleFilter(e.target.value === "all" ? "all" : Number(e.target.value))}
								>
									<option value="all">All Roles</option>
									<option value="0">Students</option>
									<option value="1">Teachers</option>
									<option value="2">Admins</option>
								</select>
							</div>
						</div>
					</div>
				</div>

				{loading ? (
					<div className="flex flex-col items-center justify-center py-16 space-y-4">
						<span className="loading loading-spinner loading-lg text-primary"></span>
						<p className="text-base-content/60">Loading users...</p>
					</div>
				) : filteredUsers.length === 0 ? (
					<div className="card bg-base-100 shadow-xl">
						<div className="card-body items-center text-center py-16">
							<UserCircle className="w-16 h-16 text-base-content/20 mb-4" />
							<h2 className="card-title text-base-content/60">
								{users.length === 0 ? "No users found" : "No matching users"}
							</h2>
							<p className="text-base-content/40">
								{users.length === 0 ? "Start by adding your first user" : "Try adjusting your search filters"}
							</p>
						</div>
					</div>
				) : (
					<div className="card bg-base-100 shadow-xl">
						<div className="overflow-x-auto">
							<table className="table table-zebra">
								<thead>
									<tr className="border-b border-base-300">
										<th className="bg-base-200">Neptun Code</th>
										<th className="bg-base-200">Name</th>
										<th className="bg-base-200">Role</th>
										<th className="bg-base-200 text-right">Actions</th>
									</tr>
								</thead>
								<tbody>
									{filteredUsers.map((user) => (
										<tr key={user.id} className="hover">
											<td>
												<div className="flex items-center space-x-3">
													<div className="avatar placeholder">
														<div className="bg-primary text-primary-content rounded-full w-10">
															<span className="text-sm font-semibold">
																{user.neptunCode.substring(0, 2).toUpperCase()}
															</span>
														</div>
													</div>
													<div className="font-mono font-semibold text-base-content">
														{user.neptunCode}
													</div>
												</div>
											</td>
											<td>
												<div className="font-medium text-base-content">{user.realName}</div>
											</td>
											<td>
												<div className={`badge ${getRoleBadgeColor(user.role)} gap-2`}>
													{getRoleIcon(user.role)}
													{roleName(user.role)}
												</div>
											</td>
											<td>
												<div className="flex justify-end gap-2">
													<button
														onClick={() => handleNFCTag(user.id)}
														className="btn btn-sm btn-primary"
														title="Assign NFC Tag"
													>
														<CreditCard className="w-4 h-4" />
														NFC Tag
													</button>
													<button
														onClick={() => handleDelete(user.id)}
														className="btn btn-sm btn-error btn-outline"
														title="Delete User"
													>
														<Trash2 className="w-4 h-4" />
													</button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}