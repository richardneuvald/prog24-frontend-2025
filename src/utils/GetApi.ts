
/**
 * @description This file manages the api endpoint
 */

// =========== Imports ===========
const apiUrl = import.meta.env.VITE_API_URL

/**
 * Returns the base API URL as a string.
 *
 * @returns {string} The API URL.
 * 
 * @example `${GetApi()}/....`
 */
export const GetApi = (): string => apiUrl