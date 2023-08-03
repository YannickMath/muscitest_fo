export default async function SearchTracksById(artistId, accessToken) {
    const market = 'us';
    try {
      const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=${market}`, {
        headers: { 'Authorization': 'Bearer ' + accessToken }
      });
      const data = await response.json();
      console.log(data);
      return data; // Vous pouvez renvoyer les données si vous voulez les utiliser ailleurs
    } catch (err) {
      console.log(err.status);
      return null; // Gestion d'erreur : vous pouvez retourner null ou gérer l'erreur comme vous le souhaitez
    }
  }
  