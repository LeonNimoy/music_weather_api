import axios from 'axios'

import { MusicProviderAdapter } from './music-provider'

describe('Music Provider Adapter', () => {
  test('should return a playlist from Spotify service', async () => {
    const genre = 'any_genre'
    const sut = new MusicProviderAdapter(axios)

    const playlist = await sut.load(genre)
    expect(playlist).toEqual(['any_song', 'any_song2'])
  })
})
