import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useAuth } from '../../../hooks';
import axiosInstance from '@/config/axiosClient.js';
import { Rating } from 'react-simple-star-rating';
import moment from 'moment';

const CommentWidget = ({ place }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null); 
  const [editedComment, setEditedComment] = useState(''); 
  const [rating, setRating] = useState(0);
  const { user } = useAuth();
  

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`/binh-luan/lay-binh-luan-theo-phong/${place.id}`);
        setComments(response.data.content);
      } catch (error) {
        console.error("Lỗi khi lấy bình luận:", error);
        toast.error("Comment Error.");
      }
    };

    fetchComments();
  }, [place.id]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  const handleRatingChange = (newRating) => {
    setRating(newRating);
};
  const handlePostComment = async () => {
    if (!user) {
      return toast.error("You must login!");
    }

    if (comment.trim() === "") {
      return toast.error("Comment cannot blank.");
    }

    try {
      const currentTime=moment().format('DD-MM-YYYY HH:mm:ss')
      const response = await axiosInstance.post('/binh-luan', {
        maPhong: place.id,
        maNguoiBinhLuan: user.id,
        // ngayBinhLuan: currentTime,
        noiDung: comment,
        // saoBinhLuan: rating,
      });

      setComments([...comments, response.data.content]);
      setComment('');
      toast.success("Comment Successful!");

    } catch (error) {
      console.log("error: ", error);
      console.error("Comment Error:", error);
      toast.error("Comment Error.");
    }
  };

  const handleEditComment = (c) => {
    setEditingCommentId(c.id);
    setEditedComment(c.noiDung);
  };

  const handleSaveEditComment = async (c) => {
    try {
      await axiosInstance.put(`/binh-luan/${c.id}`, {
        noiDung: editedComment,
      });

      // Cập nhật bình luận trong state
      const updatedComments = comments.map((item) =>
        item.id === c.id ? { ...item, noiDung: editedComment } : item
      );
      setComments(updatedComments);

      setEditingCommentId(null);
      setEditedComment('');
      toast.success("Comment Updated!");
    } catch (error) {
      console.error("Comment Error:", error);
      toast.error("Comment Error.");
    }
  };

  const handleDeleteComment = async (c) => {
    try {
      await axiosInstance.delete(`/binh-luan/${c.id}`);

      // Xóa bình luận khỏi state
      const filteredComments = comments.filter((item) => item.id !== c.id);
      setComments(filteredComments);

      toast.success("Comment Deleted!");
    } catch (error) {
      console.error("Comment Error:", error);
      toast.error("Comment Error");
    }
  };

  return (
    <div className="rounded-2xl bg-white p-4 shadow-xl mt-4">
      <h3 className="text-lg font-semibold mb-2">Comment</h3>

      {comments.length > 0 ? (
        <ul className="space-y-2">
          {comments.map((c) => (
            <li key={c.id} className="border rounded p-2">
              <div className="flex items-center">
                                <div className="font-semibold mr-2">{c.tenNguoiBinhLuan || "Ẩn danh"}</div>
                                {/* <Rating
                                    initialValue={c.saoBinhLuan || 0}
                                    readonly={true}
                                    size={20}
                                /> */}
                            </div>
                            {/* <p className="text-sm text-gray-500">{moment(c.ngayBinhLuan).format('DD/MM/YYYY HH:mm')}</p> */}
              
              {editingCommentId === c.id ? ( 
                <div>
                  <textarea
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                    className="w-full border rounded p-1 resize-none"
                    rows={3}
                  />
                  <button onClick={() => handleSaveEditComment(c)} className="primary mt-2 mr-2">
                    Lưu
                  </button>
                  <button onClick={() => setEditingCommentId(null)} className="secondary mt-2">
                    Hủy
                  </button>
                </div>
              ) : (
                <p>{c.noiDung}</p>
              )}
             
              {user && user.id === c.maNguoiBinhLuan && (
                <div className="mt-2">
                  <button onClick={() => handleEditComment(c)} className="secondary mr-2">
                    Sửa
                  </button>
                  <button onClick={() => handleDeleteComment(c)} className="danger">
                    Xóa
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet. Be the first one!</p>
      )}

      <div className="mt-4 border rounded p-2">
      {/* <Rating
                        initialValue={rating}
                        size={20}
                        onClick={handleRatingChange}
                    /> */}
        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="Write your comment..."
          className="w-full border rounded p-1 resize-none"
          rows={3}
        />
        <button onClick={handlePostComment} className="primary mt-2">
        Post a comment
        </button>
      </div>
    </div>
  );
};

export default CommentWidget;