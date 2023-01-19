const router=require('express').Router()
const userwithpost=require('../controller/postwithuser')

router.post('/save',userwithpost.add)
router.get('/got',userwithpost.fetch)
router.put('/modify',userwithpost.recordupdate)
router.delete('/move',userwithpost.remove)

module.exports=router