interface ProfileAvatarCardProps {
  profilePic: string | null;
  username: string;
  email: string;
  role: string;
  isEditing: boolean;
  uploadingImg: boolean;
  onAvatarClick: () => void;
}

const ProfileAvatarCard = ({
  profilePic,
  username,
  email,
  role,
  isEditing,
  uploadingImg,
  onAvatarClick,
}: ProfileAvatarCardProps) => (
  <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col sm:flex-row items-center justify-center gap-8 text-center sm:text-left">
    {/* Avatar Thumbnail Wrapper */}
    <div
      onClick={onAvatarClick}
      className={`w-40 h-40 sm:w-48 sm:h-48 border-4 border-black bg-cyan-300 flex items-center justify-center text-6xl sm:text-7xl font-black text-black shrink-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] select-none uppercase relative overflow-visible ${
        isEditing ? "cursor-pointer hover:bg-cyan-200 group" : ""
      }`}
    >
      {uploadingImg ? (
        <span className="text-sm font-black animate-pulse tracking-tighter">
          UPLOADING...
        </span>
      ) : profilePic ? (
        <img
          src={profilePic}
          alt="Profile Thumbnail"
          className="w-full h-full object-cover"
        />
      ) : username ? (
        username[0]
      ) : (
        "?"
      )}

      {/* Hover overlay for edit indicator */}
      {isEditing && !uploadingImg && (
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <span className="text-white text-xs font-black bg-black border-2 border-white px-2 py-1 uppercase tracking-tight scale-90 group-hover:scale-100 transition-transform">
            Change Pic
          </span>
        </div>
      )}

      {/* Neo-brutalist Role Badge */}
      <div className="absolute -bottom-3 -right-3 bg-red-500 border-2 border-black text-white px-2 py-0.5 text-xs font-black uppercase tracking-tight rotate-12 shadow-[2px_2px_0px_#000]">
        {role}
      </div>
    </div>

    {/* Account Identity Labels */}
    <div className="flex-1 w-full space-y-3">
      <div className="bg-yellow-300 border-2 border-black p-2 font-black text-xl sm:text-2xl truncate text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
        {username || "—"}
      </div>
      <div className="bg-gray-100 border-2 border-black p-2 font-bold text-sm sm:text-md truncate text-gray-700">
        {email || "—"}
      </div>
    </div>
  </div>
);

export default ProfileAvatarCard;
