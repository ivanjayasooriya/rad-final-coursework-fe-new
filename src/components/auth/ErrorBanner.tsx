const ErrorBanner = ({ message }: { message: string }) => (
  <div className="flex items-start gap-3 mb-6 p-4 bg-red-400 border-4 border-black shadow-[4px_4px_0px_0px_#000] transform rotate-[-1deg]">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-black stroke-[3] mt-0.5 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <div>
      <span className="text-xs font-black uppercase bg-black text-white px-1 mr-1">
        ALERT:
      </span>
      <p className="text-xs font-black uppercase text-black inline">
        {message}
      </p>
    </div>
  </div>
);

export default ErrorBanner;
