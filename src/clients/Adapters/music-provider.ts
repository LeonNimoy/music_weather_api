import 'dotenv/config'
import fetch from 'node-fetch'

import env from '../../main/config/env'
import { MusicProvider } from '../../presentation/protocols/music-provider'

export class MusicProviderAdapter implements MusicProvider {
  public async load (playlistGenre: string): Promise<string[]> {
    try {
      const getSpotifyAccessToken = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${env.spotifyClienteCredentialsBase64Format}`
        },
        body: 'grant_type=client_credentials'
      })

      const getSpotifyAccessTokenResponse = await getSpotifyAccessToken.json()

      const accessToken = getSpotifyAccessTokenResponse.access_token

      const getSpotifyGenrePlaylists = await fetch(`https://api.spotify.com/v1/browse/categories/${playlistGenre}/playlists?limit=5`, {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + accessToken }
      })

      const getSpotifyGenrePlaylistResponse = await getSpotifyGenrePlaylists.json()

      const getSpotifyGenrePlaylistsQuantity = await getSpotifyGenrePlaylistResponse.playlists.items.length

      const selectSpotifyPlaylist = Math.floor(Math.random() * getSpotifyGenrePlaylistsQuantity)

      const getSpotifyPlaylist = await fetch(`https://api.spotify.com/v1/playlists/${getSpotifyGenrePlaylistResponse.playlists.items[selectSpotifyPlaylist].id}/tracks?fields=items(track(name))&limit=10`, {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + accessToken }
      })

      const playlist = await getSpotifyPlaylist.json()
      return playlist
    } catch (error) {
      console.error(error)
    }
  }
}
