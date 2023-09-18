import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from "@mui/material/styles"; 

const DisplayBlogPost = ({ post, onClick, isInModal }) => {
    const theme = useTheme();
    
    const boxStyles = isInModal ? {
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        overflowY: 'auto',
    } : {};

    return (
        <Box 
            onClick={onClick} 
            style={{ cursor: 'pointer', ...boxStyles, margin: '30px' }}
            sx={{ 
                position: 'relative', 
                borderRadius: 5,
                bgcolor: 'background.paper',
                boxShadow: 24,
                width: '80%',
                maxWidth: '500px',
            }}
        >
            <Box 
            sx={{ 
                width: '100%', 
                bgcolor: theme.palette.secondary.main,
                padding: theme.spacing(1), 
                borderRadius: '15px 15px 0 0', 
                boxSizing: 'border-box'  
            }}
            >
                <Typography variant="h6">{post.title}</Typography>
            </Box>
            <Box 
            sx={{ 
                padding: theme.spacing(2), 
                boxSizing: 'border-box'  
            }}
            >
                <Typography variant="body1">{post.content}</Typography>
            </Box>
        </Box>
    );
};


    export default DisplayBlogPost;
    