import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Autocomplete, LoadScript } from '@react-google-maps/api';
import SearchIcon from '@mui/icons-material/Search';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import LoginButton from './LoginButton';
import MapIcon from '@mui/icons-material/Map';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormControl, IconButton } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material'; 
import { useTheme } from '@mui/material';
import { setSearchSubmitClicked, setSearchCoordinates} from '../reducers/search-reducer';

import { searchPostsThunk } from '../services/thunks';
import axios from 'axios';
const pages = ['Map', 'Explore'];

function ResponsiveAppBar( ) {
	const navigate = useNavigate();
	const [inputValue, setInputValue] = useState('');
	const theme = useTheme();
	const [radius, setRadius] = useState('');
	const dispatch = useDispatch();
	
	const getCoordinates = async (address) => {
		const encodedAddress = encodeURIComponent(address);
		
		try {
			const response = await axios.get(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
				);
				
				if (response.data.status === 'OK' && response.data.results.length > 0) {
					const location = response.data.results[0].geometry.location;
					return {
						latitude: location.lat,
						longitude: location.lng,
					};
				} else {
					throw new Error('Invalid address or no results found');
				}
			} catch (error) {
				console.error('Error geocoding address:', error);
				throw error;
			}
		};
		
		function handleSelect(autocomplete) {
			const place = autocomplete.getPlace();
			if (place && place.formatted_address) {
				setInputValue(place.formatted_address);
			}
		};
		const handleChange = (event) => {
			setRadius(event.target.value);
		};
		
		
		const handleSearchSubmit = async () => {
			const cord = await getCoordinates(inputValue);
			console.log({ coordinates: cord, radius: radius })
			dispatch(setSearchCoordinates({ coordinates: cord }));
			dispatch(searchPostsThunk({ coordinates: cord, radius: radius }));
			dispatch(setSearchSubmitClicked({ searchSubmitClicked: true }));
		}
		
		const autocompleteRef = React.useRef();
		
		
		const isSearchButtonDisabled = !inputValue || !radius;
		
		return (
			<AppBar position="static">
			<Container maxWidth="xl">
			<Toolbar disableGutters>
			<Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
			<MapIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
			<Typography
			variant="h6"
			noWrap
			component="a"
			href="/"
			sx={{
				mr: 2,
				display: { xs: 'none', md: 'flex' },
				fontFamily: 'monospace',
				fontWeight: 700,
				letterSpacing: '.3rem',
				color: 'inherit',
				textDecoration: 'none',
			}}
			>
			WORLDBLOG
			</Typography>
			<Box sx={{ flexGrow: 1, display: 'flex' }}>
			{pages.map((page) => (
				<Button
				key={page}
				onClick={() => navigate(`/${page.toLowerCase()}`)}
				sx={{ my: 2, color: 'white', display: 'block' }}
				>
				{page}
				</Button>
				))}
				</Box>
				</Box>
				<Box sx={{ flexGrow: 2 }}>
				<Grid container justifyContent={'center'} alignItems='center' width='50%'>
				<Grid item xs={6} sm={6}>
				<LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY} libraries={['places']}>
				<Autocomplete
				onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
				onPlaceChanged={() => handleSelect(autocompleteRef.current)}
				>
				<TextField
				sx={{ flexGrow: 1, display: 'flex' }}
				style={{ borderTopLeftRadius: "50px", borderBottomLeftRadius: "50px", backgroundColor: 'white' }}
				label="Search for a location"
				variant="outlined"
				onChange={(e) => setInputValue(e.target.value)}
				InputProps={{ style: { borderTopLeftRadius: "50px", borderBottomLeftRadius: "50px", backgroundColor: "white" } }}
				/>
				</Autocomplete>
				</LoadScript>
				</Grid>
				<Grid item xs={3} sm={3}>
				<FormControl sx={{ flexGrow: 1, display: 'flex' }} variant="outlined">
				<InputLabel id="miles-label">Miles</InputLabel>
				<Select 
				labelId="miles-label" 
				id="miles" 
				value={radius} 
				label="Radius"
				style={{ borderTopRightRadius: "50px", borderBottomRightRadius: "50px", backgroundColor: "white" }}
				onChange={handleChange}
				>
				<MenuItem value={10}>5</MenuItem>
				<MenuItem value={20}>10</MenuItem>
				<MenuItem value={30}>25</MenuItem>
				<MenuItem value={40}>50</MenuItem>
				<MenuItem value={50}>100</MenuItem>
				</Select>
				</FormControl>
				</Grid>
				<Grid item xs={3} sm={3}>
				<IconButton 
				onClick={handleSearchSubmit} 
				sx={{
					marginLeft: "5px",
					backgroundColor: 'transparent', 
					'&:hover': {
						backgroundColor: 'transparent',
					},
					borderRadius: "50%",
				}}
				disabled={isSearchButtonDisabled}
				>
				<SearchIcon sx={{ 
					color: "white",
					backgroundColor: isSearchButtonDisabled ? theme.palette.grey[300]  : theme.palette.secondary.main,
					borderRadius: "50%", 
					padding: '5px' 
				}}/>
				</IconButton>
				</Grid>
				</Grid>
				
				<LoginButton />
				</Box>
				
				</Toolbar>
				</Container>
				</AppBar>
				);
			}
			
			export default ResponsiveAppBar;