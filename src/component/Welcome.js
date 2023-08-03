import Modal from "./Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUsernameToStore } from "@/reducer/user.slice";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import Image from "next/image";
import SpConnection from "../spotify/SpConnection";
import SearchArtistByName from "../spotify/SearchArtistByName";
import SearchTracksById from "../spotify/SearchTracksById";

export default function Welcome({ isDarkMode, setIsDarkMode, toogleDarkMode }) {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);

  // déclaration des états
  const [modal, setModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [accessToken, setAccessToken] = useState(null); // Ajout de l'état accessToken
  const [artistName, setArtistName] = useState(""); // Ajout de l'état artistName
  const [artists, setArtists] = useState([]); // Ajout de l'état artists

  //initialisation api spotify
  useEffect(() => {
    SpConnection(setAccessToken);
  }, []);

  // fonction de recherche d'artiste
  const handleSearch = async () => {
    if (accessToken) {
      try {
        const result = await SearchArtistByName(accessToken, artistName);
        setArtists(result);
        console.log("result", result);
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


  // Fonction pour charger les pistes pour un artiste donné
  const loadTracks = async (artistId) => {
    const result = await SearchTracksById(artistId, accessToken);
    setArtistTracks(prev => ({ ...prev, [artistId]: result }));
  };

    // Utilisez un effet pour charger les pistes lors du montage du composant
    useEffect(() => {
      artists.forEach(artist => loadTracks(artist.id));
    }, );

  //on map l'état artistImages pour afficher les images
  const artistsResults = artists.map((artist, index) => {
    return (
      <div className="w-full h-1/3" key={index}>
        {artist.images && artist.images.length > 0 && (
          <Image src={artist.images[0].url} alt="Artist" width={200} height={200} />
        )}
        <p>{artist.name}</p>
        {artist.genres.map((genre, genreIndex) => {
          return <p key={genreIndex}>{genre}</p>;
        })}
      </div>
    );
  });
  


  return (
    <div className="h-screen w-full p-5 dark:bg-black bg-white">
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
    </div>
  );
}
