const express = require("express")
const router = express.Router();

const { getContact, createContact, getIndContact, updateContact, deleteContact } = require("../controllers/contactController") 

router.get("/", getContact)

router.get("/:id",getIndContact )

router.post("/", createContact )

router.put("/:id", updateContact)

router.delete("/:id", deleteContact)

module.exports = router