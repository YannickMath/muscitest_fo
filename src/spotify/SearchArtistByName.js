
    export default async function SearchArtistByName(accessToken, artistName) {
        if(!artistName) return 
        else {

          const url = `https://api.spotify.com/v1/search?q=${artistName}&type=artist`;
      
          const response = await fetch(url, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }).catch((error) => console.error("Erreur de réseau:", error));
      
          if (response && response.ok) {
            const data = await response.json();
            return data.artists.items; // Retourne une liste d'artistes correspondant au nom de recherche
            console.log("artists list", data.artists.items);
          } else if (response) {
            console.error("Erreur:", response.status, response.statusText);
            return null;
          }
        }
        
      };
    