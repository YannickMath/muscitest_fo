export default function SpConnection(setAccessToken) {
  const url = "https://accounts.spotify.com/api/token";
  // const details = {
  //   grant_type: "client_credentials",
  //   client_id: "d0306f99a510453b92114c2664e40564",
  //   client_secret: "a22d1260816a408fb0a1dff05c98565b",
  // };
  const details = {
    grant_type: process.env.NEXT_PUBLIC_GRANT_TYPE, // Récupération de la valeur de la variable d'environnement
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID, // Récupération de la valeur de la variable d'environnement
    client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET, // Récupération de la valeur de la variable d'environnement
  };

  const formBody = Object.keys(details)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(details[key])
    )
    .join("&");
  console.log("formBody", formBody);
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formBody,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
      setAccessToken(data.access_token); // Mise à jour de l'état accessToken
      console.log("Connecté à Spotify");
    })
    .catch((error) => {
      console.error("Erreur:", error);
    });
}
