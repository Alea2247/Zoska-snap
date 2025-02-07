// src\app\(private)\prispevok\page.tsx

import { PrismaClient, Post } from "@prisma/client";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { Paper } from "@mui/material";

// Function to shuffle an array
function shuffleArray(array: Post[]): Post[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

export const metadata = { title: "Zoznam prispevkov | Kutyl s.r.o." };

export default async function PostsList() {
  "use server"; // This ensures the code only runs on the server

  const prisma = new PrismaClient(); // Move Prisma inside the function
  // Explicitly typing the posts result as Post[]
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      imageUrl: true,
      caption: true,
    },
  }) as Post[]; // <-- Adding type assertion here

  // Shuffle the posts array to randomize the order
  const shuffledPosts = shuffleArray(posts);

  return (
    <div style={{ paddingBottom: "80px", paddingLeft: "16px", paddingRight: "16px" }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, textAlign: 'center' }}>
        Zoznam prispevkov
      </Typography>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "24px",
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "1200px", // Added a max width to ensure the content doesn't stretch too wide
        }}
      >
        {shuffledPosts.map((post) => (
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
          </Paper>
        ))}
      </div>
    </div>
  );
}