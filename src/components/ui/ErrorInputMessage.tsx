interface Props {
	message: string;
	errorStatus: boolean;
}
export function ErrorInputMessage({ message, errorStatus }: Props) {
	return (
		<div className={errorStatus ? "opacity-100" : "opacity-0"}>
			<p className="text-red-500 text-xs mt-0 pl-1">{message}</p>
		</div>
	);
}
