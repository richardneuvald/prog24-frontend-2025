/**
 * @description This file defines the Footer component, which renders the application's footer section
 */

// =========== Imports ===========
import type { JSX } from "react"
import { Heart } from "lucide-react"

export default function Footer(): JSX.Element {
	return (
		<footer className="bg-base-200 border-t border-base-content/10">
			<div className="max-w-7xl mx-auto px-6 py-8">
				<div className="text-center mb-6">
					<h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
						Minuto
					</h3>
					<p className="text-base-content/60 text-sm">
						Your trusted platform for learn
					</p>
				</div>

				<div className="divider"></div>

				<div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
					<p className="text-base-content/60 text-sm text-center md:text-left">
						&copy; {new Date().getFullYear()} Minuto. All rights reserved.
					</p>
					<p className="text-base-content/60 text-sm flex items-center gap-2">
						Designed with <Heart className="w-4 h-4 text-error fill-error animate-pulse" /> by{" "}
						<a
							href="http://richardneuvald.com"
							target="_blank"
							rel="noopener noreferrer"
							className="font-semibold text-primary hover:text-secondary transition-colors"
						>
							Richard Neuvald
						</a>
					</p>
				</div>
			</div>
		</footer>
	)
}