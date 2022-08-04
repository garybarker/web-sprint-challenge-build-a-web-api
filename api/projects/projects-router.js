// Write your "projects" router here!
const express = require('express')
const router = express.Router()
const { validateId, validateProject, validateUpdate } = require('./projects-middleware')

const Projects = require('./projects-model')

router.get('/', async (req, res, next) => {
  try {
      const result = await Projects.get()
      res.json(result)
  } catch(err){
      next(err)
  }
})


router.get('/:id', validateId, async (req, res, next) => {
  try {
      const result = await Projects.get(req.params.id)
      res.json(result)
  } catch(err) {
      next(err)
  }



router.post('/', validateProject, async (req, res, next) => {
  try{
      const result = await Projects.insert(req.body)
      res.status(201).json(result)
  } catch(err) {
      next(err)
  }
})


router.put('/:id', validateProject, validateId, validateUpdate, async (req, res, next) => {
    try {
        const result = await Projects.update(req.params.id, req.valid)
        res.status(200).json(result)
    } catch(err) {
        next(err)
    }
})


router.delete('/:id', validateId, async (req, res, next) => {
    try {
        const result = await Projects.remove(req.params.id)
        res.json(result)
    } catch(err) {
        next(err)
    }
})


router.get('/:id/actions', validateId, async (req, res, next) => {
    try {
        const result = await Projects.getProjectActions(req.params.id)
        res.json(result)
    } catch(err) {
        next(err)
    }
})
})


module.exports = router