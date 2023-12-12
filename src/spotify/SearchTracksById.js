export default async function SearchTracksById(accessToken, artistIds) {
  const market = 'us';
  try {
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistIds}/top-tracks?market=${market}&limit=10`, {
      headers: { 'Authorization': `Bearer ${accessToken}` } // Notez les backticks autour de la valeur de l'en-tête
    });
    const data = await response.json();
    // console.log(data);
    return data; // Vous pouvez renvoyer les données si vous voulez les utiliser ailleurs
  } catch (err) {
    console.log(err.status);
    return null; // Gestion d'erreur : vous pouvez retourner null ou gérer l'erreur comme vous le souhaitez
  }
}

