const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "061be44bbce74086be13e8a17fa07196";
const isProd = process.env.NODE_ENV=== "production"
const host = "https://ug7-server.onrender.com"
const redirectUri= `${isProd ? host : 'http://localhost:3000 '}/callback`;
const scopes = [ "user-read-email", "user-read-private", "playlist-modify-public", "playlist-modify-private", "playlist-read-private", "ugc-image-upload"]
// const scopes =["streaming", "user-library-read", "playlist-read-private", "user-read-playback-state", "user-modify-playback-state", "user-read-currently-playing"];

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

 