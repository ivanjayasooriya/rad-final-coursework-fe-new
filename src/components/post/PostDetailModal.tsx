import { useEffect } from "react";
import type { PetPost } from "../../types/post";
import { parseListField } from "../../utils/parsers";

const PostDetailModal = ({
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
      onClick={handleBackdrop}
    >
      <div className="relative bg-white border-4 border-slate-950 rounded-none shadow-[12px_12px_0px_0px_rgba(2,6,23,1)] w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden transform scale-100 transition-all">
        {/* Comic Header/Close Banner */}
        <div className="bg-cyan-400 border-b-4 border-slate-950 p-4 flex justify-between items-center relative">
          <h3 className="text-xl font-black uppercase tracking-wider text-slate-950 skew-x-[-6deg]">
            💥 FILE: #{(post._id || "").toString().slice(-6)}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-950 bg-red-500 hover:bg-red-600 border-2 border-slate-950 font-black p-1.5 transition-transform hover:scale-110 active:scale-95 shadow-[2px_2px_0px_0px_rgba(2,6,23,1)]"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={4}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Image Frame */}
        <div className="bg-yellow-100 border-b-4 border-slate-950 flex items-center justify-center w-full p-4 relative">
          <img
            src={
              post.imageURL ||
              "https://via.placeholder.com/600x400?text=No+Image"
            }
            alt={post.petName || "Pet"}
            className="w-full object-contain max-h-72 border-4 border-slate-950 bg-white shadow-[4px_4px_0px_0px_rgba(2,6,23,1)]"
          />
        </div>

        {/* Details Wrapper */}
        <div className="overflow-y-auto p-6 flex flex-col gap-5 bg-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-4xl font-black text-slate-950 uppercase tracking-tight skew-x-[-4deg] drop-shadow-[2px_2px_0px_rgba(251,191,36,1)]">
                {post.petName || "Unnamed Pet"}
              </h2>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <span
                className={`text-sm font-black tracking-widest uppercase px-4 py-1.5 border-2 border-slate-950 shadow-[3px_3px_0px_0px_rgba(2,6,23,1)] ${isLost ? "bg-red-500 text-white" : "bg-emerald-500 text-white"}`}
              >
                {post.status}
              </span>
              {post.reward && (
                <span className="text-xs font-black bg-yellow-400 border-2 border-slate-950 text-slate-950 px-3 py-1 shadow-[2px_2px_0px_0px_rgba(2,6,23,1)] uppercase tracking-wider rotate-2">
                  💰 REWARD: ${post.reward}
                </span>
              )}
            </div>
          </div>

          {/* Specs panel */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(2,6,23,1)] relative before:absolute before:inset-0 before:bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] before:[background-size:16px_16px] before:opacity-30">
            <div className="relative z-10">
              <DetailField label="BREED" value={post.breed} />
            </div>
            <div className="relative z-10">
              <DetailField label="COLOR" value={post.color} />
            </div>
            <div className="col-span-2 relative z-10">
              <DetailField
                label="LAST SEEN LOCATION"
                value={post.lastSeenLocation}
              />
            </div>
            <div className="col-span-2 relative z-10">
              <DetailField
                label="LAST SEEN DATE"
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
            </div>
          </div>

          <div className="border-t-4 border-dashed border-slate-950 my-1" />

          {/* Contact Actions */}
          <div className="space-y-3">
            <p className="text-sm font-black uppercase tracking-widest text-orange-600 bg-orange-100 border-2 border-orange-400 px-2 py-0.5 max-w-max skew-x-[-10deg]">
              📞 INTEL CHANNELS
            </p>
            {parsedPhones.map((phone, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white p-3 border-2 border-slate-950 shadow-[4px_4px_0px_0px_rgba(2,6,23,1)] hover:bg-yellow-50 transition-colors"
              >
                <span className="text-xl">📞</span>
                <a
                  href={`tel:${phone}`}
                  className="text-slate-950 font-black hover:underline tracking-wide"
                >
                  {phone}
                </a>
              </div>
            ))}
            {parsedEmails.map((email, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white p-3 border-2 border-slate-950 shadow-[4px_4px_0px_0px_rgba(2,6,23,1)] hover:bg-cyan-50 transition-colors"
              >
                <span className="text-xl">✉️</span>
                <a
                  href={`mailto:${email}`}
                  className="text-slate-950 font-black hover:underline break-all tracking-wide"
                >
                  {email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailField = ({ label, value }: { label: string; value?: string }) => (
  <div>
    <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">
      {label}
    </span>
    <p className="text-base font-black text-slate-950 mt-0.5 uppercase tracking-wide">
      {value || "—"}
    </p>
  </div>
);

export default PostDetailModal;
