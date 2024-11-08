interface Props {
	errorMessage: string;
	errorStatus: boolean;
}
export function ErrorInputMessage({ errorMessage, errorStatus }: Props) {
	return (
		<div className={errorStatus ? "opacity-100" : "opacity-0"}>
			<p className="text-red-500 text-xs mt-0 pl-1">{errorMessage}</p>
		</div>
	);
}
