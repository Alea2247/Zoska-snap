"use client"; // Client-side rendering

import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { Box, Avatar, CircularProgress, List, ListItemAvatar, ListItemText, Divider, ListItemButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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
  const [users, setUsers] = useState<User[]>([]);
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
    <Container maxWidth="sm" sx={{ py: 4 }}>
      {/* Search Bar */}
      <Box sx={{ position: 'relative', mb: 3 }}>
        <SearchIcon 
          sx={{ 
            position: 'absolute', 
            left: 12, 
            top: '50%', 
            transform: 'translateY(-50%)',
            color: 'text.secondary'
          }} 
        />
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Hľadať používateľov..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              pl: 4,
              borderRadius: 2,
              backgroundColor: 'background.paper',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'divider',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
            },
          }}
        />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {users.map((user, index) => (
            <React.Fragment key={user.id}>
              <ListItemButton
                sx={{ 
                  py: 2,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  }
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    src={user.profile?.avatarUrl || "/default-avatar.png"}
                    alt={user.name || "User"}
                    sx={{ width: 56, height: 56 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      {user.name || "Neznámy užívateľ"}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {user.profile?.location || "Neznáma lokalita"}
                      </Typography>
                      {user.profile?.interests && user.profile.interests.length > 0 && (
                        <Typography variant="caption" color="text.secondary">
                          {user.profile.interests.join(" • ")}
                        </Typography>
                      )}
                    </Box>
                  }
                />
              </ListItemButton>
              {index < users.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      )}

      {!loading && search.trim() && users.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" color="text.secondary">
            Žiadni používatelia neboli nájdení.
          </Typography>
        </Box>
      )}
    </Container>
  );
}