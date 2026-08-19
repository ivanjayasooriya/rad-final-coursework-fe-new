import type { UserProfile } from "../../types/user";

const UserDeleteModal = ({
  user,
  onConfirm,
  onCancel,
  isDeleting,
}: {
  user: UserProfile;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
    onClick={(e) => {
      if (e.target === e.currentTarget) onCancel();
    }}
  >
    <div className="bg-white border-4 border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-sm p-6 flex flex-col gap-5 transform rotate-[1deg]">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 border-4 border-black bg-red-400 flex items-center justify-center shrink-0 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-black uppercase tracking-tight text-gray-900">
            Terminate Agent?
          </h3>
          <p className="text-sm font-bold text-gray-700 mt-2">
            User Account{" "}
            <span className="bg-yellow-300 px-1 border border-black font-extrabold block my-1 text-center">
              @{user.username || "Unknown Submitter"}
            </span>{" "}
            and all corresponding records will be thoroughly purged!
          </p>
        </div>
      </div>
      <div className="flex gap-3 justify-end mt-2">
        <button
          onClick={onCancel}
          disabled={isDeleting}
          className="px-4 py-2 text-sm font-black border-4 border-black rounded-none bg-white hover:bg-gray-100 active:translate-x-0.5 active:translate-y-0.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all disabled:opacity-50"
        >
          ABORT
        </button>
        <button
          onClick={onConfirm}
          disabled={isDeleting}
          className="px-4 py-2 text-sm font-black border-4 border-black rounded-none bg-red-500 text-white hover:bg-red-600 active:translate-x-0.5 active:translate-y-0.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all disabled:opacity-50"
        >
          {isDeleting ? "PURGING..." : "YES, EXILE!"}
        </button>
      </div>
    </div>
  </div>
);

export default UserDeleteModal;
