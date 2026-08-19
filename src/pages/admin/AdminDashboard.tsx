import React, { useEffect, useState } from "react";
import {
  allUsers,
  getDashboardSummary,
  getPostVelocityMetrics,
  getCaseAllocations,
} from "../../service/admin";
import { alert } from "../../utils/alerts";
import StatCard from "../../components/admin/StatCard";
import PostVelocityChart from "../../components/admin/PostVelocityChart";
import CaseAllocationChart from "../../components/admin/CaseAllocationChart";
import UsersRegistryTable from "../../components/admin/UsersRegistryTable";

interface DashboardSummary {
  totalUsers: number;
  totalPosts: number;
  totalBookmarks: number;
  pendingApprovals: number;
}

interface UserProfile {
  _id: string;
  username: string;
  email: string;
  roles: string[] | string;
  approved: boolean;
  createdAt?: string;
}

interface VelocityMetric {
  month: string;
  percentageHeight: string; // e.g., "40%"
}

interface CaseAllocation {
  lostPetPercentage: number;
  foundPetPercentage: number;
}

const AdminDashboard: React.FC = () => {
  const [summary, setSummary] = useState<DashboardSummary>({
    totalUsers: 0,
    totalPosts: 0,
    totalBookmarks: 0,
    pendingApprovals: 0,
  });
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [velocity, setVelocity] = useState<VelocityMetric[]>([]);
  const [allocations, setAllocations] = useState<CaseAllocation>({
    lostPetPercentage: 50, // balanced defaults fallback
    foundPetPercentage: 50,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const executeLoadSequence = async () => {
      setIsLoading(true);
      try {
        // Executing all real platform data streams concurrently
        const [usersRes, summaryRes, velocityRes, allocationRes] =
          await Promise.all([
            allUsers(),
            getDashboardSummary(),
            getPostVelocityMetrics(),
            getCaseAllocations(),
          ]);

        // Process User Records
        const records = Array.isArray(usersRes)
          ? usersRes
          : usersRes?.data || [];
        setUsers(records);

        // Process Real Summary Metrics
        if (summaryRes) setSummary(summaryRes);

        // Process Real Graph Visualizations
        if (Array.isArray(velocityRes)) setVelocity(velocityRes);
        if (allocationRes) setAllocations(allocationRes);
      } catch (err: any) {
        console.error(
          "Dashboard mainframe initialization failure sequence caught:",
          err,
        );

        const msg = err.response?.data?.message || "Something went wrong!";
        alert.fire({
          title: "ERROR!",
          text: `${msg}`,
          icon: "error",
          confirmButtonText: "Fix it",
        });
      } finally {
        setIsLoading(false);
      }
    };

    executeLoadSequence();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-amber-50 p-8 flex items-center justify-center font-mono">
        <div className="text-xl font-black uppercase border-4 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-pulse">
          ⚡ EXECUTING DATA PIPELINE INGESTION... ⚡
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 font-sans antialiased text-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* HEADER SECTION */}
        <div className="bg-purple-400 border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative transform rotate-[-0.2deg]">
          <div className="absolute top-0 right-0 bg-black text-white text-xs font-black px-4 py-1 uppercase tracking-widest border-b-4 border-l-4 border-black">
            MAINFRAME STATUS: ACTIVE
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-black drop-shadow-[2px_2px_0px_rgba(255,255,255,1)]">
            📊 CENTRAL INTEL DASHBOARD
          </h1>
          <p className="text-sm font-bold text-black mt-1">
            System metrics, platform databases, and diagnostic tracking
            telemetry parameters.
          </p>
        </div>

        {/* METRICS GRID SUMMARY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="Total Registered Agents"
            value={summary.totalUsers}
            tag="SYS_USER_DB"
            tagBgClass="bg-purple-100"
          />
          <StatCard
            label="Active Bulletins (Posts)"
            value={summary.totalPosts}
            tag="SYS_POST_DB"
            bgClass="bg-cyan-300"
            rotateClass="transform rotate-[0.5deg]"
            labelTextClass="text-black"
          />
          <StatCard
            label="Total Bookmarks Linked"
            value={summary.totalBookmarks}
            tag="SYS_BKMK_DB"
            bgClass="bg-yellow-300"
            labelTextClass="text-black"
          />
          <StatCard
            label="Awaiting Authorization"
            value={summary.pendingApprovals}
            tag="AUTH_QUEUE"
            bgClass={
              summary.pendingApprovals > 0
                ? "bg-red-400 animate-pulse"
                : "bg-emerald-400"
            }
            rotateClass="transform rotate-[-0.5deg]"
            labelTextClass="text-black"
            tagBgClass="bg-black"
            tagTextClass="text-white"
          />
        </div>

        {/* VISUAL GRAPH REPRESENTATIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PostVelocityChart velocity={velocity} />
          <CaseAllocationChart allocations={allocations} />
        </div>

        {/* USER RECORD REGISTRY */}
        <UsersRegistryTable users={users} />
      </div>
    </div>
  );
};

export default AdminDashboard;
