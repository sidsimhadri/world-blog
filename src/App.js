import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Map from './Pages/Map';
import Explore from './Pages/Explore';
import TabsComponent from './components/TabsComponent';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { configureStore }
from '@reduxjs/toolkit';
import { Provider } from "react-redux";
import postsReducer
from './reducers/posts-reducer';
import searchReducer from './reducers/search-reducer';
import resultsReducer from './reducers/results-reducer';
const store = configureStore({
  reducer: {
    posts: postsReducer,
    search: searchReducer,
    results: resultsReducer
  }
});

function App() {
  return (
    <Provider store={store}>
    <ThemeProvider theme={theme}>
    <Router>
    <div>
    <TabsComponent />
    <Routes>
    <Route exact path="/" element={<Map />} />
    <Route exact path="/map" element={<Map />} />
    <Route path="/explore" element={<Explore />} />
    </Routes>
    </div>
    </Router>
    </ThemeProvider>
    </Provider>
    );
  }
  
  export default App;
  