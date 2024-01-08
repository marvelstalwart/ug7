const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "061be44bbce74086be13e8a17fa07196";
const redirectUri= "http://ug7.vercel.app/callback";
const scopes = ["streaming", "user-read-email", "user-read-private", "user-read-playback-state", "user-modify-playback-state"]
// const scopes =["streaming", "user-library-read", "playlist-read-private", "user-read-playback-state", "user-modify-playback-state", "user-read-currently-playing"];

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

