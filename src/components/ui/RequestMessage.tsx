import { RequestStatus } from "../../core/types/RequestStatus.type";

interface Props {
  status: RequestStatus;
  message: string;
  showMessage: boolean;
}

export function RequestMessage({ status, message, showMessage }: Props) {
  if (showMessage) {
    return (
      <div className="rounded-md overflow-hidden opacity-80">
        <div
          className={
            status === "failed"
              ? "bg-red-500 text-white"
              : "bg-green-500 text-gray-900"
          }
        >
          <p className="text-center py-4">{message}</p>
        </div>
      </div>
    );
  } else return null;
}
