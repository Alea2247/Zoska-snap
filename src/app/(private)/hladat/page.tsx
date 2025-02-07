// src\app\(private)\hladat\page.tsx

"use client"; // Client-side rendering

import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { Box, Paper, Avatar, Chip } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

// Define TypeScript types
type UserProfile = {
  avatarUrl?: string | null;
  location?: string | null;
  interests?: string[] | null;
};

type User = {
  id: string;
  name?: string | null;
  profile?: UserProfile | null;
};

export default function Find() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]); // Type users correctly
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      try {
        const response = await fetch(`/api/search?query=${search}`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }

      setLoading(false);
    };

    const delaySearch = setTimeout(() => {
      fetchUsers();
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [search]);

  return (
    <Container sx={{ mt: 4, pb: 8 }}>
      <Typography variant="h4" gutterBottom>
        Hľadanie používateľov
      </Typography>

      {/* Search Bar */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Hľadať podľa mena alebo lokality..."
        sx={{ mb: 3 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <CircularProgress sx={{ display: "block", mx: "auto", my: 2 }} />}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 3,
        }}
      >
        {users.map((user) => (
          <Paper
            key={user.id}
            elevation={3}
            sx={{
              p: 2,
              borderRadius: 3,
              textAlign: "center",
              transition: "0.3s",
              "&:hover": { boxShadow: 6, transform: "scale(1.05)" },
            }}
          >
            <Avatar
              src={user.profile?.avatarUrl || "/default-avatar.png"}
              alt={user.name || "User"}
              sx={{ width: 80, height: 80, mx: "auto", mb: 1 }}
            />
            <Typography variant="h6">{user.name || "Neznámy užívateľ"}</Typography>
            <Typography variant="body2" color="textSecondary">
              {user.profile?.location || "Neznáma lokalita"}
            </Typography>
            <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap", justifyContent: "center" }}>
              {user.profile?.interests?.length ? (
                user.profile.interests.map((tag, index) => (
                  <Chip key={index} label={tag} size="small" />
                ))
              ) : (
                <Typography variant="caption" color="textSecondary">
                  Žiadne záujmy
                </Typography>
              )}
            </Box>
          </Paper>
        ))}
      </Box>

      {!loading && users.length === 0 && (
        <Typography variant="body1" textAlign="center" sx={{ mt: 4 }}>
          Žiadni používatelia neboli nájdení.
        </Typography>
      )}
    </Container>
  );
}