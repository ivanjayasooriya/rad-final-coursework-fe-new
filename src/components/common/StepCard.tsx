import type React from "react";
import { motion } from "framer-motion";

interface StepCardProps {
  icon: React.ReactNode;
  badgeColor: string;
  stepNumber: string;
  title: string;
  desc: string;
}

/* Comic Block Component for How It Works Section */
const StepCard = ({
  icon,
  badgeColor,
  stepNumber,
  title,
  desc,
}: StepCardProps) => (
  <motion.div
    whileHover={{ y: -8, x: -4, transition: { duration: 0.1 } }}
    className="p-8 bg-white rounded-none border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-left relative transition-all duration-150 flex flex-col justify-between"
  >
    {/* Floating Counter Badge */}
    <div
      className={`absolute -top-5 -left-5 border-4 border-black font-black px-3 py-1 text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${badgeColor}`}
    >
      STAGE {stepNumber}
    </div>

    <div>
      {/* Icon Frame Box */}
      <div className="mb-6 mt-2 w-16 h-16 bg-slate-100 border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-3">
        {icon}
      </div>

      <h4 className="text-2xl font-black uppercase tracking-tight mb-3 text-black">
        {title}
      </h4>

      <p className="text-gray-700 font-bold text-xs leading-relaxed uppercase">
        {desc}
      </p>
    </div>
  </motion.div>
);

export default StepCard;
