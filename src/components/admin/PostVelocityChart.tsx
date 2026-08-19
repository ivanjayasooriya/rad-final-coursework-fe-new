interface VelocityMetric {
  month: string;
  percentageHeight: string; // e.g., "40%"
}

const PostVelocityChart = ({ velocity }: { velocity: VelocityMetric[] }) => (
  <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
    <h3 className="text-lg font-black uppercase bg-black text-yellow-300 px-3 py-1 border-2 border-black inline-block mb-6">
      📈 Bulletin Generation Velocity
    </h3>
    <div className="h-48 flex items-end gap-3 border-b-4 border-l-4 border-black p-2 bg-slate-50">
      {velocity.map((v, i) => (
        <div
          key={i}
          className="bg-purple-400 border-2 border-black w-full"
          style={{ height: v.percentageHeight }}
          title={`${v.month} Metric`}
        ></div>
      ))}
    </div>
    <div className="flex justify-between text-[10px] font-mono font-black uppercase mt-2 px-1 text-gray-500">
      {velocity.map((v, i) => (
        <span key={i}>{v.month}</span>
      ))}
    </div>
  </div>
);

export default PostVelocityChart;
