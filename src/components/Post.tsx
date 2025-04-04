"use client";

import { Card, CardHeader, CardMedia, CardActions, CardContent, TextField, IconButton, Box, Typography, Avatar, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    name: string | null;
    image: string | null;
  };
}

interface PostProps {
  id: string;
  username: string;
  profilePicture?: string;
  imageUrl: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

export default function Post({ id, username, profilePicture, imageUrl, likes, comments, isLiked }: PostProps) {
  const { data: session } = useSession();
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const [commentCount, setCommentCount] = useState(comments);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [openCommentsDialog, setOpenCommentsDialog] = useState(false);

  const fetchLikeStatus = useCallback(async () => {
    try {
      const response = await fetch(`/api/posts/${id}/like/status`);
      const data = await response.json();
      setLiked(data.isLiked);
      setLikeCount(data.likeCount);
    } catch (error) {
      console.error('Error fetching like status:', error);
    }
  }, [id]);

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(`/api/posts/${id}/comments`);
      const data = await response.json();
      setPostComments(data);
      setCommentCount(data.length);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchComments();
    fetchLikeStatus();
  }, [fetchComments, fetchLikeStatus]);

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/posts/${id}/like`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setLiked(data.liked);
      setLikeCount(data.likeCount);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await fetch(`/api/posts/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newComment }),
      });
      const data = await response.json();
      setPostComments(prev => [data, ...prev]);
      setCommentCount(prev => prev + 1);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
      });
      setPostComments(prev => prev.filter(comment => comment.id !== commentId));
      setCommentCount(prev => prev - 1);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: 600, mb: 3, mx: 'auto' }}>
        <CardHeader
          avatar={
            <Avatar 
              src={profilePicture} 
              alt={username}
              sx={{ width: 32, height: 32 }}
            />
          }
          title={
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {username}
            </Typography>
          }
        />
        <CardMedia
          component="img"
          image={imageUrl}
          alt="Post image"
          sx={{ 
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            aspectRatio: '1/1'
          }}
        />
        <CardActions disableSpacing>
          <Box sx={{ 
            display: 'flex', 
            gap: 1,
            width: '100%',
            justifyContent: 'space-between'
          }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton onClick={handleLike} color={liked ? 'error' : 'default'}>
                {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
              <IconButton onClick={() => setOpenCommentsDialog(true)}>
                <ChatBubbleOutlineIcon />
              </IconButton>
            </Box>
            <IconButton>
              <BookmarkBorderIcon />
            </IconButton>
          </Box>
        </CardActions>
        <CardContent>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
            {likeCount} páči sa používateľom
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {postComments.slice(0, 2).map((comment) => (
                <Box key={comment.id} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <Avatar
                    src={comment.user.image || undefined}
                    alt={comment.user.name || 'User'}
                    sx={{ width: 24, height: 24 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" component="span" sx={{ fontWeight: 'bold' }}>
                      {comment.user.name}
                    </Typography>
                    <Typography variant="body2" component="span" sx={{ ml: 0.5 }}>
                      {comment.content}
                    </Typography>
                  </Box>
                  {session?.user?.email && comment.user.name === session.user.name && (
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteComment(comment.id)}
                      sx={{ ml: 'auto' }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              ))}
            </Box>
            {commentCount > 2 && (
              <Button
                onClick={() => setOpenCommentsDialog(true)}
                sx={{ 
                  textTransform: 'none',
                  color: 'text.secondary',
                  p: 0,
                  mt: 1,
                  '&:hover': {
                    backgroundColor: 'transparent',
                  }
                }}
              >
                Zobraziť všetky komentáre ({commentCount})
              </Button>
            )}
            <form onSubmit={handleAddComment} style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Pridať komentár..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                sx={{ flex: 1 }}
              />
              <IconButton type="submit" color="primary">
                <SendIcon />
              </IconButton>
            </form>
          </Box>
        </CardContent>
      </Card>

      <Dialog 
        open={openCommentsDialog} 
        onClose={() => setOpenCommentsDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6">Komentáre</Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            {postComments.map((comment) => (
              <Box key={comment.id} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <Avatar
                  src={comment.user.image || undefined}
                  alt={comment.user.name || 'User'}
                  sx={{ width: 32, height: 32 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" component="span" sx={{ fontWeight: 'bold' }}>
                    {comment.user.name}
                  </Typography>
                  <Typography variant="body2" component="span" sx={{ ml: 0.5 }}>
                    {comment.content}
                  </Typography>
                </Box>
                {session?.user?.email && comment.user.name === session.user.name && (
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteComment(comment.id)}
                    sx={{ ml: 'auto' }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            ))}
            <form onSubmit={handleAddComment} style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Pridať komentár..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                sx={{ flex: 1 }}
              />
              <IconButton type="submit" color="primary">
                <SendIcon />
              </IconButton>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}