// Write your "actions" router here!
const express = require('express')
const router = express.Router()
const {
    validateAction,
    validateId
} = require('./actions-middlware')
const Actions = require('./actions-model')


router.get('/', async (req, res, next) => {
    try {
        const result = await Actions.get()
        res.json(result)
    } catch(err) {
        next(err)
    }
})

router.get('/:id', validateId, async (req, res, next) => {
    try {
        const result = await Actions.get(req.params.id)
        res.json(result)
    } catch(err) {
        next(err)
    }
})

router.post('/', validateAction, async (req, res, next) => {
    try {
        const result = await Actions.insert(req.body)
        res.status(201).json(result)
    } catch(err) {
        next(err)
    }
})

router.put('/:id', validateAction, validateId, async (req, res, next) => {
    try{
        const result = await Actions.update(req.params.id, req.valid)
        res.json(result)
    } catch(err) {
        next(err)
  }
})



router.delete('/:id', validateId, async (req, res, next) => {
    try {
        const result = await Actions.remove(req.params.id)
        res.json(result)
    } catch(err) {
        next(err)
    }
})

module.exports = router