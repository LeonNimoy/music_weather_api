import { Router } from 'express'

export default (router: Router): void => {
  router.get('/', async (req, res) => {
    res.status(200).json('Bem vindo ao Music Weather API! Acesse a rota playlist para buscar uma lista de músicas.')
  })
}
