import { useState } from "react"
import { Plus, Calendar, Clock, BookOpen } from "lucide-react"
import Popup from "reactjs-popup"
import type { ExamFormData } from "../../types/Classroom"
import { CreateExam } from "../../services/ClassroomService"

export default function AddExam({ classroomId }: { classroomId: string }) {
	const [formData, setFormData] = useState<ExamFormData>({
		name: "",
		startTime: "",
		endTime: "",
		isExam: true,
	})

	const handleSubmit = (close: () => void) => {
		const payload = {
			name: formData.name,
			startTime: new Date(formData.startTime).toISOString(),
			endTime: new Date(formData.endTime).toISOString(),
			isExam: formData.isExam,
			classRoomId: classroomId,
		}

		console.log("Form submitted:", payload)
		CreateExam(payload)

		// Reset form and close popup
		setFormData({
			name: "",
			startTime: "",
			endTime: "",
			isExam: true,
		})
		close()
	}

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
			<div className="bg-base-100 rounded-2xl shadow-2xl overflow-hidden border border-base-content/10">
				{/* Header */}
				<div className="bg-gradient-to-r from-primary to-secondary p-6 text-primary-content">
					<div className="flex items-center gap-3">
						<div className="bg-primary-content/20 p-3 rounded-lg">
							<BookOpen className="w-6 h-6" />
						</div>
						<div>
							<h2 className="text-2xl font-bold">Create New Exam</h2>
							<p className="text-primary-content/80 text-sm">Fill in the details below</p>
						</div>
					</div>
				</div>

				{/* Form Content */}
				<div className="p-6 space-y-6">
					{/* Name Field */}
					<div className="space-y-2">
						<label className="flex items-center gap-2 text-base-content font-semibold">
							<BookOpen className="w-4 h-4 text-primary" />
							Exam Name
						</label>
						<input
							type="text"
							value={formData.name}
							onChange={(e) => setFormData({ ...formData, name: e.target.value })}
							className="w-full px-4 py-3 rounded-lg border-2 border-base-content/10 focus:border-primary focus:outline-none bg-base-200 text-base-content transition-all placeholder:text-base-content/50"
							placeholder="e.g., Mathematics Final Exam"
						/>
					</div>

					{/* Start Time Field */}
					<div className="space-y-2">
						<label className="flex items-center gap-2 text-base-content font-semibold">
							<Clock className="w-4 h-4 text-primary" />
							Start Time
						</label>
						<input
							type="datetime-local"
							value={formData.startTime}
							onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
							className="w-full px-4 py-3 rounded-lg border-2 border-base-content/10 focus:border-primary focus:outline-none bg-base-200 text-base-content transition-all"
						/>
					</div>

					{/* End Time Field */}
					<div className="space-y-2">
						<label className="flex items-center gap-2 text-base-content font-semibold">
							<Calendar className="w-4 h-4 text-primary" />
							End Time
						</label>
						<input
							type="datetime-local"
							value={formData.endTime}
							onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
							className="w-full px-4 py-3 rounded-lg border-2 border-base-content/10 focus:border-primary focus:outline-none bg-base-200 text-base-content transition-all"
						/>
					</div>

					{/* Is Exam Toggle */}
					<div className="flex items-center justify-between p-4 bg-base-200 rounded-lg border border-base-content/10">
						<div>
							<label className="text-base-content font-semibold block">Is this an exam?</label>
							<p className="text-base-content/60 text-sm">Toggle if this is a formal examination</p>
						</div>
						<label className="relative inline-flex items-center cursor-pointer">
							<input
								type="checkbox"
								checked={formData.isExam}
								onChange={(e) => setFormData({ ...formData, isExam: e.target.checked })}
								className="sr-only peer"
							/>
							<div className="w-14 h-7 bg-base-content/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
						</label>
					</div>

					{/* Action Buttons */}
					<div className="flex gap-3 pt-4">
						<button
							type="button"
							onClick={() => handleSubmit(close)}
							className="w-full px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-primary to-secondary text-primary-content hover:opacity-90 transition-opacity shadow-lg flex items-center justify-center gap-2"
						>
							<Plus className="w-5 h-5" />
							Create Exam
						</button>
					</div>
				</div>

				{/* Debug Info */}
				<div className="px-6 pb-6">
					<div className="bg-base-200/50 rounded-lg p-4 border border-base-content/5">
						<p className="text-xs text-base-content/50 font-mono">
							Classroom ID: {classroomId}
						</p>
					</div>
				</div>
			</div>
		</Popup>
	)
}