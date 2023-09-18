import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { findPostsThunk } from '../services/thunks';
import DisplayBlogPost from '../components/DisplayBlogPost';
import { setSearchSubmitClicked } from '../reducers/search-reducer';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
const Explore = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.posts.posts);
  const searchSubmitClicked = useSelector((state) => state.search.searchSubmitClicked);
  const searchResults = useSelector((state) => state.results.posts);
  const [displayedPosts, setDisplayedPosts] = React.useState(allPosts.slice(0,30));
  
  useEffect(() => {
    dispatch(findPostsThunk());
  }, []);  
  useEffect(() => {
    if (searchSubmitClicked) {
      dispatch(setSearchSubmitClicked(false));
      searchResults && setDisplayedPosts(searchResults);
    } else {
      setDisplayedPosts(allPosts.slice(0,30));
    }
  }, [searchSubmitClicked, allPosts, searchResults, dispatch]);
  
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedPost, setSelectedPost] = React.useState(null);
  const handlePostClick = (post) => {
    setSelectedPost(post);
    setOpenModal(true);
  };
  
  
  return (
    <div
    style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
    }}
    >
    {displayedPosts.length > 0 ? 
      <>
      {displayedPosts.map((post) => (
        <DisplayBlogPost key={post._id} post={post} onClick={() => handlePostClick(post)} />
        ))}
        </>
        
        
        :
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Typography variant="h4" color="textSecondary">
        No posts found
        </Typography>
        
        
        
        
        </Box>}
        {selectedPost && <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          >
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            width: '80%', 
            height: '80%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'auto',
            outline: 'none'
          }}
          onClick={()=> setOpenModal(false)}>
          <DisplayBlogPost post={selectedPost} />
          </div>
          </Modal>}
          </div>
          );
        };
        
        export default Explore;
        