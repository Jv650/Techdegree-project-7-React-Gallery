import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router-dom";

//App components
import Search from "./components/Search";
import Nav from "./components/Nav";
import Photolist from "./components/Photolist";
import NotFound from "./components/NotFound";

function App() {
  //const [count, setCount] = useState(0)
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const ApiKey = "0729021a46f80230ae32d71d4a050501";

  const fetchData = (searchText) => {
    setLoading(true);
    let activeFetch = true;
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0729021a46f80230ae32d71d4a050501&tags=${searchText}&per_page=24&format=json&nojsoncallback=1`
      )
      .then((response) => {
        if (activeFetch) {
          setPhotos(response.data.photos.photo); //maybe need to remove photos.photo?
          console.log(response.data.photos.photo);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
    return () => {
      activeFetch = false;
    };
  };
  useEffect(() => {
    fetchData(query);
  }, [query]);

  const handleQueryChange = (searchText) => {
    setQuery(searchText);
  };

  /*const fetchData = async(query) => {
    //Api url
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0729021a46f80230ae32d71d4a050501&tags=${query}&per_page=24&format=json&nojsoncallback=1`; 

  try {
    //make fetch request
    const response = await fetch(url);
    //parse and return the JSON data
    const responseData = await response.json();
    console.log(responseData);
    //check if photos exist before setting state
    if(response.photos) {
      setPhotos(responseData.photos.photo);
    } else {
      console.error("Unexpected response:", responseData)
    }
  } catch (error) {
    console.error("Error fetching and parsing data", error);
  }
};

useEffect(() => {
  fetchData(query);
}, [query]);*/

  /* 
    useEffect(() => {
    fetch(url)
    .then(response => response.json())
    .then(responseData => setPhotos(responseData.photos)) //data??
    .catch(error => console.log("Error fetching and parsing data", error));

  }, [query]);
*/

  return (
    //element={<Navigate to='dogs'/> //data={} maybe add this inside the photolist element to specify cat, dog, comp
    <div className="container">
      <Search changeQuery={handleQueryChange} />
      <Nav />
      <Photolist photos={photos} />
      <Routes>
        <Route path="/" element={<Navigate to="/dogs" />} />
        <Route
          path="cats"
          element={<Photolist photos={photos} title={query} />}
        />
        <Route
          path="dogs"
          element={<Photolist photos={photos} title={query} />}
        />
        <Route
          path="computers"
          element={<Photolist photos={photos} title={query} />}
        />
        <Route
          path="/search/:query"
          element={
            <Photolist
              photos={photos}
              changeQuery={handleQueryChange}
              title={query}
            />
          }
        />
        <Route path="*" element={<Navigate replace to="/404" />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
