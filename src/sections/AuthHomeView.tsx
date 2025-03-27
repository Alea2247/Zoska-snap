// src/sections/AuthHomeView.tsx

import { Session } from "next-auth";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Post from "../components/Post";

// Temporary mock data - replace with actual database data later
const mockPosts = [
  {
    id: '1',
    username: 'John Doe',
    profilePicture: '/path/to/profile1.jpg',
    imageUrl: '/path/to/post1.jpg',
    likes: 42,
    comments: 15,
    isLiked: false,
  },
  {
    id: '2',
    username: 'Jane Smith',
    profilePicture: '/path/to/profile2.jpg',
    imageUrl: '/path/to/post2.jpg',
    likes: 27,
    comments: 8,
    isLiked: false,
  },
  // Add more mock posts as needed
];

export default function AuthHomeView({ session }: { session: Session | null }) {
  if (!session) {
    return null;
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: 3
      }}>
        {mockPosts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            username={post.username}
            profilePicture={post.profilePicture}
            imageUrl={post.imageUrl}
            likes={post.likes}
            comments={post.comments}
            isLiked={post.isLiked}
          />
        ))}
      </Box>
    </Container>
  );
}