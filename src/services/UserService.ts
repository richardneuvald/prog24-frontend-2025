import axios from "axios"
import type { UserData } from "../types/Classroom"
import { GetApi } from "../utils/GetApi"
import { toastMessage } from "../utils/Toast"

export const GetAllRegisteredUsers = async (): Promise<UserData[]> => {
	return await axios.get<UserData[]>(`${GetApi()}/admin/users`, { headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` } })
		.then(res => res.data)
		.catch(err => {
			console.error("GetAllRegisteredUsersError", err)
			return []
		})
}

export const CreateNewUser = async (userData: UserData): Promise<void> => {
	await axios.post(`${GetApi()}/admin/users`, userData, { headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` } })
		.then(() => { toastMessage("User created successfully!", "success") })
		.catch(err => {
			console.error("CreateNewUserError", err)
			toastMessage("Error occurred while creating user", "danger")
		})
}

export const DeleteUser = async (userId: string): Promise<void> => {
	await axios.delete(`${GetApi()}/admin/users?userId=${userId}`, { headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` } })
		.then(() => { toastMessage("User deleted successfully!", "success"); location.reload() })
		.catch(err => {
			console.error("DeleteUserError", err)
			toastMessage("Error occurred while deleting user", "danger")
		})
}

export const GetNfcTagForUser = async (userId: string): Promise<string | null> => {
	return await axios.get(`${GetApi()}/admin/users/nfcTag?userId=${userId}`, { headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` } })
		.then(res => res.data.nfcTag)
		.catch(err => {
			console.error("GetNfcTagForUserError", err)
			return null
		})
}