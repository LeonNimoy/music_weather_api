import axios from 'axios'

import { WeatherProviderAdapter } from './weather-provider'

describe('Weather Provider Adapter', () => {
  test('should return a temperature from Open Weather service, passing city name as param', async () => {
    const city = 'any_city'

    jest.spyOn(axios, 'get').mockResolvedValue({
      data: {
        main: {
          temp: 12
        }
      }
    })

    const sut = new WeatherProviderAdapter(axios)
    const temperature = await sut.loadUsingCity(city)
    expect(temperature).toEqual(12)
  })
})
