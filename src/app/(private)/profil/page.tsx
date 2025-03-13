// src/app/profil/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Avatar,
  Paper,
  Grid,
  Button,
  TextField,
  Divider,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useSession } from "next-auth/react";

type UserProfile = {
  name?: string | null;
  email?: string | null;
  avatarUrl?: string | null;
  location?: string | null;
  bio?: string | null;
  interests?: string[] | null;
};

export default function Profile() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    avatarUrl: "",
    location: "",
    bio: "",
    interests: [],
  });

  useEffect(() => {
    if (session?.user) {
      setProfile({
        name: session.user.name || "",
        email: session.user.email || "",
        avatarUrl: session.user.image || "",
        location: "",
        bio: "",
        interests: [],
      });
    }
  }, [session]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    // TODO: Implement save functionality
    setIsEditing(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        {/* Profile Header */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Avatar
            src={profile.avatarUrl || "/default-avatar.png"}
            alt={profile.name || "User"}
            sx={{ width: 120, height: 120, mr: 3 }}
          />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography variant="h4" component="h1">
                {profile.name || "Neznámy užívateľ"}
              </Typography>
              <IconButton onClick={handleEdit} sx={{ ml: 2 }}>
                <EditIcon />
              </IconButton>
            </Box>
            <Typography variant="body1" color="text.secondary">
              {profile.email}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Profile Details */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Lokalita
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                placeholder="Zadajte svoju lokalitu"
                sx={{ mb: 2 }}
              />
            ) : (
              <Typography variant="body1">
                {profile.location || "Nezadaná"}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Bio
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                multiline
                rows={4}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                placeholder="Napíšte niečo o sebe"
                sx={{ mb: 2 }}
              />
            ) : (
              <Typography variant="body1">
                {profile.bio || "Žiadny bio"}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Zaujímavosti
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                value={profile.interests?.join(", ")}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    interests: e.target.value.split(",").map((i) => i.trim()),
                  })
                }
                placeholder="Zadajte zaujímavosti oddelené čiarkou"
                sx={{ mb: 2 }}
              />
            ) : (
              <Typography variant="body1">
                {profile.interests?.length
                  ? profile.interests.join(", ")
                  : "Žiadne zaujímavosti"}
              </Typography>
            )}
          </Grid>
        </Grid>

        {/* Save Button */}
        {isEditing && (
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{ mr: 2 }}
            >
              Uložiť zmeny
            </Button>
            <Button
              variant="outlined"
              onClick={() => setIsEditing(false)}
            >
              Zrušiť
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}