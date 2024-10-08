export default async function Player(accessToken) {
  try {
    const response = await fetch(`https://api.spotify.com/v1/me/player`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = await response.json();
  } catch (err) {
    console.log(err.status);
    return null;
  }
}
