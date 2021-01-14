import { Router } from 'express'
import { RouteControllerAdapter } from '../adapters/route-controller-adapter'
import { makeLoadPlaylistController } from '../factories/controllers/playlist-controller-factory'

const routeControllerAdapter = new RouteControllerAdapter()

export default (router: Router): void => {
  router.get('/playlist', async (req, res) => {
    await routeControllerAdapter.adapt(makeLoadPlaylistController(), req, res)
  })
}
