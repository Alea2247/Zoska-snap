// src/sections/AuthHomeView.tsx

import { Session } from "next-auth";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Post from "../components/Post";

// Temporary mock data - replace with actual database data later
const mockPosts = [
  {
    id: 1,
    username: "user1",
    profilePicture: "https://via.placeholder.com/150",
    imageUrl: "https://via.placeholder.com/600",
    likes: 123,
    comments: 45
  },
  {
    id: 2,
    username: "user2",
    profilePicture: "https://via.placeholder.com/150",
    imageUrl: "https://via.placeholder.com/600",
    likes: 67,
    comments: 12
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
            username={post.username}
            profilePicture={post.profilePicture}
            imageUrl={post.imageUrl}
            likes={post.likes}
            comments={post.comments}
          />
        ))}
      </Box>
    </Container>
  );
}