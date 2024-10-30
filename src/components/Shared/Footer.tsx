import Logo from "../ui/Logo";

export default function Footer() {
	const date = new Date();
	const year = date.getFullYear();
	return (
		<footer className="Footer w-full border-t-2">
			<div className="w-full max-w-[1200px] mx-auto flex items-center justify-between py-6">
				<Logo />
				<h5 className="text-lg">Copyright © {year} Grupo KCRM</h5>
			</div>
		</footer>
	);
}
