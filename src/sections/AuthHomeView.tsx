// src/sections/AuthHomeView.tsx

"use client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { Paper, Box } from "@mui/material";
import Image from "next/image";

type Post = {
  id: string;
  imageUrl: string;
  caption?: string | null;
  user: {
    name?: string | null;
  };
};

export default function AuthHomeView({ session }: { session: Session | null }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (!session) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
        Vitajte, {session?.user?.name || "užívateľ"}!
      </Typography>

      {loading ? (
        <Typography>Načítavam príspevky...</Typography>
      ) : posts.length === 0 ? (
        <Typography>Zatiaľ tu nie sú žiadne príspevky.</Typography>
      ) : (
        <Box sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "24px",
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "1200px",
          pb: 8
        }}>
          {posts.map((post) => (
            <Paper
              key={post.id}
              elevation={3}
              sx={{
                padding: 2,
                borderRadius: 2,
                boxShadow: 3,
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src={post.imageUrl}
                alt={post.caption || "Post image"}
                width={300}
                height={300}
                style={{ objectFit: "cover", borderRadius: "8px" }}
              />
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                {post.caption || "No caption available"}
              </Typography>
              <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>
                Posted by {post.user.name || "Unknown user"}
              </Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Container>
  );
}