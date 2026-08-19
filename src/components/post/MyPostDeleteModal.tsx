import type { PetPost } from "../../types/post";

const MyPostDeleteModal = ({
  post,
  onConfirm,
  onCancel,
  isDeleting,
}: {
  post: PetPost;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    onClick={(e) => {
      if (e.target === e.currentTarget) onCancel();
    }}
  >
    <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl w-full max-w-sm p-6 flex flex-col gap-5">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-rose-400 border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">
            Delete this post?
          </h3>
          <p className="text-sm text-gray-700 font-medium mt-1">
            <span className="font-black bg-yellow-200 px-1 border border-black rounded capitalize">
              {post.petName || "This post"}
            </span>{" "}
            will be permanently removed!
          </p>
        </div>
      </div>
      <div className="flex gap-3 justify-end">
        <button
          onClick={onCancel}
          disabled={isDeleting}
          className="px-4 py-2 text-sm font-bold border-2 border-black rounded-lg bg-white hover:bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={isDeleting}
          className="px-4 py-2 text-sm font-black bg-rose-500 hover:bg-rose-600 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all text-black disabled:opacity-50 flex items-center gap-2"
        >
          {isDeleting ? "Deleting…" : "Yes, delete!"}
        </button>
      </div>
    </div>
  </div>
);

export default MyPostDeleteModal;
