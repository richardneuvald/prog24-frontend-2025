// ======== Imports ========
import { toast, type ToastPosition } from 'react-toastify'

const toastConfig = {
	autoClose: 5000,
	closeButton: false,
	position: 'bottom-right' as ToastPosition,
	hideProgressBar: true,
	progress: undefined,
	className: "lighter-night-bg text-white"
}


/**
 * Displays a toast notification with a specified message and type.
 *
 * @param msg - The message to display in the toast notification.
 * @param msgType - The type of the toast notification. Can be one of:
 *   - `"info"`: Displays an informational message (default).
 *   - `"warning"`: Displays a warning message.
 *   - `"success"`: Displays a success message.
 *   - `"danger"`: Displays an error or danger message.
 * 
 * @returns void
 * 
 * @see
 * https://www.npmjs.com/package/react-toastify
 * 
 * @example
 * ```
 * toastMessage("Message Info") // Info toast notification
 * toastMessage("Message Error", "error") // Error toast notification
 * ```
 */
export const toastMessage = (msg: string, msgType: "info" | "warning" | "success" | "danger" = "info"): void => {
	const toastTypes = {
		danger: toast.error,
		success: toast.success,
		warning: toast.warn,
		info: toast.info
	}
	toastTypes[msgType](msg, toastConfig)
}