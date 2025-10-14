import axios from "axios";
import type { LoginProps } from "../types/Authentication";
import { toastMessage } from "../utils/Toast";
import * as jwt_decode from "jwt-decode";
import type { JwtPayload as JwtPayload, TokenResponse } from "../types/JWT";
import { GetApi } from "../utils/GetApi";

export const isAuthenticated = (): boolean => {
	try {
		const token = localStorage.getItem('token')
		if (!token) return false
		const decoded: JwtPayload = jwt_decode.jwtDecode<JwtPayload>(token)
		return decoded.exp * 1000 > new Date().getTime()
	} catch (err) { console.error("Token validation error:", err); return false }
}


export const getJwtData = (): JwtPayload => jwt_decode.jwtDecode<JwtPayload>(localStorage.getItem('token') ?? '')


export const getUid = (): string | null => localStorage.getItem('uid')


export const login = async (loginData: LoginProps): Promise<void> => {
	await axios.post(`${GetApi()}/auth/login`, loginData, { headers: { "Content-Type": "application/json" } })
		.then(res => {
			if (res.status === 200) {
				const token: TokenResponse = res.data
				const decoded: JwtPayload = jwt_decode.jwtDecode<JwtPayload>(token.token)
				if (decoded.exp * 1000 > new Date().getTime()) {
					localStorage.setItem('token', token.token)
					localStorage.setItem('uid', decoded.sub)
					toastMessage("Successful authentication!", "success")
					document.location.href = '/dashboard/classroom'
				} else toastMessage("Token expired. Please try again.", "danger")
			}
		}).catch(err => {
			//todo: Create error handling
			toastMessage("Error occurred during login", "danger")
			console.error(err)
		})
}

export const logout = (): void => {
	localStorage.clear()
	document.location.href = '/'
}


//export const RefreshToken = async () => {
//	if (!isAuthenticated()) return
//	const token = localStorage.getItem('token')
//	await axios.post(`${GetApi()}/auth/refreshToken`, {}, { headers: { "Authorization": `Bearer ${token}` } }).then(res => {
//		if (res.status === 200) {
//			const token: TokenResponse = res.data
//			localStorage.setItem('token', token.token)
//		}
//	}).catch(err => console.error("RefreshTokenError", err))
//}