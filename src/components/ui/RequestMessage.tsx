import type { RequestStatus } from "../../core/types/RequestStatus.type";

interface Props {
	status: RequestStatus;
	message: string;
	showMessage: boolean;
}

export function RequestMessage({ status, message, showMessage }: Props) {
	return (
		<div className={`rounded-md overflow-hidden opacity-60 fixed z-50 top-32 transition-all duration-1000 ${showMessage ? "right-10" : "right-[-100%]"}`}>
			<div
				className={`w-[360px] h-[80px] flex items-center justify-center ${status === "failed"
					? "bg-red-500 text-white"
					: "bg-green-500 text-gray-900"}`}
			>
				<p className="text-center py-4">{message}</p>
			</div>
		</div>
	);
}
