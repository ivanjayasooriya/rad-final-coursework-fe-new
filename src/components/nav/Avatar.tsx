import { useState } from "react";

const Avatar = ({ src, username }: { src?: string; username?: string }) => {
  const [imgError, setImgError] = useState(false);
  const initial = username?.[0]?.toUpperCase() ?? "?";

  if (src && !imgError) {
    return (
      <img
        src={src}
        alt={username ?? "Profile"}
        onError={() => setImgError(true)}
        className="w-10 h-10 rounded-none object-cover border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-white"
      />
    );
  }

  // Placeholder — Hard high-contrast comic fill
  return (
    <div className="w-10 h-10 rounded-none bg-yellow-400 flex items-center justify-center text-sm font-black text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] select-none uppercase tracking-tighter">
      {initial}
    </div>
  );
};

export default Avatar;
