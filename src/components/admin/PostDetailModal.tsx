import { useEffect, useState } from "react";
import type { AdminPetPost } from "../../types/post";
import { parseListField } from "../../utils/parsers";

const PostDetailModal = ({
  post,
  onClose,
}: {
  post: AdminPetPost;
  onClose: () => void;
}) => {
  const [view, setView] = useState<"POST" | "USER">("POST");
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
      <div className="bg-white border-4 border-black w-full max-w-lg shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Block */}
        <div className="flex items-center justify-between px-6 py-4 border-b-4 border-black bg-purple-400">
          <h2 className="text-xl font-black uppercase tracking-wider text-black">
            {view === "POST" ? "💥 Post Details 💥" : "👤 Submitter Profile 👤"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 border-2 border-black rounded-none bg-white text-black hover:bg-yellow-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
        </div>

        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {view === "POST" ? (
            <>
              {/* Pet Media Frame */}
              <div className="border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-amber-100 relative max-h-64 overflow-hidden flex items-center justify-center">
                <img
                  src={
                    post.imageURL ||
                    "https://via.placeholder.com/600x400?text=No+Image"
                  }
                  alt={post.petName || "Pet"}
                  className="w-full object-cover h-64"
                />
                {/* Embedded Submitter Button */}
                <div className="absolute bottom-3 left-3">
                  <button
                    onClick={() => setView("USER")}
                    className="px-3 py-1.5 text-xs font-black border-2 border-black rounded-none bg-cyan-300 text-black hover:bg-cyan-400 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1"
                  >
                    <span>By: @{post.author.username || "UnknownUser"}</span>
                    <span className="text-sm">👉</span>
                  </button>
                </div>
              </div>

              {/* Identity Row */}
              <div className="flex items-start justify-between gap-4 border-b-4 border-dashed border-black pb-4">
                <div>
                  <h3 className="text-3xl font-black uppercase text-black tracking-tight drop-shadow-[2px_2px_0px_rgba(255,255,255,1)]">
                    {post.petName || "Unnamed Pet"}
                  </h3>
                  <span className="inline-block mt-1 font-mono text-xs font-bold bg-gray-200 border border-black px-1">
                    ID: {post._id}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span
                    className={`text-sm font-black uppercase tracking-widest px-3 py-1 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${isLost ? "bg-red-400 text-black" : "bg-emerald-400 text-black"}`}
                  >
                    {post.status}
                  </span>
                  {post.reward && (
                    <span className="text-xs font-black bg-yellow-300 text-black px-3 py-1 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                      💰 ${post.reward}
                    </span>
                  )}
                </div>
              </div>

              {/* Spec Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "🕵️‍♂️ Breed", value: post.breed },
                  { label: "🎨 Color", value: post.color },
                  {
                    label: "📅 Last Seen Date",
                    value: post.lastSeenDate
                      ? new Date(post.lastSeenDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          },
                        )
                      : undefined,
                  },
                  {
                    label: "🏆 Reward Status",
                    value: post.reward ? `$${post.reward}` : "No Reward",
                  },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="border-2 border-black p-2 bg-slate-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <p className="text-xs font-black uppercase tracking-wider text-purple-600">
                      {label}
                    </p>
                    <p className="text-base font-extrabold text-black mt-0.5">
                      {value || "—"}
                    </p>
                  </div>
                ))}
                <div className="col-span-2 border-2 border-black p-3 bg-yellow-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <p className="text-xs font-black uppercase tracking-wider text-red-500">
                    📍 Last Seen Location
                  </p>
                  <p className="text-base font-extrabold text-black mt-0.5">
                    {post.lastSeenLocation || "—"}
                  </p>
                </div>
              </div>

              {/* Direct Post Contact Options */}
              <div className="border-t-4 border-black pt-4 space-y-2">
                <p className="text-xs font-black uppercase tracking-wider text-black">
                  📞 Broadcast Contacts
                </p>
                <div className="flex flex-col gap-2">
                  {parsedPhones.map((phone, i) => (
                    <a
                      key={i}
                      href={`tel:${phone}`}
                      className="w-fit text-sm font-bold border border-black bg-white px-2 py-1 hover:bg-purple-100 underline decoration-2 text-blue-600"
                    >
                      📞 {phone}
                    </a>
                  ))}
                  {parsedEmails.map((email, i) => (
                    <a
                      key={i}
                      href={`mailto:${email}`}
                      className="w-fit text-sm font-bold border border-black bg-white px-2 py-1 hover:bg-purple-100 underline decoration-2 text-blue-600 break-all"
                    >
                      ✉️ {email}
                    </a>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* User Detail View Section - UPDATED TO SHOW PROFILE PIC AND REMOVE ID */
            <div className="space-y-6 py-2 animate-fade-in">
              {/* Back Button */}
              <button
                onClick={() => setView("POST")}
                className="px-3 py-1.5 text-xs font-black border-2 border-black rounded-none bg-yellow-300 text-black hover:bg-yellow-400 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1"
              >
                ⬅️ BACK TO POST
              </button>

              <div className="border-4 border-black p-6 bg-cyan-50 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-5">
                {/* Profile Pic Display with Initials Fallback */}
                <div>
                  <label className="text-xs font-black uppercase tracking-wider text-gray-500 block mb-2">
                    Profile Picture
                  </label>
                  <div className="w-24 h-24 bg-purple-300 border-4 border-black overflow-hidden flex items-center justify-center font-black text-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    {post.author.profilePic ? (
                      <img
                        src={post.author.profilePic}
                        alt={post.author.username}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Falls back to initials if image URL fails
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      (post.author.username || "U").slice(0, 2).toUpperCase()
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black uppercase tracking-wider text-gray-500">
                    Account Handle
                  </label>
                  <p className="text-2xl font-black text-black">
                    @{post.author.username || "Unknown_User"}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-black uppercase tracking-wider text-gray-500">
                    Verified Email Address
                  </label>
                  <p className="text-base font-extrabold text-black bg-white border-2 border-black p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] break-all">
                    {post.author.email || "No registered email available"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetailModal;
