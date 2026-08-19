import { useEffect } from "react";
import type { UserProfile } from "../../types/user";
import { parseRolesList } from "../../utils/parsers";

const UserDetailModal = ({
  user,
  onClose,
}: {
  user: UserProfile;
  onClose: () => void;
}) => {
  const parsedRoles = parseRolesList(user.roles);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white border-4 border-black w-full max-w-md shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b-4 border-black bg-cyan-400">
          <h2 className="text-xl font-black uppercase tracking-wider text-black">
            🕵️‍♂️ Core Dossier File 🕵️‍♂️
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

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-5 border-4 border-black p-4 bg-purple-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-20 h-20 bg-yellow-300 border-4 border-black overflow-hidden shrink-0 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-black text-3xl">
              {user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt={user.username}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                user.username.slice(0, 2).toUpperCase()
              )}
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-black uppercase bg-black text-white px-1.5 py-0.5 tracking-wider">
                HANDLE
              </span>
              <h3 className="text-2xl font-black text-black truncate mt-1">
                @{user.username}
              </h3>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-gray-500 block mb-1">
                Verified Email Terminal
              </label>
              <p className="text-base font-extrabold text-black bg-white border-2 border-black p-2.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] break-all">
                {user.email}
              </p>
            </div>

            <div>
              <label className="text-xs font-black uppercase tracking-wider text-gray-500 block mb-1">
                Dossier Clearance Permissions
              </label>
              <div className="flex flex-wrap gap-2">
                {parsedRoles.map((role, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-amber-300 text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    ⚡ {role}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="border-2 border-black p-2 bg-slate-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-xs font-black uppercase tracking-wider text-gray-500">
                  Database ID
                </p>
                <p className="text-xs font-mono font-bold text-black mt-1 truncate">
                  {user._id}
                </p>
              </div>
              <div className="border-2 border-black p-2 bg-slate-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-xs font-black uppercase tracking-wider text-gray-500">
                  Account Status
                </p>
                <p className="text-xs font-black text-emerald-600 uppercase mt-1">
                  ● ACTIVE USER
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
