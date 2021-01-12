/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { AdapterControllerRoute } from '../adapters/express-route-adapter'
import { makeLoadPlaylistController } from '../factories/controllers/playlist-controller-factory'

const adapterControllerRoute = new AdapterControllerRoute()

export default (router: Router): void => {
  router.get('/', async (req, res) => {
    await adapterControllerRoute.adapt(makeLoadPlaylistController(), req, res)
  })
}
