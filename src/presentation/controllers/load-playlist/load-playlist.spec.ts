import { LoadPlayListController } from './load-playlist'
import { MissingQueryError, ServerError } from '../../errors'
import { WeatherProvider } from './load-playlist-protocols'
// import { MusicProviderService } from '../../services/music-provider'

interface SutTypes {
  sut: LoadPlayListController
  weatherProviderStub: WeatherProvider
}

const makeWeatherProvider = (): WeatherProvider => {
  class WeatherProviderStub implements WeatherProvider {
    async loadUsingCity (city: string): Promise<number> {
      return 1
    }

    async loadUsingGeographicalCoordinates (lat: string): Promise<number> {
      return 1
    }
  }
  return new WeatherProviderStub()
}

const makeSut = (): SutTypes => {
  const weatherProviderStub = makeWeatherProvider()
  const sut = new LoadPlayListController(weatherProviderStub)
  return {
    sut,
    weatherProviderStub
  }
}

describe('Load Playlist Controller', () => {
  test.skip('should return 200 if a valid city data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      query: {
        city: 'any_city'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(['any_music'])
  })

  test.skip('should return 200 if a valid geographic coordinates are provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      query: {
        lat: '123',
        long: '456'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(['any_music'])
  })

  test('should return 400 if no city name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      query: {
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingQueryError())
  })

  test('should return 400 if no geographical coordinates are provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      query: {
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingQueryError())
  })

  test('should call WeatherProvider with correct city query', async () => {
    const { sut, weatherProviderStub } = makeSut()
    const loadSpy = jest.spyOn(weatherProviderStub, 'loadUsingCity')
    const httpRequest = {
      query: {
        city: 'any_city'
      }
    }
    await sut.handle(httpRequest)
    expect(loadSpy).toHaveBeenCalledWith('any_city')
  })

  test('should call WeatherProvider with the correct geographical coordinates query', async () => {
    const { sut, weatherProviderStub } = makeSut()
    const loadSpy = jest.spyOn(weatherProviderStub, 'loadUsingGeographicalCoordinates')
    const httpRequest = {
      query: {
        lat: '123',
        long: '456'
      }
    }
    await sut.handle(httpRequest)
    expect(loadSpy).toHaveBeenCalledWith('123', '456')
  })

  test('should return 500 if WeatherProvider, receives a city but throws', async () => {
    const { sut, weatherProviderStub } = makeSut()
    jest.spyOn(weatherProviderStub, 'loadUsingCity').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })

    const httpRequest = {
      query: {
        city: 'any_city'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('should return 500 if WeatherProvider, receives geographical coordinates but throws', async () => {
    const { sut, weatherProviderStub } = makeSut()
    jest.spyOn(weatherProviderStub, 'loadUsingGeographicalCoordinates').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })

    const httpRequest = {
      query: {
        lat: '123',
        long: '456'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test.skip('should call Music Provider Service with correct temperature query', async () => {
    const { sut, weatherProviderStub } = makeSut()
    // const loadSpy = jest.spyOn(musicProviderServiceStub, 'loadPlaylist')
    const httpRequest = {
      query: {
        city: 'any_city'
      }
    }

    await sut.handle(httpRequest)

    const cityTemperature = await weatherProviderStub.loadUsingCity(httpRequest.query.city)

    expect(1).toHaveBeenCalledWith(cityTemperature)
  })

  test.skip('should return 500 if MusicProvider throws', async () => {
    const { sut } = makeSut()
    // jest.spyOn(musicProviderServiceStub, 'loadPlaylist').mockImplementationOnce(async () => {
    //   return await new Promise((resolve, reject) => reject(new Error()))
    // })

    const httpRequest = {
      query: {
        city: 'any_city'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
