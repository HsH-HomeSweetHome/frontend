// src/pages/ReviewDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface CommentType {
  id: number;
  text: string;
}

interface ReviewType {
  id: string;
  title: string;
  content: string;
}

const ReviewDetail: React.FC = () => {
  const { id } = useParams();
  const [review, setReview] = useState<ReviewType | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    // 실제 서버에서 review와 comments를 가져온다고 가정
    // 여기서는 더미
    setReview({
      id: id || "",
      title: "이 집 살만한가요?",
      content: "층간소음이 좀 있습니다.",
    });
    setComments([
      { id: 1, text: "저도 같은 문제 겪었어요." },
      { id: 2, text: "벌레는 없나요?" },
    ]);
  }, [id]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // 실제로는 서버에 POST -> 성공 시 setComments([...])
    const newId = Date.now();
    setComments((prev) => [...prev, { id: newId, text: newComment }]);
    setNewComment("");
  };

  if (!review) return <div className="p-4">로딩 중...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-2">{review.title}</h2>
      <p className="mb-4">{review.content}</p>
      <hr className="mb-4" />

      <h3 className="text-xl font-semibold mb-2">댓글</h3>
      <ul className="mb-4 space-y-1">
        {comments.map((comment) => (
          <li key={comment.id} className="border-b py-1 text-sm">
            {comment.text}
          </li>
        ))}
      </ul>

      <form onSubmit={handleCommentSubmit} className="flex space-x-2">
        <input
          type="text"
          className="border flex-grow p-2 text-sm"
          placeholder="댓글을 작성하세요."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-2 rounded text-sm"
        >
          등록
        </button>
      </form>
    </div>
  );
};

export default ReviewDetail;
