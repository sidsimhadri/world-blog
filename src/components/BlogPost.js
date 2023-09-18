import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux'; 
import { createPostThunk } from '../services/thunks';


const BlogPost = ({ position, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(position)
    const postData = {
      title: title,
      content: content,
      location: {
        type: 'Point',
        coordinates: [position.lng, position.lat]
      }
    };
    onClose();
    dispatch(createPostThunk(postData))
    
    .unwrap()
    .then(() => {
      setTitle('');
      setContent('');
      onClose();
    })
    .catch((error) => {
      console.error('Error creating post:', error);
    });
  };
  
  
  return (
    <Modal open={Boolean(position)} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
    <Box 
    sx={{ 
      position: 'absolute', 
      borderRadius: 5,
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)',
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
      width: '80%',
      maxWidth: '500px'
    }}
    >
    <Typography id="modal-modal-title" variant="h6" component="h2">
    
    </Typography>
    <TextField
    margin="dense"
    label="Title"
    type="text"
    fullWidth
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    required={true}
    />
    <TextField
    margin="dense"
    label="Content"
    type="text"
    fullWidth
    multiline
    rows={4}
    value={content}
    required={true}
    
    onChange={(e) => setContent(e.target.value)}
    />
    <Box mt={2}>
    <Button variant="contained" color="primary" onClick={handleSubmit}>
    Post
    </Button>
    </Box>
    </Box>
    </Modal>
    );
  };
  
  export default BlogPost;
  