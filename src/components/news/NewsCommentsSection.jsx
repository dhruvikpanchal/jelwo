import { useState, useRef } from "react";
import { MessageSquare, Reply, Trash2, CheckCircle2, CornerDownRight } from "lucide-react";
import { INITIAL_COMMENTS } from "@/data/newsComments";
import Reveal from "@/components/animation/Reveal";
import Stagger, { StaggerItem } from "@/components/animation/Stagger";

// Helper function to get initials for avatar
const getInitials = (name = "") => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// Helper function to load stored comments safely
const getStoredComments = (slug) => {
  if (typeof window === "undefined") return INITIAL_COMMENTS[slug] || [];
  try {
    const key = `jelwo_news_comments_${slug || "default"}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
    const seeds = INITIAL_COMMENTS[slug] || [];
    if (seeds.length > 0) {
      localStorage.setItem(key, JSON.stringify(seeds));
    }
    return seeds;
  } catch {
    return INITIAL_COMMENTS[slug] || [];
  }
};

// Helper function to load remembered user info safely
const getStoredUserInfo = () => {
  if (typeof window === "undefined") return { name: "", email: "", message: "" };
  try {
    const savedUser = localStorage.getItem("jelwo_comment_user_info");
    if (savedUser) {
      const { name, email } = JSON.parse(savedUser);
      return {
        name: name || "",
        email: email || "",
        message: "",
      };
    }
  } catch {
    // fallback
  }
  return { name: "", email: "", message: "" };
};

export default function NewsCommentsSection({ currentArticle, onCommentCountChange }) {
  const storageKey = `jelwo_news_comments_${currentArticle.slug || currentArticle.id || "default"}`;

  const [formData, setFormData] = useState(getStoredUserInfo);
  const [saveInfo, setSaveInfo] = useState(true);
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const [comments, setComments] = useState(() => getStoredComments(currentArticle.slug));
  const [prevSlug, setPrevSlug] = useState(currentArticle.slug);
  const [replyingTo, setReplyingTo] = useState(null);
  const messageInputRef = useRef(null);

  // Sync comments & reset reply when active article changes
  if (prevSlug !== currentArticle.slug) {
    setPrevSlug(currentArticle.slug);
    const newComments = getStoredComments(currentArticle.slug);
    setComments(newComments);
    setReplyingTo(null);
    onCommentCountChange?.(newComments.length);
  }

  // Submit comment handler
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim())
      return;

    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    const formattedTime = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const newComment = {
      id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
      date: formattedDate,
      time: formattedTime,
      timestamp: Date.now(),
      replyTo: replyingTo ? replyingTo.name : null,
      isUserAdded: true,
      avatarColor: "bg-[#fcf5f2] text-[#ca7b64] border-[#ca7b64]/40",
    };

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    onCommentCountChange?.(updatedComments.length);

    // Save to localStorage
    try {
      localStorage.setItem(storageKey, JSON.stringify(updatedComments));
      if (saveInfo) {
        localStorage.setItem(
          "jelwo_comment_user_info",
          JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
          })
        );
      }
    } catch (err) {
      console.error("Failed to save comment to localStorage:", err);
    }

    setCommentSubmitted(true);
    setFormData((prev) => ({
      ...prev,
      message: "",
      name: saveInfo ? prev.name : "",
      email: saveInfo ? prev.email : "",
    }));
    setReplyingTo(null);

    setTimeout(() => {
      setCommentSubmitted(false);
    }, 5000);
  };

  // Delete user-added comment
  const handleDeleteComment = (commentId) => {
    const updated = comments.filter((c) => c.id !== commentId);
    setComments(updated);
    onCommentCountChange?.(updated.length);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to update localStorage after deletion:", err);
    }
  };

  // Start reply to a specific comment
  const handleReplyClick = (comment) => {
    setReplyingTo(comment);
    setFormData((prev) => ({
      ...prev,
      message: prev.message.startsWith(`@${comment.name} `)
        ? prev.message
        : `@${comment.name} ${prev.message}`,
    }));
    if (messageInputRef.current) {
      messageInputRef.current.focus();
      messageInputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <>
      {/* ======================================================== */}
      {/* COMMENTS DISPLAY SECTION                                 */}
      {/* ======================================================== */}
      <section className="mt-14 sm:mt-18 pt-8 border-t border-[#e5e5e5]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <h2 className="font-serif text-2xl sm:text-[26px] text-[#1c1b1b] font-normal tracking-tight">
              Comments
            </h2>
            <span className="inline-flex items-center justify-center px-2.5 py-0.5 text-xs font-medium bg-[#faf7f2] text-[#ca7b64] border border-[#e5e5e5]">
              {comments.length}
            </span>
          </div>
          <span className="text-xs text-[#717171]">
            {comments.length === 1 ? "1 discussion" : `${comments.length} discussions`}
          </span>
        </div>

        {/* Comment List */}
        {comments.length === 0 ? (
          <div className="p-8 sm:p-10 bg-[#faf7f2] border border-[#e5e5e5] text-center my-6">
            <MessageSquare className="w-8 h-8 text-[#ca7b64]/60 mx-auto mb-3" />
            <p className="font-serif text-lg text-[#1c1b1b] mb-1">
              No comments yet
            </p>
            <p className="text-xs sm:text-[13px] text-[#717171]">
              Be the first to share your thoughts on this story below.
            </p>
          </div>
        ) : (
          <Stagger staggerDelay={0.06} className="space-y-6 sm:space-y-8 mb-12">
            {comments.map((comment) => (
              <StaggerItem key={comment.id} direction="up" distance={16}>
                <div
                  className="p-5 sm:p-6 bg-white border border-[#e8e4df] hover:border-[#ca7b64]/40 transition-all duration-300 relative group"
                >
                  {/* Header: User Avatar + Name + Date + Action Buttons */}
                  <div className="flex items-start justify-between gap-3 mb-3.5">
                    <div className="flex items-center gap-3.5">
                      {/* Avatar */}
                      <div
                        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-serif text-sm font-semibold border shrink-0 select-none shadow-2xs ${
                          comment.avatarColor || "bg-[#faf7f2] text-[#ca7b64] border-[#ca7b64]/30"
                        }`}
                      >
                        {getInitials(comment.name)}
                      </div>

                      {/* Name and Date */}
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-serif text-sm sm:text-base font-medium text-[#1c1b1b] leading-tight">
                            {comment.name}
                          </h3>
                          {comment.isUserAdded && (
                            <span className="inline-block text-[10px] uppercase font-semibold tracking-wider text-[#ca7b64] bg-[#ca7b64]/10 px-2 py-0.5 rounded-xs">
                              You
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] sm:text-xs text-[#8c8c8c] flex items-center gap-1.5 mt-0.5">
                          <span>{comment.date}</span>
                          {comment.time && (
                            <>
                              <span>•</span>
                              <span>{comment.time}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions: Reply & Delete (if user added) */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleReplyClick(comment)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#717171] hover:text-[#ca7b64] px-2.5 py-1 border border-transparent hover:border-[#e5e5e5] bg-transparent hover:bg-[#faf7f2] transition-colors cursor-pointer"
                        title={`Reply to ${comment.name}`}
                      >
                        <Reply className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Reply</span>
                      </button>

                      {comment.isUserAdded && (
                        <button
                          type="button"
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-xs text-[#999999] hover:text-red-600 p-1 transition-colors cursor-pointer"
                          title="Remove your comment"
                          aria-label="Delete comment"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Reply To Reference Banner */}
                  {comment.replyTo && (
                    <div className="mb-2.5 inline-flex items-center gap-1.5 text-xs text-[#ca7b64] bg-[#faf7f2] px-2.5 py-1 border-l-2 border-[#ca7b64]">
                      <CornerDownRight className="w-3 h-3" />
                      <span>In reply to <strong className="font-medium">{comment.replyTo}</strong></span>
                    </div>
                  )}

                  {/* Message Content */}
                  <p className="text-xs sm:text-[13.5px] text-[#4a4a4a] leading-relaxed font-normal whitespace-pre-line pl-0 sm:pl-13.5">
                    {comment.message}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </section>

      {/* ======================================================== */}
      {/* LEAVE A COMMENT / MESSAGE FORM                            */}
      {/* ======================================================== */}
      <Reveal direction="up" delay={0.08}>
        <div className="mt-8 pt-8 border-t border-[#e5e5e5]">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-serif text-2xl text-[#1c1b1b] font-normal">
              Leave a comment
            </h2>
          {replyingTo && (
            <button
              type="button"
              onClick={() => {
                setReplyingTo(null);
                setFormData((prev) => ({
                  ...prev,
                  message: prev.message.replace(`@${replyingTo.name} `, ""),
                }));
              }}
              className="text-xs text-[#ca7b64] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>Cancel reply to @{replyingTo.name}</span>
              <span>✕</span>
            </button>
          )}
        </div>

        <p className="text-xs sm:text-[13px] text-[#717171] mb-6 font-normal">
          Your email address will not be published. Required fields are marked <span className="text-[#ca7b64]">*</span>
        </p>

        {commentSubmitted && (
          <div className="mb-6 p-4 bg-[#f4f9f4] border border-[#b8dfb8] text-[#2d662d] text-xs sm:text-sm flex items-center gap-3 animate-in fade-in duration-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              Thank you! Your comment has been posted and saved successfully.
            </span>
          </div>
        )}

        <form onSubmit={handleCommentSubmit} className="space-y-5 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {/* Name Input */}
            <div>
              <label
                htmlFor="comment-name"
                className="block text-xs sm:text-[13px] text-[#1c1b1b] mb-2 font-medium"
              >
                Name <span className="text-[#ca7b64]">*</span>
              </label>
              <input
                id="comment-name"
                name="name"
                autoComplete="name"
                type="text"
                required
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 border border-[#e5e5e5] text-xs sm:text-sm text-[#1c1b1b] placeholder:text-[#999999] outline-none focus:border-[#ca7b64] transition-colors rounded-none bg-white font-normal"
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="comment-email"
                className="block text-xs sm:text-[13px] text-[#1c1b1b] mb-2 font-medium"
              >
                Email address <span className="text-[#ca7b64]">*</span>
              </label>
              <input
                id="comment-email"
                name="email"
                autoComplete="email"
                type="email"
                required
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 border border-[#e5e5e5] text-xs sm:text-sm text-[#1c1b1b] placeholder:text-[#999999] outline-none focus:border-[#ca7b64] transition-colors rounded-none bg-white font-normal"
              />
            </div>
          </div>

          {/* Message Input */}
          <div>
            <label
              htmlFor="comment-message"
              className="block text-xs sm:text-[13px] text-[#1c1b1b] mb-2 font-medium"
            >
              Message <span className="text-[#ca7b64]">*</span>
            </label>
            <textarea
              id="comment-message"
              name="message"
              ref={messageInputRef}
              rows="6"
              required
              placeholder="Write your thoughts or feedback here..."
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full px-4 py-3 border border-[#e5e5e5] text-xs sm:text-sm text-[#1c1b1b] placeholder:text-[#999999] outline-none focus:border-[#ca7b64] transition-colors rounded-none resize-none bg-white font-normal"
            />
          </div>

          {/* Save Info Checkbox */}
          <div className="flex items-center gap-2.5 pt-1">
            <input
              id="save-user-info"
              name="save_info"
              type="checkbox"
              checked={saveInfo}
              onChange={(e) => setSaveInfo(e.target.checked)}
              className="w-4 h-4 accent-[#ca7b64] rounded-none cursor-pointer"
            />
            <label
              htmlFor="save-user-info"
              className="text-xs text-[#717171] cursor-pointer select-none"
            >
              Save my name and email in this browser for the next time I comment.
            </label>
          </div>

          {/* Post Comment Button */}
          <div>
            <button
              type="submit"
              className="bg-[#ca7b64] hover:bg-[#1c1b1b] text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 transition-colors duration-300 rounded-none cursor-pointer shadow-2xs hover:shadow-sm"
            >
              POST COMMENT
            </button>
          </div>
        </form>
      </div>
      </Reveal>
    </>
  );
}
