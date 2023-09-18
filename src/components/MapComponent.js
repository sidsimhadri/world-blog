import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup, useMap } from 'react-leaflet';
import BlogPost from './BlogPost';
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
import { useDispatch, useSelector } from 'react-redux';
import { findPostsThunk } from '../services/thunks';
import { useAuth0 } from '@auth0/auth0-react';
import { setSearchSubmitClicked } from '../reducers/search-reducer';
import { Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const InteractiveMap = () => {
  const [position, setPosition] = useState(null);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const { isAuthenticated } = useAuth0();
  const searchSubmitClicked = useSelector(state => state.search.searchSubmitClicked);
  const coordinates = useSelector(state => state.search.coordinates);

  useEffect(() => {
    dispatch(findPostsThunk());
  }, [dispatch]);

  const Map = () => {
    const map = useMap();

    useEffect(() => {
      if (searchSubmitClicked) {
        map.setView([coordinates.coordinates.latitude, coordinates.coordinates.longitude], 15);
        dispatch(setSearchSubmitClicked(false));
      }
    }, [map]);

    return null;
  };

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
      }
    });
    return null;
  };

  

  const handleClose = () => {
    setPosition(null);
  };
  return (
    <div>
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '90vh', width: '100vw' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {posts && posts.map(post => (
          <Marker key={post._id} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })} position={[post.location.coordinates[1], post.location.coordinates[0]]}>
            <Popup>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{post.title}</div>
              <div style={{ fontSize: '16px' }}>{post.content}</div>
            </Popup>
          </Marker>
        ))}

        <MapEvents />
        <Map />
      </MapContainer>

      {isAuthenticated && position && <BlogPost position={position} onClose={handleClose} />}

      {!isAuthenticated && position && (
        <div style={{ position: 'absolute', top: '90%', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
          <Alert severity="info">
            Login or Signup to make a post!
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
