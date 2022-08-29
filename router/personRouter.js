var express = require('express');
var router = express.Router();
var controller = require('../controllers/personController');

router.get('/', controller.getAllPeople);
router.get('/add-person', controller.addPerson);
router.get('/deleteAll', controller.deleteAll);
router.get('/edit/:id', controller.editPersonGET);
router.post('/edit/:id', controller.editPersonPOST);
router.get('/remove/:id', controller.deletePerson);

module.exports = router;