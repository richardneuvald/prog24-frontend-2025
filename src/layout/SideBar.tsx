/**
 * @description Sidebar for the authenticated users with the routes
 */

// =========== Imports ===========
import { FaUser, FaSignOutAlt, FaBars, FaChevronLeft, FaBook, FaFilm } from "react-icons/fa"
import { useEffect, useState } from "react"
import type { IconType } from "react-icons"
import { logout } from "../services/AuthenticationService"
// import { getJwtData } from "../services/AuthenticationService"
// import type { JwtPayload } from "../types/JWT"

export function Sidebar() {
	const [isOpen, setIsOpen] = useState(true)
	const [isMobile, setIsMobile] = useState(false)
	const [userData] = useState<{ role: number | undefined }>({ role: 2 })

	useEffect(() => {
		const checkMobile = () => {
			const mobile = window.innerWidth < 1024
			setIsMobile(mobile)
			if (mobile) setIsOpen(false)
		}

		checkMobile()
		window.addEventListener("resize", checkMobile)
		return () => window.removeEventListener("resize", checkMobile)
	}, [])

	const toggleSidebar = () => setIsOpen(!isOpen)

	const newMenu: { [key: string]: { name: string, href: string, icon: IconType, assessLevel: number }[] } = {
		teacher: [
			{ name: "Classroom", href: "/dashboard/classroom", icon: FaFilm, assessLevel: 1 },
		],
		admin: [
			{ name: "Logs", href: "/dashboard/logs", icon: FaBook, assessLevel: 2 },
			{ name: "Users", href: "/dashboard/users", icon: FaUser, assessLevel: 2 },
		],
	}

	return (
		<>
			{/* Mobile menu button (only when closed) */}
			{isMobile && !isOpen && (
				<button
					className="fixed top-4 left-4 z-50 p-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 active:scale-95 transition-all duration-200"
					onClick={toggleSidebar}
					aria-label="Open menu"
				>
					<FaBars size={20} />
				</button>
			)}

			{/* Mobile background overlay */}
			{isMobile && isOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-60 z-30 transition-opacity duration-300"
					onClick={toggleSidebar}
				/>
			)}

			{/* Sidebar */}
			<aside
				className={`
					fixed lg:sticky top-0 left-0 h-screen
					bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-white
					flex flex-col justify-between
					transition-all duration-300 ease-in-out z-40
					${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
					${isOpen ? "w-64" : "lg:w-20"}
				`}
			>
				{/* Header */}
				<div className="p-4 border-b border-gray-700/50">
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg font-bold shrink-0 overflow-hidden">
								<img src="/path/to/user-image.jpg" alt="User" className="w-full h-full object-cover" />
							</div>
							<span
								className={`font-semibold text-sm transition-all duration-300 whitespace-nowrap overflow-hidden ${isOpen ? "opacity-100 w-auto ml-2" : "opacity-0 w-0 m-0"
									}`}
							>
								User Name
							</span>
						</div>

						{/* Close button (only when open) */}
						{isOpen && (
							<button
								className="p-2 hover:bg-gray-800 rounded-lg transition-all duration-200 active:scale-90"
								onClick={toggleSidebar}
								aria-label="Close sidebar"
							>
								<FaChevronLeft size={16} />
							</button>
						)}
					</div>
				</div>

				{/* Desktop expand button (when collapsed) */}
				{!isOpen && !isMobile && (
					<button
						className="hidden lg:flex absolute -right-3 top-8 p-1.5 bg-gray-900 border border-gray-700 rounded-full hover:bg-gray-800 transition-all duration-200 items-center justify-center"
						onClick={toggleSidebar}
						aria-label="Open sidebar"
					>
						<FaChevronLeft className="rotate-180" size={12} />
					</button>
				)}

				{/* Navigation menu */}
				<nav className="flex-1 px-3 py-6 space-y-2">
					{Object.keys(newMenu).map((section) => {
						const filteredItems = newMenu[section].filter((item) => item.assessLevel <= userData?.role!)

						return (
							filteredItems.length > 0 && (
								<div key={section} className="p-2">
									{/* Section title */}
									<span
										className={`block text-gray-400 uppercase text-xs font-semibold mb-2 overflow-hidden transition-all duration-300 opacity-100 w-auto ml-2"
											}`}
									>
										{section[0].toUpperCase() + section.slice(1)}
									</span>

									{/* Menu items */}
									<ul>
										{filteredItems.map((item, index) => (
											<li key={index}>
												<a
													href={item.href}
													className="flex items-center gap-4 mt-3 text-lg transition-all duration-300 hover:text-blue-400"
												>
													<item.icon />
													<span
														className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${isOpen ? "opacity-100 w-auto ml-2" : "opacity-0 w-0 m-0"
															}`}
													>
														{item.name}
													</span>
												</a>
											</li>
										))}
									</ul>
								</div>
							)
						)
					})}
				</nav>

				{/* Logout button */}
				<div className="p-3 border-t border-gray-700/50">
					<button
						className={`
							w-full flex items-center gap-3 p-3 rounded-lg
							bg-red-600/10 text-red-400 hover:bg-red-600 hover:text-white
							transition-all duration-200 font-medium active:scale-95
							${!isOpen ? "lg:justify-center" : ""}
						`}
						onClick={() => logout()}
					>
						<FaSignOutAlt className="shrink-0 text-lg" />
						<span
							className={`text-sm transition-all duration-300 whitespace-nowrap overflow-hidden ${isOpen ? "opacity-100 w-auto ml-2" : "opacity-0 w-0 m-0"
								}`}
						>
							Log Out
						</span>
					</button>
				</div>
			</aside>
		</>
	)
}
