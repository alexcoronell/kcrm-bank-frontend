import { useEffect } from "react";
import { navigate } from "wouter/use-browser-location";

export default function MainPage() {
	useEffect(() => navigate('/login'), [])
	return <h1 className="text-3xl font-bold underline">KCRM Bank</h1>;
}
