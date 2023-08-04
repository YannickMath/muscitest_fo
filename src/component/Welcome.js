import Modal from "./Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUsernameToStore } from "@/reducer/user.slice";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import Image from "next/image";
import SpConnection from "../spotify/SpConnection";
import SearchArtistByName from "../spotify/SearchArtistByName";
import Tracks from "./Tracks";
import SearchTracksById from "@/spotify/SearchTracksById";
import Player from "../spotify/Player";

export default function Welcome({ isDarkMode, setIsDarkMode, toogleDarkMode }) {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);

  // déclaration des états
  const [modal, setModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [accessToken, setAccessToken] = useState(null); // Ajout de l'état accessToken
  const [artistName, setArtistName] = useState(""); // Ajout de l'état artistName
  const [artists, setArtists] = useState([]); // Ajout de l'état artists
  const [artistIds, setArtistIds] = useState(""); // Ajout de l'état artistId
  const [tracks, setTracks] = useState([]); // Ajout de l'état tracks

  //initialisation api spotify
  useEffect(() => {
    SpConnection(setAccessToken);
  }, []);

  // fonction pour lancer la recherche d'artiste
  const handleSearch = async () => {
    if (accessToken) {
      try {
        const result = await SearchArtistByName(accessToken, artistName);
        setArtists(result);
      } catch (err) {
        console.log(err.status);
      }
    }
  };

  //mise à jour de l'état artistName
  const handleArtistName = (e) => {
    e.preventDefault();
    setArtistName(e.target.value);
  };

  // mise à jour de l'état userName
  const handleOnChangeUserName = (e) => {
    setUserName(e.target.value);
  };

  // mise à jour de l'état modal
  const handleLoginButton = () => {
    setModal(true);
  };

  // mise à jour de l'état modal et dispatch de l'action addUsernameToStore
  const handleLoginSubmit = () => {
    setModal(false);
    dispatch(addUsernameToStore(userName));
  };

// Effet pour mettre à jour artistIds chaque fois que artists change
useEffect(() => {
  setArtistIds(artists.map(artist => artist.id));
}, [artists]);
console.log("artistIds", artistIds)

// Effet pour appeler SearchTracksById chaque fois que accessToken ou artistIds change
useEffect(() => {
  if (accessToken && artistIds.length > 0) {
    // Fonction pour récupérer les pistes pour un ensemble d'artistIds
    const fetchTracks = async () => {
      const newTracks = [];
      for (const artistId of artistIds) {
        const trackData = await SearchTracksById(accessToken, artistId);
        newTracks.push(...trackData); // Assumant que trackData est un tableau
      }
      setTracks(newTracks);
      console.log("trackData", trackData)
      console.log("newTracks", newTracks)
    };

    // Appeler la fonction pour récupérer les pistes
    fetchTracks();
  }
}, [accessToken, artistIds]);


//on map l'état tracks pour afficher les tracks
const track = tracks.map((track, index) => {
  return (
    <div className=" h-1/3" key={index}>
      {tracks && tracks.length > 0 && (
        <p>{track}</p>
      )}
    </div>
  );
});


  //on map l'état artistImages pour afficher les images
  const artistsResults = artists.map((artist, index) => {
    return (
      <div className=" h-1/3" key={index}>
        {artist.images && artist.images.length > 0 && (
          <Image
            src={artist.images[0].url}
            alt="Artist"
            width={120}
            height={120}
            className="inline-block rounded-full"
          />
        )}
        <p>{artist.name}</p>
        {artist.genres.map((genre, genreIndex) => {
          return <p key={genreIndex}>{genre}</p>;
        })}
      </div>
    );
  });


  return (
    <div className="h-screen w-full p-5 dark:bg-black bg-white font-sans ">
      <h1>Home Page</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={handleLoginButton}
      >
        Button
      </button>
      {modal && (
        <Modal
          setModal={setModal}
          handleLoginSubmit={handleLoginSubmit}
          handleOnChangeUserName={handleOnChangeUserName}
          userName={userName}
          setUserName={setUserName}
        />
      )}
      <div>
        {!isDarkMode ? (
          <MdDarkMode
            className=" hover:cursor-pointer  "
            onClick={toogleDarkMode}
          />
        ) : (
          <MdOutlineDarkMode
            className=" hover:cursor-pointer dark:text-white "
            onClick={toogleDarkMode}
          />
        )}
      </div>
      <input
        onChange={handleArtistName}
        type="text"
        placeholder="Search artist"
        value={artistName}
      />
      <button
        className="cursor-pointer"
        // onClick={() => {SearchArtistByName}}
        onClick={() => {
          handleSearch(accessToken, artistName);
        }}
      >
        Search
      </button>
      {artistsResults}
      {/* <Tracks /> */}
      {track}
    </div>
  );
}
