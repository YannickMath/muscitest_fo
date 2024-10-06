export default function SpConnection(setAccessToken) {
  const url = "https://accounts.spotify.com/api/token";

  const details = {
    grant_type: process.env.NEXT_PUBLIC_GRANT_TYPE,
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  };

  const formBody = Object.keys(details)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(details[key])
    )
    .join("&");
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formBody,
  })
    .then((response) => response.json())
    .then((data) => {
      setAccessToken(data.access_token);
      console.log("Connecté à Spotify");
    })
    .catch((error) => {
      console.error("Erreur:", error);
    });
}
