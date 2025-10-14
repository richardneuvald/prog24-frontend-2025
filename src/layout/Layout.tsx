/**
 * @description This file makes a layout for the unauthenticated user (guest)
 */

// =========== Imports ===========
import { Sidebar } from "./SideBar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./Footer";

export default function Layout() {
	return (
		<div className="flex min-h-screen text-white">
			{/* Sidebar a képernyő szélén */}
			<Sidebar />

			{/* Main content */}
			<div className="flex-1 flex flex-col">
				<main className="flex-1 p-6 overflow-auto">
					<Outlet />
					<ToastContainer />
				</main>

				<Footer />
			</div>
		</div>
	)
}