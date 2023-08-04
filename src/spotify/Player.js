export default async function Player(accessToken) {
  try {
    const response = await fetch(`https://api.spotify.com/v1/me/player`, {
      headers: { Authorization: `Bearer ${accessToken}` }, // Notez les backticks autour de la valeur de l'en-tête
    });
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err.status);
    return null; // Gestion d'erreur : vous pouvez retourner null ou gérer l'erreur comme vous le souhaitez
  }
}
