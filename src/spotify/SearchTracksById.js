export default async function SearchTracksById(accessToken, artistIds) {
  const market = "us";
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistIds}/top-tracks?market=${market}&limit=10`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.status);
    return null;
  }
}
