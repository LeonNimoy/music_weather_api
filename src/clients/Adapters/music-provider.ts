/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { AxiosStatic } from 'axios'

// import Base64 from 'crypto-js/enc-base64'

// import env from '../../main/config/env'
import { MusicProvider } from '../../presentation/protocols/music-provider'

export class MusicProviderAdapter implements MusicProvider {
  private readonly request: AxiosStatic
  private readonly spotifyBaseUrl: 'https://accounts.spotify.com'
  private readonly tracksQuantityLimit: '10'

  constructor (request: AxiosStatic) {
    this.request = request
  }

  public async load (playlistGenre: string): Promise<string[]> {
    // try {
    // const getToken = await this.request.post(`${this.spotifyBaseUrl}/api/token`, 'grant_type=client_credentials', {
    //   headers: {
    //     Authorization: 'Basic' + Base64.parse(`${env.spotifyClienteID}:${env.spotifyClienteSECRETE}`)
    //   }
    // })

    // const { data } = await this.request.get(`${this.spotifyBaseUrl}/v1/browaw/browse/categories/${playlistGenre}/playlists?limit=${this.tracksQuantityLimit}`, {
    //   headers: {
    //     Authorization: `Bearer ${getToken}`
    //   }
    // })

    // console.log(getToken)
    // console.log(data)
    return ['any_song', 'any_song2']
    // } catch (error) {
    //   console.log(error)
    // }
  }
}
