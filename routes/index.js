const router = require('express').Router()

router.get('/', (req,res) => {
    res.send(console.log('asdfa'))
})

module.exports = router