let accessToken;
const clientID = "";
const redirectURI = "http://localhost:3000/";
class Spotify {
  #baseEndPoint = "https://api.spotify.com/v1";
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
      `${this.#baseEndPoint}/search?type=track&q=${searchTerm}`,
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

  async getUserId(headers) {
    const response = await fetch(`${this.#baseEndPoint}/me`, {
      headers: headers,
    });
    if (response.ok) {
      const responseJSON = await response.json();
      if (responseJSON.id) return responseJSON.id;
    }
  }

  async savePlaylist(name, trackURIs, playlistID) {
    if (!name || !trackURIs) return;
    const accessToken = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    if (playlistID) {
      return fetch(`${this.#baseEndPoint}/playlists/${playlistID}/tracks`, {
        headers: headers,
        method: "PUT",
        body: JSON.stringify({ uris: trackURIs }),
      });
    } else {
      const userID = await this.getUserId(headers);
      if (!userID) return;
      const response = await fetch(
        `${this.#baseEndPoint}/users/${userID}/playlists`,
        {
          headers: headers,
          method: "POST",
          body: JSON.stringify({ name: name }),
        }
      );
      if (response.ok) {
        const responseJSON = await response.json();
        const playlistID = responseJSON.id;
        await fetch(`${this.#baseEndPoint}/playlists/${playlistID}/tracks`, {
          headers: headers,
          method: "POST",
          body: JSON.stringify({ uris: trackURIs }),
        });
      }
    }
  }

  async getUserPlaylists() {
    const accessToken = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const userID = await this.getUserId(headers);
    const response = await fetch(
      `${this.#baseEndPoint}/users/${userID}/playlists`,
      {
        headers: headers,
        method: "GET",
      }
    );
    if (response.ok) {
      const responseJSON = await response.json();
      if (responseJSON) {
        return responseJSON.items.map((playlist) => ({
          name: playlist.name,
          id: playlist.id,
        }));
      }
    }
  }
  async getUserPlaylistTracks(playlistID) {
    const accessToken = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await fetch(
      `${this.#baseEndPoint}/playlists/${playlistID}/tracks`,
      {
        headers: headers,
        method: "GET",
      }
    );
    if (response.ok) {
      const responseJSON = await response.json();
      return responseJSON.items.map((item) => ({
        id: item.track.id,
        name: item.track.name,
        artist: item.track.artists[0].name,
        album: item.track.album.name,
        uri: item.track.uri,
      }));
    }
  }
}

export const spotify = new Spotify();
