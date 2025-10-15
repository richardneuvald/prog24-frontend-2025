import { useEffect, useState } from "react"
import type { LogProps } from "../types/Log"
import { GetLogs } from "../services/LogService"

export default function Logs() {
	const [logs, setLogs] = useState<LogProps[]>([])
	const [lastUpdated, setLastUpdated] = useState<string>("")
	const [searchQuery, setSearchQuery] = useState<string>("")

	const fetchLogs = async () => {
		const data: LogProps[] = await GetLogs()
		setLogs(data)
		setLastUpdated(new Date().toLocaleTimeString())
	}

	useEffect(() => {
		fetchLogs()
	}, [])

	const handleRefresh = async () => {
		await fetchLogs()
	}

	const getActionBadgeClass = (action: number) => {
		switch (action) {
			case 0:
			case 1:
				return "badge-success"
			case 100:
			case 102:
				return "badge-info"
			case 101:
				return "badge-warning"
			default:
				return "badge-error"
		}
	}

	const getActionName = (action: number) => {
		switch (action) {
			case 0:
				return "Sign in"
			case 1:
				return "Refresh Token"
			case 100:
				return "Enter Class"
			case 101:
				return "Leave Class"
			case 102:
				return "Check Class"
			default:
				return "Unknown"
		}
	}

	// Szűrés keresés alapján
	const filteredLogs = logs.filter((log) => {
		const query = searchQuery.toLowerCase()
		return (
			log.neptunCode.toLowerCase().includes(query) ||
			getActionName(log.userEvent).toLowerCase().includes(query)
		)
	})

	return (
		<div className="min-h-screen bg-base-100 p-6">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="mb-8 flex justify-between items-center">
					<div>
						<h1 className="text-4xl font-bold text-base-content mb-2">Activity Logs</h1>
						<p className="text-base-content/60">Track all user activities and system events</p>
					</div>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
					<div className="stat bg-base-200 rounded-box shadow-lg">
						<div className="stat-title text-base-content/70">Total Logs</div>
						<div className="stat-value text-primary">{logs.length}</div>
						<div className="stat-desc">All time records</div>
					</div>
					<div className="stat bg-base-200 rounded-box shadow-lg">
						<div className="stat-title text-base-content/70">Filtered</div>
						<div className="stat-value text-secondary">{filteredLogs.length}</div>
						<div className="stat-desc">Matching search</div>
					</div>
					<div className="stat bg-base-200 rounded-box shadow-lg">
						<div className="stat-title text-base-content/70">Unique Users</div>
						<div className="stat-value text-accent">
							{new Set(logs.map((l) => l.userName)).size}
						</div>
						<div className="stat-desc">Different users</div>
					</div>
				</div>

				{/* Table */}
				<div className="card bg-base-200 shadow-xl">
					<div className="card-body">
						<div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-3">
							<h2 className="card-title text-2xl">Recent Activity</h2>

							{/* SearchBar */}
							<label className="input input-bordered flex items-center gap-2 w-full md:w-64">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									className="w-5 h-5 opacity-70"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>
								<input
									type="text"
									placeholder="Search by Neptun or Action"
									className="grow"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
							</label>

							{/* Updated time and refresh */}
							<div className="flex items-center gap-3">
								<p className="text-sm text-base-content/60">
									Updated: {lastUpdated || "—"}
								</p>
								<button onClick={handleRefresh} className="btn btn-primary btn-sm">
									Refresh
								</button>
							</div>
						</div>

						{/* Logs Table */}
						<div className="overflow-x-auto">
							<table className="table table-zebra">
								<thead>
									<tr>
										<th>ID</th>
										<th>Neptun Code</th>
										<th>Action</th>
										<th>Time</th>
									</tr>
								</thead>
								<tbody>
									{filteredLogs.map((log, idx) => (
										<tr key={idx} className="hover">
											<td>
												<div className="font-mono text-sm text-base-content/60">
													#{idx + 1}
												</div>
											</td>
											<td>
												<div className="flex items-center gap-3">
													<div className="avatar placeholder">
														<div className="bg-primary text-primary-content rounded-full w-10">
															<span className="text-xs">
																{log.neptunCode.substring(0, 2)}
															</span>
														</div>
													</div>
													<div className="font-semibold">{log.neptunCode}</div>
												</div>
											</td>
											<td>
												<span
													className={`badge ${getActionBadgeClass(
														log.userEvent
													)} badge-lg`}
												>
													{getActionName(log.userEvent)}
												</span>
											</td>
											<td>
												<div className="text-sm font-medium">
													{log.dateTime.split("T")[0]}{" "}
													{log.dateTime.split("T")[1].split(".")[0]} UTC
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						{filteredLogs.length === 0 && (
							<div className="text-center py-12">
								<p className="text-base-content/60 text-lg">No matching logs</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
