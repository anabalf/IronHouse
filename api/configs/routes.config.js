const express = require("express");
const router = express.Router();
const properties = require("../controllers/properties.controller");
const users = require("../controllers/users.controller");
const secure = require('../middlewares/auth.middleware');

router.post('/new-property', properties.create);
router.get('/properties', secure.checkAuth, properties.list);
router.get('/properties/:id', secure.checkAuth, properties.detail);
router.patch('/properties/:id', properties.update);
router.delete('/properties/:id', properties.delete);

router.post("/users", users.create);
router.post("/login", users.login);
router.get("/profile", secure.checkAuth, users.profile);

module.exports = router;