import { useState } from "react"
import type { LoginProps } from "../types/Authentication"
import { login } from "../services/AuthenticationService"

export default function Authentication() {

	const [neptun, setNeptun] = useState<string>("")
	const [pwd, setPwd] = useState<string>("")

	const Login = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault()
		const loginData: LoginProps = { neptunCode: neptun, password: pwd }
		login(loginData)
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-base-100">
			<form className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4" onSubmit={Login}>
				<legend className="fieldset-legend">Login</legend>

				<label className="label">Neptun Code</label>
				<input
					type="text"
					className="input"
					placeholder="Neptun"
					minLength={6}
					maxLength={6}
					pattern="[A-Za-z0-9]{6}"
					required
					onChange={(e) => setNeptun(e.target.value)}
				/>

				<label className="label">Password</label>
				<input
					type="password"
					className="input"
					placeholder="Password"
					required
					onChange={(e) => setPwd(e.target.value)}
				/>

				<button type="submit" className="btn btn-neutral mt-4">Login</button>
			</form>
		</div>
	)
}