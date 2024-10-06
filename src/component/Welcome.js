import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "./Modal";
import { addUsernameToStore } from "@/reducer/user.slice";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import Image from "next/image";
import SpConnection from "../spotify/SpConnection";
import SearchArtistByName from "../spotify/SearchArtistByName";
import SearchTracksById from "@/spotify/SearchTracksById";

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

  const handleSearch = async () => {
    if (accessToken && artistName !== null) {
      try {
        const result = await SearchArtistByName(accessToken, artistName);
        setArtists(result);
      } catch (err) {
        console.log(err.status);
      }
    }
  };

  const handleArtistName = (e) => {
    e.preventDefault();
    setArtistName(e.target.value);
  };

  const handleOnChangeUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleLoginButton = () => {
    setModal(true);
  };

  const handleLoginSubmit = () => {
    setModal(false);
    dispatch(addUsernameToStore(userName));
  };

  useEffect(() => {
    setArtistIds(artists?.map((artist) => artist.id));
  }, [artists]);

  useEffect(() => {
    if (accessToken && artistIds?.length > 0) {
      setTracks([]);
      const fetchTracks = async () => {
        const newTracks = [];
        for (const artistId of artistIds) {
          const trackData = await SearchTracksById(accessToken, artistId);
          if (
            trackData &&
            trackData.tracks &&
            Array.isArray(trackData.tracks)
          ) {
            newTracks.push(...trackData.tracks);
          }
        }
        setTracks(newTracks);
      };
      fetchTracks();
    }
  }, [accessToken, artistIds]);

  const track = tracks.map((track, index) => {
    return (
      <div
        className="flex flex-col md:w-1/2 items-center justify-center my-4 p-4 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg"
        key={index}
      >
        <p className="font-bold text-lg dark:text-white">{track.name}</p>
        <audio controls className="w-full mt-2">
          {tracks && tracks?.length > 0 && (
            <source src={track.preview_url} type="audio/mpeg" />
          )}
        </audio>
      </div>
    );
  });

  const artistsResults = artists?.map((artist, index) => {
    const handleGoToSpotify = () => {
      window.open(artist.external_urls.spotify);
    };

    return (
      <div
        className="flex flex-col items-center justify-center my-4 p-4 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg cursor-pointer transition-transform hover:scale-105"
        key={index}
      >
        {artist.images && artist.images?.length > 0 && (
          <Image
            src={artist.images[0].url}
            alt="Artist"
            width={140}
            height={120}
            className="rounded-full"
            onClick={handleGoToSpotify}
          />
        )}
        <p className="mt-2 font-bold dark:text-white">{artist.name}</p>
        <div className="flex flex-wrap justify-center">
          {artist.genres.map((genre, genreIndex) => {
            return (
              <span
                className="mx-1 px-2 py-1 bg-blue-500 text-white text-xs rounded-full"
                key={genreIndex}
              >
                {genre}
              </span>
            );
          })}
        </div>
      </div>
    );
  });

  return (
    <div
      className={`flex flex-col w-full p-5 h-4/5 dark:bg-black bg-white font-sans items-center justify-around md:flex-row space-y-6`}
    >
      <div className="md:flex md:flex-col w-full justify-around gap-10">
        <div className="md:flex md:flex-row">
          <div className="flex-1 p-2 md:w-full flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold h-full flex flex-row items-center dark:text-white">
              Discover Artists
            </h1>
            {/* <button
          className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out"
          onClick={handleLoginButton}
          >
          Login
          </button> */}
            {modal && (
              <Modal
                setModal={setModal}
                handleLoginSubmit={handleLoginSubmit}
                handleOnChangeUserName={handleOnChangeUserName}
                userName={userName}
                setUserName={setUserName}
              />
            )}
            <div className="flex mt-6">
              {!isDarkMode ? (
                <div className="flex flexc-row gap-4 items-center">
                  <p className="text-black text--lg">Theme</p>
                  <MdDarkMode
                    className="text-3xl cursor-pointer hover:text-gray-500 transition duration-300"
                    onClick={toogleDarkMode}
                  />
                </div>
              ) : (
                <div className="flex flexc-row gap-4 items-center">
                  <p className="text-white text--lg">Theme</p>
                  <MdOutlineDarkMode
                    className="text-3xl cursor-pointer dark:text-white hover:text-gray-300 transition duration-300"
                    onClick={toogleDarkMode}
                  />
                </div>
              )}
            </div>
            <div className="relative mt-6">
              <input
                onChange={handleArtistName}
                type="text"
                placeholder="Search artist"
                value={artistName}
                className="p-2 rounded-lg w-full border-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="flex items-center justify-center">
                <button
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded-lg"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 p-2 md:w-full md:items-center md:justify-center md:flex md:flex-col space-y-6">
            {artistsResults}
          </div>
        </div>
        <div className="flex-1 p-2 dark:bg-black md:w-full md:items-center md:justify-center md:flex md:flex-col space-y-6">
          {track}
        </div>
      </div>
    </div>
  );
}
