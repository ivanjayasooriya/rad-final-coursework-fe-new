import { useState } from "react";
import type { UserProfile } from "../../types/user";

const UserEmailModal = ({
  user,
  onCancel,
  onSend,
  isSending,
}: {
  user: UserProfile;
  onCancel: () => void;
  onSend: (subject: string, body: string) => void;
  isSending: boolean;
}) => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) return;
    onSend(subject, body);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white border-4 border-black w-full max-w-md shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col transform rotate-[-0.5deg]"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b-4 border-black bg-yellow-300">
          <h2 className="text-xl font-black uppercase tracking-wider text-black">
            🚀 Dispatch Transmission 🚀
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="p-1 border-2 border-black bg-white text-black hover:bg-red-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
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

        <div className="p-6 space-y-4">
          <div>
            <label className="text-xs font-black uppercase tracking-wider text-gray-500 block mb-1">
              Target Agent Terminal (To)
            </label>
            <p className="text-sm font-extrabold text-black bg-gray-100 border-2 border-black p-2.5 truncate shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              @{user.username} ({user.email})
            </p>
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-wider text-gray-500 block mb-1">
              Transmission Subject
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="ENTER ENCRYPTED TOPIC..."
              className="w-full px-3 py-2.5 text-sm font-bold border-4 border-black bg-white text-black focus:outline-none focus:bg-purple-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] placeholder-gray-400"
            />
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-wider text-gray-500 block mb-1">
              Message Intel Payload
            </label>
            <textarea
              required
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="WRITE COMMUNIQUE HERE..."
              className="w-full px-3 py-2.5 text-sm font-bold border-4 border-black bg-white text-black focus:outline-none focus:bg-purple-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] placeholder-gray-400 resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3 justify-end px-6 pb-6 pt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSending}
            className="px-4 py-2 text-sm font-black border-4 border-black bg-white hover:bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all disabled:opacity-50"
          >
            ABORT
          </button>
          <button
            type="submit"
            disabled={isSending}
            className="px-4 py-2 text-sm font-black border-4 border-black bg-cyan-400 text-black hover:bg-cyan-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all disabled:opacity-50"
          >
            {isSending ? "LAUNCHING..." : "FIRE AWAY! 💥"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserEmailModal;
