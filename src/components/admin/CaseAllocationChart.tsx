interface CaseAllocation {
  lostPetPercentage: number;
  foundPetPercentage: number;
}

const CaseAllocationChart = ({
  allocations,
}: {
  allocations: CaseAllocation;
}) => (
  <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
    <h3 className="text-lg font-black uppercase bg-black text-cyan-300 px-3 py-1 border-2 border-black inline-block mb-6">
      ⚖️ Operational Case Allocations
    </h3>
    <div className="space-y-4 pt-2">
      <div>
        <div className="flex justify-between text-xs font-black uppercase mb-1">
          <span>🔴 Lost Pet Signals</span>
          <span>{allocations.lostPetPercentage}%</span>
        </div>
        <div className="w-full bg-gray-100 border-2 border-black h-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <div
            className="bg-red-400 h-full border-r-2 border-black"
            style={{ width: `${allocations.lostPetPercentage}%` }}
          ></div>
        </div>
      </div>
      <div>
        <div className="flex justify-between text-xs font-black uppercase mb-1">
          <span>🟢 Found Pet Clearances</span>
          <span>{allocations.foundPetPercentage}%</span>
        </div>
        <div className="w-full bg-gray-100 border-2 border-black h-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <div
            className="bg-emerald-400 h-full border-r-2 border-black"
            style={{ width: `${allocations.foundPetPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  </div>
);

export default CaseAllocationChart;
