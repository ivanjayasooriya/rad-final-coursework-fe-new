// Shared comic-style form styling constants for the auth flow.

export const inputCls =
  "w-full px-3.5 py-3 text-xs font-black uppercase border-2 border-black bg-white text-black placeholder:text-black/30 focus:outline-none focus:bg-yellow-50 shadow-[3px_3px_0px_0px_#000] focus:shadow-none transition-all";

export const labelBaseCls =
  "inline-block text-xs font-black text-black uppercase tracking-wider mb-2 border-2 border-black px-2 py-0.5 shadow-[2px_2px_0px_0px_#000]";

// ── STEP INDICATOR PANEL ──────────────────────────────────────────────────────

export const Steps = ({ current }: { current: 1 | 2 | 3 }) => (
  <div className="flex items-center justify-center gap-1 mb-8 transform rotate-[0.5deg]">
    {[
      { n: 1, label: "EMAIL" },
      { n: 2, label: "VERIFY" },
      { n: 3, label: "RESET" },
    ].map(({ n, label }, i) => (
      <div key={n} className="flex items-center gap-1">
        {i > 0 && (
          <div
            className={`h-1 w-6 border-y-2 border-black transition-colors ${
              n <= current ? "bg-black" : "bg-gray-300"
            }`}
          />
        )}
        <div className="flex flex-col items-center gap-1">
          <div
            className={`w-8 h-8 border-2 border-black text-xs font-black flex items-center justify-center transition-all ${
              n < current
                ? "bg-emerald-400 text-black shadow-[2px_2px_0px_0px_#000]"
                : n === current
                  ? "bg-yellow-300 text-black shadow-[3px_3px_0px_0px_#000] scale-105"
                  : "bg-white text-gray-400"
            }`}
          >
            {n < current ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 stroke-[3]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              n
            )}
          </div>
          <span
            className={`text-[9px] font-black tracking-wider ${
              n <= current ? "text-black" : "text-gray-400"
            }`}
          >
            {label}
          </span>
        </div>
      </div>
    ))}
  </div>
);

export const passwordRules = [
  { label: "MINIMUM 8 CHARACTERS", test: (p: string) => p.length >= 8 },
  { label: "ONE UPPERCASE LETTER", test: (p: string) => /[A-Z]/.test(p) },
  { label: "ONE NUMERIC DIGIT", test: (p: string) => /[0-9]/.test(p) },
];
