import SearchTracksById from "@/spotify/SearchTracksById"
import { useEffect } from "react"


export default function Tracks() {

useEffect(() => {
    SearchTracksById(accessToken, artistId)
    
}, [])




    return (
        <div>
            <h1>Tracks</h1>
            
        </div>
    )
}