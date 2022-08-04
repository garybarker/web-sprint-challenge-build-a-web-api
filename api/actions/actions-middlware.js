// add middlewares here related to actions
const Actions = require('./actions-model');

const validateId = (req, res, next) => {
    Actions.get(req.params.id)
    .then(action => {
        if (!action) {res.status(404).json({ message: `there are no projects with id: ${req.params.id}` })}
        if (action) { req.action = action }
        next();
    })
    .catch(err => res.status(500).json(err.message))
}

const validateAction = (req, res, next) => {
    const { notes, description, project_id } = req.body
    Actions.insert(req.body)
    .then(actionPost => {
        req.actionPost = actionPost
        next()
    })
    .catch(err => {
        if (!notes || !description || !project_id) {
            res.status(400).json({ message: "please provide notes, description, and project_id" })
            return;
        }
        res.status(500).json(err.message)
    })
}



module.exports = {
    validateId,
    validateAction
}