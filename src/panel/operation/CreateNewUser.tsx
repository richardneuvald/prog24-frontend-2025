import { Plus, X, User, Key, CreditCard, Shield } from "lucide-react";
import { useState } from "react";
import Popup from "reactjs-popup";
import { CreateNewUser } from "../../services/UserService";
import type { UserData } from "../../types/Classroom";

export default function CreateNewUserPopUp() {
	const [formData, setFormData] = useState({
		neptunCode: "",
		realName: "",
		role: 0,
		password: ""
	});

	const handleSubmit = async (close: () => void) => {
		try {
			console.log("Creating user:", formData);
			await CreateNewUser(formData as unknown as UserData);

			// Reset form and close popup
			setFormData({
				neptunCode: "",
				realName: "",
				role: 0,
				password: ""
			});
			close();
		} catch (error) {
			console.error("Failed to create user:", error);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: name === "role" ? Number(value) : value
		}));
	};

	return (
		<Popup
			trigger={
				<button className="bg-base-100 text-primary px-4 py-2 rounded-lg font-semibold hover:bg-base-200 transition-colors flex items-center gap-2 shadow-md">
					<Plus className="w-4 h-4" />
					Create User
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
			<div className="card bg-base-100 shadow-2xl">
				<div className="card-body">
					{/* Header */}
					<div className="flex items-center justify-between mb-4">
						<h2 className="card-title text-2xl text-base-content">
							<User className="w-6 h-6 text-primary" />
							Create New User
						</h2>
						<button
							onClick={close}
							className="btn btn-sm btn-circle btn-ghost"
							aria-label="Close"
						>
							<X className="w-5 h-5" />
						</button>
					</div>

					{/* Form Fields */}
					<div className="space-y-4">
						{/* Neptun Code */}
						<div className="form-control">
							<label className="label">
								<span className="label-text flex items-center gap-2">
									<CreditCard className="w-4 h-4" />
									Neptun Code
								</span>
							</label>
							<input
								type="text"
								name="neptunCode"
								placeholder="e.g., ABC123"
								className="input input-bordered w-full"
								value={formData.neptunCode}
								onChange={handleChange}
								maxLength={6}
							/>
						</div>

						{/* Real Name */}
						<div className="form-control">
							<label className="label">
								<span className="label-text flex items-center gap-2">
									<User className="w-4 h-4" />
									Full Name
								</span>
							</label>
							<input
								type="text"
								name="realName"
								placeholder="e.g., Minta János"
								className="input input-bordered w-full"
								value={formData.realName}
								onChange={handleChange}
							/>
						</div>

						{/* Role */}
						<div className="form-control">
							<label className="label">
								<span className="label-text flex items-center gap-2">
									<Shield className="w-4 h-4" />
									Role
								</span>
							</label>
							<select
								name="role"
								className="select select-bordered w-full"
								value={formData.role}
								onChange={handleChange}
							>
								<option value={0}>Student</option>
								<option value={1}>Teacher</option>
								<option value={2}>Admin</option>
							</select>
						</div>

						{/* Password */}
						<div className="form-control">
							<label className="label">
								<span className="label-text flex items-center gap-2">
									<Key className="w-4 h-4" />
									Password
								</span>
							</label>
							<input
								type="password"
								name="password"
								placeholder="Enter password"
								className="input input-bordered w-full"
								value={formData.password}
								onChange={handleChange}
							/>
							<label className="label">
								<span className="label-text-alt text-base-content/60">
									Minimum 8 characters
								</span>
							</label>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="card-actions justify-end mt-6 gap-2">
						<button
							onClick={close}
							className="btn btn-ghost"
						>
							Cancel
						</button>
						<button
							onClick={() => handleSubmit(close)}
							className="btn btn-primary"
						>
							<Plus className="w-4 h-4" />
							Create User
						</button>
					</div>
				</div>
			</div>
		</Popup>
	);
}