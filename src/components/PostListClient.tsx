import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Post from "@/components/Post";
import { getPosts } from "../app/(private)/prispevok/actions";

interface PostFromServer {
  id: string;
  userId: string;
  imageUrl: string;
  caption: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: {
    name: string | null;
    image: string | null;
  };
  likes: number;
  comments: number;
  isLiked: boolean;
}

interface PostResponse {
  id: string;
  userId: string;
  imageUrl: string;
  caption: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: {
    name: string | null;
    image: string | null;
  };
  likes: number;
  comments: number;
  isLiked: boolean;
}

const PostListClient = () => {
  const [posts, setPosts] = useState<PostFromServer[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    }
    fetchPosts();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: 3
      }}>
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            username={post.user.name || "Anonymous"}
            profilePicture={post.user.image || undefined}
            imageUrl={post.imageUrl}
            likes={post.likes}
            comments={post.comments}
            isLiked={post.isLiked}
          />
        ))}
      </Box>
    </Container>
  );
};

export default PostListClient;