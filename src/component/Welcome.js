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
import ReactPlayer from "react-player";
import Loader from "./Loader";

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
  const [tracksByArtist, setTracksByArtist] = useState([]); // Ajout de l'état tracksByArtist

  //initialisation api spotify
  useEffect(() => {
    SpConnection(setAccessToken);
  }, []);

  // fonction pour lancer la recherche d'artiste
  const handleSearch = async () => {
    console.log("accessToken", accessToken);
    console.log("artistName", artistName);
    if (accessToken && artistName !== null) {
      try {
        const result = await SearchArtistByName(accessToken, artistName);
        console.log("result", result);
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
    setArtistIds(artists?.map((artist) => artist.id));
  }, [artists]);
  // console.log("artistIds", artistIds)

  // Effet pour appeler SearchTracksById chaque fois que accessToken ou artistIds change
  useEffect(() => {
    if (accessToken && artistIds.length > 0) {
      setTracks([]); // Réinitialisation de l'état tracks
      // Fonction pour récupérer les pistes pour un ensemble d'artistIds
      const fetchTracks = async () => {
        const newTracks = [];
        for (const artistId of artistIds) {
          const trackData = await SearchTracksById(accessToken, artistId);
          console.log("trackData", trackData);

          if (
            trackData &&
            trackData.tracks &&
            Array.isArray(trackData.tracks)
          ) {
            // Vérification ajoutée pour s'assurer que trackData.tracks est un tableau
            newTracks.push(...trackData.tracks);
          }
        }

        setTracks(newTracks);
        console.log("newTracks", newTracks);
      };
      fetchTracks();
    }
  }, [accessToken, artistIds]);

  // function tracksByArtistId(artistIds) {
  //   tracks.map((track, artistIds) => {
  //     if (track.artists[0].id === artistIds) {
  //       console.log("track", track);
  //       return track;
  //     }
  //   });
  // }
  //on map l'état tracks pour afficher les tracks
  console.log("tracks", tracks);
  const track = tracks.map((track, index) => {
    // tracksByArtistId(artistIds);
    console.log("tracksByArtist", tracksByArtist);

    return (
      <div className=" h-15" key={index}>
        <p>{track.name}</p>
        <audio controls className="h-5">
          {tracks && tracks.length > 0 && (
            <source src={track.preview_url} type="audio/mpeg" />
          )}
          {/* {console.log("track.preview_url", track.preview_url)} */}
        </audio>
      </div>
    );
  });

  //on map l'état artistImages pour afficher les images
  const artistsResults = artists?.map((artist, index) => {
    const handleGoToSpotify = () => {
      window.open(artist.external_urls.spotify);
    };

    return (
      <div className=" h-1/3 dark:color-white" key={index}>
        <div className="cursor-pointer flex flex-row justify-center items-center  dark:border-2 dark:border-white dark:rounded-2xl">
          {artist.images && artist.images.length > 0 && (
            <Image
              src={artist.images[0].url}
              alt="Artist"
              width={140}
              height={120}
              className="inline-block rounded-full"
              onClick={handleGoToSpotify}
              style={{
                border: isDarkMode ? "1px solid black" : "1px solid white",
              }}
            />
          )}
        </div>

        <p className="flex flex-col justify-center items-center ">
          {artist.name}
        </p>
        <div className="flex flex-raw justify-center items-center ">
          {artist.genres.map((genre, genreIndex) => {
            return <p key={genreIndex}>{genre}</p>;
          })}
        </div>
      </div>
    );
  });

  return (
    <div className="flex flex-col h-screen w-full p-5 dark:bg-black bg-white font-sans items-center justify-around md:flex-row">
      <div className="flex-1 p-2 md:w-full md:flex md:flex-col md:items-center md:justify-start">
        <h1>Home Page</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={handleLoginButton}
        >
          Login
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
          className="cursor-pointer dark:text-white"
          // onClick={() => {SearchArtistByName}}
          onClick={() => {
            handleSearch(accessToken, artistName);
          }}
        >
          Search
        </button>
      </div>
      <div className="flex-1 p-2 md:w-full md:items-center md:justify-center md:flex md:flex-col">
        {artistsResults}
      </div>
      <div className="flex-1 p-2 md:w-full md:items-center md:justify-center md:flex md:flex-col">
        {track}
      </div>
    </div>
  );
}
