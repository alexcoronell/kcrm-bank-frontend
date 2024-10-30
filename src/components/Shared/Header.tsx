import { Button } from "../ui/Button";
import Logo from "../ui/Logo";

export default function Header() {
	return (
		<header className="Header flex p-2 items-center justify-between w-full shadow-md">
			<Logo />
			<Button variant="light">Logout</Button>
		</header>
	);
}
