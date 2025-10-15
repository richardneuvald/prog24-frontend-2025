export interface LogProps {
	userEvent: UserEvent,
	userName: string,
	neptunCode: string,
	oraName: string,
	classRoomName: string,
	dateTime: string
}

export type UserEvent =
	| 0    // Login
	| 1    // RefreshToken
	| 100  // EnterClass
	| 101  // LeaveClass
	| 102; // CheckClass