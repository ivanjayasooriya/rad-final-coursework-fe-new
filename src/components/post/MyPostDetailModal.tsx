import { useEffect } from "react";
import type { PetPost } from "../../types/post";
import { parseListField } from "../../utils/parsers";

const MyPostDetailModal = ({
  post,
  onClose,
}: {
  post: PetPost;
  onClose: () => void;
}) => {
  const parsedPhones = parseListField(post.contactPhone);
  const parsedEmails = parseListField(post.contactEmail);
  const isLost = post.status === "LOST";

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={handleBackdrop}
    >
      <div className="relative bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 text-white bg-black hover:bg-red-500 transition-colors p-1.5 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="bg-amber-50 border-b-4 border-black flex items-center justify-center w-full">
          <img
            src={
              post.imageURL ||
              "https://via.placeholder.com/600x400?text=No+Image"
            }
            alt={post.petName || "Pet"}
            className="w-full object-contain max-h-72"
          />
        </div>

        <div className="overflow-y-auto p-6 flex flex-col gap-5 bg-white">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight leading-none">
                {post.petName || "Unnamed Pet"}
              </h2>
              <span className="text-xs font-mono font-bold text-gray-500 mt-1 block">
                #{(post._id || "").toString().slice(-6)}
              </span>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <span
                className={`text-xs font-black tracking-widest uppercase px-3 py-1 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                  isLost
                    ? "bg-rose-400 text-black"
                    : "bg-emerald-400 text-black"
                }`}
              >
                {post.status}
              </span>
              {post.reward && (
                <span className="text-xs font-black bg-amber-400 text-black px-3 py-1 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  🏆 Reward: ${post.reward}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm bg-yellow-50/50 border-2 border-black p-4 rounded-xl">
            <DetailField label="Breed" value={post.breed} />
            <DetailField label="Color" value={post.color} />
            <div className="col-span-2">
              <DetailField
                label="Last Seen Location"
                value={post.lastSeenLocation}
              />
            </div>
            <DetailField
              label="Last Seen Date"
              value={
                post.lastSeenDate
                  ? new Date(post.lastSeenDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : undefined
              }
            />
            <DetailField
              label="Reward"
              value={post.reward ? `$${post.reward}` : "None offered"}
            />
          </div>

          <div className="border-t-2 border-dashed border-black" />

          <div className="space-y-2">
            <p className="text-xs font-black uppercase tracking-wider text-black">
              Contact Channels:
            </p>
            {parsedPhones.map((phone, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="font-bold bg-cyan-300 text-black px-1.5 py-0.5 border border-black rounded text-xs">
                  TEL
                </span>
                <a
                  href={`tel:${phone}`}
                  className="text-blue-600 hover:underline font-bold tracking-tight"
                >
                  {phone}
                </a>
              </div>
            ))}
            {parsedEmails.map((email, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="font-bold bg-fuchsia-300 text-black px-1.5 py-0.5 border border-black rounded text-xs">
                  MAIL
                </span>
                <a
                  href={`mailto:${email}`}
                  className="text-blue-600 hover:underline font-bold break-all tracking-tight"
                >
                  {email}
                </a>
              </div>
            ))}
            {parsedPhones.length === 0 && parsedEmails.length === 0 && (
              <p className="text-xs text-gray-500 font-medium italic">
                No contact info provided.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailField = ({ label, value }: { label: string; value?: string }) => (
  <div>
    <span className="text-[11px] font-black uppercase tracking-wider text-amber-800">
      {label}
    </span>
    <p className="font-bold text-black mt-0.5">{value || "—"}</p>
  </div>
);

export default MyPostDetailModal;
