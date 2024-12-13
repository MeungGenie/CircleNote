import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './StudyPostDetail.css';

function StudyPostDetail() {
    const { studyRoomId, postId } = useParams();
    const { authToken, userRole } = useAuth();
    const [post, setPost] = useState(null);
    const [commentContent, setCommentContent] = useState('');
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/study/${studyRoomId}/posts/${postId}`, {
                    headers: { Authorization: `Bearer ${authToken}` },
                });
                const data = await response.json();
                setPost(data);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };
        fetchPost();
    }, [studyRoomId, postId]);

    const handleAddComment = async () => {
        const response = await fetch(`http://localhost:5001/api/study/${studyRoomId}/posts/${postId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({ content: commentContent }),
        });
        const data = await response.json();
        setPost({ ...post, comments: [...post.comments, data.comment] });
        setCommentContent('');
    };

    const handleDeleteComment = async (commentId) => {
        if (!commentId) return; // Avoid invalid API calls
    
        const response = await fetch(
            `http://localhost:5001/api/study/${studyRoomId}/posts/${postId}/comments/${commentId}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }
        );
        const data = await response.json();
        if (response.ok) {
            setPost({
                ...post,
                comments: post.comments.filter((comment) => comment._id !== commentId),
            });
        }
    };
    
    

    return post ? (
        <div className="study-post-detail-container">
            <h1>{post.title}</h1>
            <div className="study-post-content-container">
                <div className="post-content-container">
                    {post.content.split('\n').map((line, index) => (
                        <p key={index} style={{ margin: '0 0 10px 0' }}>{line}</p>
                    ))}
                </div>
                <div class="separator"></div>
                <div className="post-comments-container">
                    <h3>댓글</h3>
                    <div className="comment-scroll">
                        {post.comments.map((comment) => (
                            <div key={comment._id} className='comment-button-container'>
                            <p><strong>{comment.author.name}</strong>: {comment.content}</p>
                            {comment.author._id === userRole._id && (
                                <button onClick={() => handleDeleteComment(comment._id)} className="comment-delete-button"></button>
                            )}
                            </div>
                        ))}
                    </div>
                    <div className="comment-button-container"> 
                        <textarea value={commentContent} onChange={(e) => setCommentContent(e.target.value)} className='comment-input'/>
                        <button onClick={handleAddComment} className='comment-button'>작성</button>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <p>Loading...</p>
    );
}

export default StudyPostDetail;
