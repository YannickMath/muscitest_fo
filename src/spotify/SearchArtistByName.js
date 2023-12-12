export default async function SearchArtistByName(accessToken, artistName) {
  try {
    console.log("artistName", artistName);

    // Encode the artist name to make it URL-safe
    const encodedArtistName = encodeURIComponent(artistName);
    const url = `https://api.spotify.com/v1/search?q=${encodedArtistName}&type=artist&limit=1&include_external=audio`;

    const res = await fetch(url, {
      method: "GET", // Correction de la faute de frappe ici
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res && res.ok) {
      const data = await res.json();
      console.log("artists list", data.artists.items);
      return data.artists.items; // Retourne une liste d'artistes
    } else {
      // Gestion des erreurs de réponse
      console.error("Erreur:", res.status, res.statusText);
      return null;
    }
  } catch (err) {
    console.error(err);
  }
}
