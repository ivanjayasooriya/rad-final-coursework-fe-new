import { useEffect, useState } from "react";
// Added getFlyer to the service imports
import { getMyPosts, deletePost, getFlyer } from "../../service/post";
import { alert } from "../../utils/alerts";

import type { PetPost } from "../../types/post";
import MyPostDetailModal from "../../components/post/MyPostDetailModal";
import MyPostDeleteModal from "../../components/post/MyPostDeleteModal";
import UpdatePostModal from "../../components/post/UpdatePostModal";



// ── My Posts Page ─────────────────────────────────────────────────────────────
const MyPostsPage = () => {
  const [posts, setPosts] = useState<PetPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PetPost[]>([]);
  const [page, setPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [selectedPost, setSelectedPost] = useState<PetPost | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [postToUpdate, setPostToUpdate] = useState<PetPost | null>(null);
  const [postToDelete, setPostToDelete] = useState<PetPost | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filter States
  const [statusFilter, setStatusFilter] = useState<"ALL" | "LOST" | "FOUND">(
    "ALL",
  );

  const fetchData = async (pageNumber = 1) => {
    setIsLoading(true);
    try {
      const res = await getMyPosts(pageNumber, 6);
      setPosts(res?.data || []);
      setPage(pageNumber);
      setTotalPageCount(res?.pagination.totalPages || 0);
    } catch (error: any) {
      const msg = error.response?.data?.message || "Something went wrong!";
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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (statusFilter === "ALL") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter((p) => p.status === statusFilter));
    }
  }, [posts, statusFilter]);

  const handleDelete = async () => {
    if (!postToDelete) return;
    setIsDeleting(true);
    try {
      await deletePost(postToDelete._id);
      setPostToDelete(null);
      fetchData(page);

      alert.fire({
        title: "Post deleted successfully",
        icon: "success",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (error: any) {
      const msg = error.response?.data?.message || "Something went wrong!";
      alert.fire({
        title: "ERROR!",
        text: `${msg}`,
        icon: "error",
        confirmButtonText: "Fix it",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // ── Flyer Stream Trigger Handler ───────────────────────────────────────────
  const handleGenerateFlyer = async (postId: string) => {
    try {
      // Calls your post.ts service function with the postId parameter
      await getFlyer(postId);
    } catch (error) {
      console.error("Failed to route to flyer generator view:", error);
      alert.fire({
        title: "ERROR!",
        text: "Failed to route to flyer generator view",
        icon: "error",
        confirmButtonText: "Fix it",
      });
    }
  };

  useEffect(() => {
    document.body.style.overflow =
      selectedPost || postToUpdate || postToDelete ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedPost, postToUpdate, postToDelete]);

  return (
    <div className="min-h-screen bg-yellow-50/40 font-sans antialiased text-gray-900 pb-24">
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-4 border-black bg-cyan-300 p-4 rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black uppercase tracking-tight text-black bg-white px-3 py-1 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
              My Reports Container
            </h1>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <span className="text-xs font-black uppercase text-black hidden md:inline">
              Filter Box:
            </span>
            <div className="grid grid-cols-3 border-2 border-black rounded-lg overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-white w-full sm:w-auto">
              {(["ALL", "LOST", "FOUND"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-1.5 text-xs font-black uppercase transition-colors tracking-wider ${
                    statusFilter === status
                      ? "bg-yellow-400 text-black border-r-0 last:border-r-0"
                      : "bg-white hover:bg-gray-100 text-gray-700 border-r-2 border-black last:border-r-0"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-4">
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border-4 border-black rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-pulse"
              >
                <div className="bg-gray-300 aspect-video w-full border-b-4 border-black" />
                <div className="p-4 flex flex-col gap-3">
                  <div className="h-5 bg-gray-300 rounded w-2/3 border border-black" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 border border-black" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 border border-black" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && filteredPosts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center border-4 border-dashed border-black rounded-2xl bg-white p-8 max-w-xl mx-auto shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mt-8">
            <div className="w-16 h-16 bg-rose-300 border-2 border-black rounded-xl flex items-center justify-center mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p className="text-xl font-black uppercase tracking-tight text-black">
              No matching records found!
            </p>
            <p className="text-sm text-gray-700 font-bold mt-1">
              You haven't added anything matching this filter criteria yet.
            </p>
          </div>
        )}

        {!isLoading && filteredPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post: PetPost, index) => {
              const isLost = post.status === "LOST";
              return (
                <div
                  key={post._id || index}
                  className="group relative bg-white border-4 border-black rounded-xl overflow-hidden flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-200 cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  {/* Action Buttons Row Panel */}
                  <div className="absolute top-3 right-3 z-10 flex gap-2">
                    {/* NEW: Flyer Render Action Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents details modal layout from firing
                        handleGenerateFlyer(post._id);
                      }}
                      className="flex items-center justify-center bg-purple-300 hover:bg-purple-400 text-black border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] p-2 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                      title="Generate Professional PDF Flyer"
                      aria-label="Generate flyer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPostToUpdate(post);
                      }}
                      className="flex items-center justify-center bg-yellow-300 hover:bg-yellow-400 text-black border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] p-2 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                      aria-label="Update post"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPostToDelete(post);
                      }}
                      className="flex items-center justify-center bg-rose-400 hover:bg-rose-500 text-black border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] p-2 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                      aria-label="Delete post"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="relative bg-amber-50 aspect-video w-full overflow-hidden border-b-4 border-black">
                    <img
                      src={
                        post.imageURL ||
                        "https://via.placeholder.com/400x225?text=No+Image"
                      }
                      alt={post.petName || "Pet"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span
                      className={`absolute bottom-3 left-3 text-xs font-black tracking-widest uppercase px-3 py-1 border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
                        isLost
                          ? "bg-rose-400 text-black"
                          : "bg-emerald-400 text-black"
                      }`}
                    >
                      {post.status || "N/A"}
                    </span>
                    {post.reward && (
                      <span className="absolute top-3 left-3 text-xs font-black bg-amber-400 text-black px-2.5 py-1 border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                        🏆 ${post.reward}
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex flex-col gap-2.5 bg-white flex-grow">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-xl font-black text-black uppercase tracking-tight truncate max-w-[75%]">
                        {post.petName || "Unnamed Pet"}
                      </h2>
                      <span className="text-[11px] font-mono font-bold bg-gray-100 text-gray-800 border border-black px-1.5 py-0.5 rounded shrink-0">
                        #{(post._id || index).toString().slice(-6)}
                      </span>
                    </div>

                    <p className="text-sm font-bold text-gray-700 truncate">
                      <span className="text-black uppercase">
                        {post.breed || "Unknown breed"}
                      </span>
                      {post.color ? ` · ${post.color}` : ""}
                    </p>

                    <div className="border-t-2 border-dashed border-gray-200 my-1" />

                    <p className="text-xs font-bold text-gray-600 truncate flex items-center gap-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 text-black shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {post.lastSeenLocation || "Location unknown"}
                    </p>

                    <p className="text-xs font-medium text-gray-500">
                      {post.lastSeenDate
                        ? new Date(post.lastSeenDate).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric", year: "numeric" },
                          )
                        : "Date unknown"}
                    </p>

                    <p className="text-xs text-blue-600 font-black uppercase tracking-wider mt-2 group-hover:text-amber-500 transition-colors">
                      Inspect Report Box ➜
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!isLoading && totalPageCount > 1 && (
          <div className="flex items-center justify-center gap-3 mt-12">
            <button
              onClick={() => fetchData(page - 1)}
              disabled={page <= 1}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-black uppercase border-2 border-black rounded-lg bg-white hover:bg-gray-100 disabled:opacity-40 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPageCount }, (_, i) => i + 1).map(
                (p) => (
                  <button
                    key={p}
                    onClick={() => fetchData(p)}
                    className={`w-9 h-9 text-xs font-black uppercase border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all ${
                      p === page
                        ? "bg-yellow-400 text-black transform -rotate-3 scale-105"
                        : "bg-white text-black hover:bg-gray-100"
                    }`}
                  >
                    {p}
                  </button>
                ),
              )}
            </div>

            <button
              onClick={() => fetchData(page + 1)}
              disabled={page >= totalPageCount}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-black uppercase border-2 border-black rounded-lg bg-white hover:bg-gray-100 disabled:opacity-40 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {selectedPost && (
        <MyPostDetailModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}

      {postToUpdate && (
        <UpdatePostModal
          post={postToUpdate}
          onClose={() => {
            setPostToUpdate(null);
            fetchData(page);
          }}
        />
      )}

      {postToDelete && (
        <MyPostDeleteModal
          post={postToDelete}
          onConfirm={handleDelete}
          onCancel={() => setPostToDelete(null)}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
};

export default MyPostsPage;
