export default async function SearchArtistByName(accessToken, artistName) {
  try {
    const encodedArtistName = encodeURIComponent(artistName);
    const url = `https://api.spotify.com/v1/search?q=${encodedArtistName}&type=artist&limit=1&include_external=audio`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res && res.ok) {
      const data = await res.json();
      console.log("artists list", data.artists.items);
      return data.artists.items;
    } else {
      console.error("Erreur:", res.status, res.statusText);
      return null;
    }
  } catch (err) {
    console.error(err);
  }
}
