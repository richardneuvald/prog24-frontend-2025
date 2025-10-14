import { useEffect, useState } from "react"
import type { LogProps } from "../types/Log"
import { GetLogs } from "../services/LogService"

export default function Logs() {
	const [logs, setLogs] = useState<LogProps[]>([])
	const [lastUpdated, setLastUpdated] = useState<string>("")

	// Fetch logs from API
	const fetchLogs = async () => {
		const data: LogProps[] = await GetLogs()
		setLogs(data)
		setLastUpdated(new Date().toLocaleTimeString()) // update the timestamp
	}

	// Run on mount
	useEffect(() => {
		fetchLogs()
	}, [])

	// Manual refresh (no page reload)
	const handleRefresh = async () => {
		await fetchLogs()
	}

	const getActionBadgeClass = (action: number) => {
		switch (action) {
			case 1:
				return "badge-success"
			case 100:
			case 101:
			case 102:
				return "badge-info"
			default:
				return "badge-danger"
		}
	}

	const getActionName = (action: number) => {
		switch (action) {
			case 0:
				return "Sign in"
			case 100:
				return "Enter Class"
			case 101:
				return "Leave Class"
			case 102:
				return "Check Class"
			default:
				return "Unknown Action"
		}
	}

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

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
					<div className="stat bg-base-200 rounded-box shadow-lg">
						<div className="stat-title text-base-content/70">Total Logs</div>
						<div className="stat-value text-primary">{logs.length}</div>
						<div className="stat-desc">All time records</div>
					</div>
					<div className="stat bg-base-200 rounded-box shadow-lg">
						<div className="stat-title text-base-content/70">Today</div>
						<div className="stat-value text-secondary">{logs.length}</div>
						<div className="stat-desc">Active today</div>
					</div>
					<div className="stat bg-base-200 rounded-box shadow-lg">
						<div className="stat-title text-base-content/70">Unique Users</div>
						<div className="stat-value text-accent">
							{new Set(logs.map((l) => l.userName)).size}
						</div>
						<div className="stat-desc">Different users</div>
					</div>
				</div>

				{/* Logs Table */}
				<div className="card bg-base-200 shadow-xl">
					<div className="card-body">
						<div className="flex justify-between items-center mb-4">
							<h2 className="card-title text-2xl">Recent Activity</h2>

							{/* Updated time and refresh button aligned on one line */}
							<div className="flex items-center gap-3">
								<p className="text-sm text-base-content/60">
									Updated: {lastUpdated || "—"}
								</p>
								<button
									onClick={handleRefresh}
									className="btn btn-primary btn-sm"
								>
									Refresh
								</button>
							</div>
						</div>


						<div className="overflow-x-auto">
							<table className="table table-zebra">
								<thead>
									<tr>
										<th className="text-base-content/80">ID</th>
										<th className="text-base-content/80">Neptun Code</th>
										<th className="text-base-content/80">Action</th>
										<th className="text-base-content/80">Time</th>
									</tr>
								</thead>
								<tbody>
									{logs.map((log, idx) => (
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
													<div className="font-semibold">
														{log.neptunCode}
													</div>
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
												<div className="text-sm">
													<div className="font-medium">
														{log.dateTime.split("T")[0]}{" "}
														{log.dateTime.split("T")[1].split(".")[0]}
														{" UTC"}
													</div>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						{logs.length === 0 && (
							<div className="text-center py-12">
								<p className="text-base-content/60 text-lg">No logs available</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
