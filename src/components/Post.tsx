import { Card, CardHeader, CardMedia, CardActions, CardContent } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface PostProps {
  username: string;
  profilePicture?: string;
  imageUrl: string;
  likes?: number;
  comments?: number;
}

export default function Post({ username, profilePicture, imageUrl, likes = 0, comments = 0 }: PostProps) {
  return (
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
            <FavoriteBorderIcon />
            <ChatBubbleOutlineIcon />
          </Box>
          <BookmarkBorderIcon />
        </Box>
      </CardActions>
      <CardContent>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          {likes} likes
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {comments} comments
        </Typography>
      </CardContent>
    </Card>
  );
} 