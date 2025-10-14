export interface JwtPayload {
	aud: string
	exp: number
	iat: number
	iss: string
	jti: string
	sub: string
	email: string
	name: string
	role: number
	imgurl: string
}

export interface TokenResponse {
	token: string
}