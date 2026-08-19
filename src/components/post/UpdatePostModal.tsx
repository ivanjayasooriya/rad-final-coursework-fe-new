import { useEffect } from "react";
import type { PetPost } from "../../types/post";
import UpdatePost from "./UpdatePost";

const UpdatePostModal = ({
  post,
  onClose,
}: {
  post: PetPost;
  onClose: () => void;
}) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b-4 border-black bg-amber-100">
          <div>
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">
              Update Post
            </h2>
            <p className="text-xs text-gray-700 font-bold mt-0.5 capitalize">
              Editing: {post.petName || "Unnamed Pet"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-black hover:bg-rose-400 transition-colors p-1.5 border-2 border-black rounded-lg bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto p-6 bg-white">
          <UpdatePost post={post} onSuccess={onClose} />
        </div>
      </div>
    </div>
  );
};

export default UpdatePostModal;
