import { Route, Routes, BrowserRouter } from "react-router-dom"
import Layout from "./layout/Layout"
import Authentication from "./panel/Authentication"
import Logs from "./panel/Log"
import Classroom from "./panel/Classroom"
import User from "./panel/User"

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index path="/" element={<Authentication />} />

				{/*todo: Add privare routes*/}
				<Route element={<Layout />}>
					<Route path="/dashboard/classroom" element={<Classroom />} />
					<Route path="/dashboard/logs" element={<Logs />} />
					<Route path="/dashboard/users" element={<User />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

