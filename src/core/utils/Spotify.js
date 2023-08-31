import { httpClient } from "../httpClient/HttpClient";
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
    try {
      const url = `${this.#baseEndPoint}/search?type=track&q=${searchTerm}`;
      const accessTocken = this.getAccessToken();
      const headers = { Authorization: `Bearer ${accessTocken}` };

      const response = await httpClient.get(url, headers);
      if (response) return response;
    } catch (e) {
      console.error(e);
    }
  }

  async getUserId(headers) {
    try {
      const url = `${this.#baseEndPoint}/me`;

      const response = await httpClient.get(url, headers);
      if (response) return response;
    } catch (e) {
      console.error(e);
    }
  }

  async savePlaylist(name, trackURIs, playlistID) {
    if (!name || !trackURIs.length) return;
    try {
      const accessToken = this.getAccessToken();
      const headers = { Authorization: `Bearer ${accessToken}` };

      if (playlistID) {
        const urlUpdatePlaylist = `${
          this.#baseEndPoint
        }/playlists/${playlistID}/tracks`;
        const bodyUpdatePlaylist = { uris: trackURIs };

        return httpClient.put(urlUpdatePlaylist, headers, bodyUpdatePlaylist);
      } else {
        const { id: userID } = await this.getUserId(headers);
        if (!userID) return;

        const urlPostNewPlaylist = `${
          this.#baseEndPoint
        }/users/${userID}/playlists`;
        const bodyPostNewPlaylist = { name: name };

        const { id: playlistID } = await httpClient.post(
          urlPostNewPlaylist,
          headers,
          bodyPostNewPlaylist
        );

        if (playlistID) {
          const urlPostTracks = `${
            this.#baseEndPoint
          }/playlists/${playlistID}/tracks`;
          const bodyPostTracks = { uris: trackURIs };

          await httpClient.post(urlPostTracks, headers, bodyPostTracks);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  async getUserPlaylists() {
    try {
      const accessToken = this.getAccessToken();
      const headers = { Authorization: `Bearer ${accessToken}` };

      const { id: userID } = await this.getUserId(headers);
      if (!userID) return;
      const urlGetPlaylists = `${this.#baseEndPoint}/users/${userID}/playlists`;

      const userPlaylists = await httpClient.get(urlGetPlaylists, headers);
      return userPlaylists;
    } catch (e) {
      console.error(e);
    }
  }

  async getUserPlaylistTracks(playlistID) {
    try {
      const accessToken = this.getAccessToken();
      const headers = { Authorization: `Bearer ${accessToken}` };
      const urlGetTracks = `${
        this.#baseEndPoint
      }/playlists/${playlistID}/tracks`;

      const tracks = await httpClient.get(urlGetTracks, headers);
      return tracks;
    } catch (e) {
      console.error(e);
    }
  }
}

export const spotify = new Spotify();
