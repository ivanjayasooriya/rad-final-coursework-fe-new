import { useEffect } from "react";
import type { PetPost } from "../../types/post";
import { parseListField } from "../../utils/parsers";

const BookmarkDetailModal = ({
  post,
  onClose,
}: {
  post: PetPost;
  onClose: () => void;
}) => {
  const parsedPhones = parseListField(post.contactPhone);
  const parsedEmails = parseListField(post.contactEmail);
  const isLost = post.status === "LOST";

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-yellow-50 border-4 border-black shadow-[8px_8px_0px_0px_#000] w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden transform rotate-[-0.5deg]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 text-black bg-white hover:bg-red-400 border-2 border-black transition-colors p-1.5 shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 stroke-[3]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="bg-white border-b-4 border-black flex items-center justify-center w-full relative">
          <img
            src={
              post.imageURL ||
              "https://via.placeholder.com/600x400?text=No+Image"
            }
            alt={post.petName || "Pet"}
            className="w-full object-contain max-h-72"
          />
        </div>

        <div className="overflow-y-auto p-6 flex flex-col gap-5">
          <div className="flex items-start justify-between gap-3 bg-white p-3 border-2 border-black shadow-[4px_4px_0px_0px_#000]">
            <div>
              <h2 className="text-2xl font-black text-black tracking-tight uppercase">
                {post.petName || "Unnamed Pet"}
              </h2>
              <span className="text-xs font-black tracking-wider text-gray-500 uppercase bg-gray-100 px-1.5 py-0.5 border border-black rounded mt-1 inline-block">
                #{(post._id || "").toString().slice(-6)}
              </span>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <span
                className={`text-xs font-black tracking-wider uppercase px-3 py-1 border-2 border-black shadow-[2px_2px_0px_0px_#000] ${
                  isLost ? "bg-red-400 text-black" : "bg-emerald-400 text-black"
                }`}
              >
                {post.status}
              </span>
              {post.reward && (
                <span className="text-xs font-black bg-amber-400 text-black px-3 py-1 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  🏆 REWARD: ${post.reward}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm font-bold">
            <DetailField
              label="Breed"
              value={post.breed}
              bgClass="bg-blue-100"
            />
            <DetailField
              label="Color"
              value={post.color}
              bgClass="bg-purple-100"
            />
            <div className="col-span-2">
              <DetailField
                label="Last Seen Location"
                value={post.lastSeenLocation}
                bgClass="bg-orange-100"
              />
            </div>
            <div className="col-span-2">
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
                bgClass="bg-pink-100"
              />
            </div>
          </div>

          <div className="border-t-4 border-dashed border-black my-1" />

          <div className="bg-white p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000] space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-black bg-cyan-300 px-2 py-0.5 border border-black inline-block">
              CONTACT LIST
            </p>
            <div className="space-y-2">
              {parsedPhones.map((phone, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className="bg-black text-white p-1 font-black text-xs rounded">
                    TEL
                  </span>
                  <a
                    href={`tel:${phone}`}
                    className="text-black font-black underline decoration-2 hover:text-blue-600 break-all"
                  >
                    {phone}
                  </a>
                </div>
              ))}
              {parsedEmails.map((email, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className="bg-black text-white p-1 font-black text-xs rounded">
                    MAIL
                  </span>
                  <a
                    href={`mailto:${email}`}
                    className="text-black font-black underline decoration-2 hover:text-blue-600 break-all"
                  >
                    {email}
                  </a>
                </div>
              ))}
              {parsedPhones.length === 0 && parsedEmails.length === 0 && (
                <p className="text-xs text-gray-500 font-bold italic">
                  No contact info provided.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailField = ({
  label,
  value,
  bgClass = "bg-white",
}: {
  label: string;
  value?: string;
  bgClass?: string;
}) => (
  <div
    className={`${bgClass} p-3 border-2 border-black shadow-[3px_3px_0px_0px_#000] flex flex-col`}
  >
    <span className="text-[10px] font-black uppercase tracking-wider text-black/60">
      {label}
    </span>
    <p className="font-black text-black mt-0.5 text-base truncate">
      {value || "—"}
    </p>
  </div>
);

export default BookmarkDetailModal;
