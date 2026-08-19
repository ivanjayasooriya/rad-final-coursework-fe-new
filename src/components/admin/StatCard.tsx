interface StatCardProps {
  label: string;
  value: number;
  tag: string;
  bgClass?: string;
  rotateClass?: string;
  tagBgClass?: string;
  tagTextClass?: string;
  labelTextClass?: string;
}

const StatCard = ({
  label,
  value,
  tag,
  bgClass = "bg-white",
  rotateClass = "",
  tagBgClass = "bg-white",
  tagTextClass = "text-black",
  labelTextClass = "text-gray-500",
}: StatCardProps) => (
  <div
    className={`border-4 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between ${bgClass} ${rotateClass}`}
  >
    <p
      className={`text-xs font-black uppercase tracking-wider ${labelTextClass}`}
    >
      {label}
    </p>
    <p className="text-4xl font-black text-black mt-2">{value}</p>
    <span
      className={`text-[10px] font-mono border border-black px-1.5 py-0.5 mt-4 self-start font-black ${tagBgClass} ${tagTextClass}`}
    >
      {tag}
    </span>
  </div>
);

export default StatCard;
