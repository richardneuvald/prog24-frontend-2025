import { Plus } from "lucide-react";
import Popup from "reactjs-popup";
import { useState } from "react";
import { AddClassroom } from "../../services/ClassroomService";

export default function AddClassRoom() {
	const [classroomName, setClassroomName] = useState("");

	const handleSubmit = () => {
		if (classroomName.trim()) {
			console.log("Creating classroom:", classroomName);
			AddClassroom(classroomName);
			setClassroomName(""); // reset
		}
	};

	return (
		<Popup
			trigger={
				<button className="bg-base-100 text-primary px-4 py-2 rounded-lg font-semibold hover:bg-base-200 transition-colors flex items-center gap-2 shadow-md">
					<Plus className="w-4 h-4" />
					Create Exam
				</button>
			}
			modal
			nested
			overlayStyle={{ background: "rgba(0,0,0,0.7)" }}
			contentStyle={{
				background: "transparent",
				border: "none",
				padding: 0,
				width: "90%",
				maxWidth: "600px",
			}}
		>
			<div className="bg-base-100 p-6 rounded-lg shadow-lg">
				<h2 className="text-xl font-bold mb-4">Add Classroom</h2>
				<input
					type="text"
					placeholder="Classroom name"
					value={classroomName}
					onChange={(e) => setClassroomName(e.target.value)}
					className="input input-bordered w-full mb-4"
				/>
				<div className="flex justify-end gap-2">
					<button
						onClick={close}
						className="btn btn-ghost"
					>
						Cancel
					</button>
					<button
						onClick={() => {
							handleSubmit();
							close();
						}}
						className="btn btn-primary"
					>
						Create
					</button>
				</div>
			</div>
		</Popup>
	);
}