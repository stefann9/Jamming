let accessToken;
const clientID = "";
const redirectURI = "http://localhost:3000/";
class Spotify {
  #baseEndPoint = "https://api.spotify.com/v1/";
  getAccessToken() {
    if (accessToken) return accessToken;
    let accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    let expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      let url = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = url;
    }
  }

  async search(searchTerm) {
    const accessTocken = this.getAccessToken();
    const response = await fetch(
      `${this.#baseEndPoint}search?type=track&q=${searchTerm}`,
      {
        headers: { Authorization: `Bearer ${accessTocken}` },
      }
    );
    if (response.ok) {
      const responseJSON = await response.json();
      if (!responseJSON.tracks.items) return [];
      else {
        return responseJSON.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
      }
    }
  }
}

export const spotify = new Spotify();
