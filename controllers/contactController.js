const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModels")

const getContact = asyncHandler(async (req,res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
})

const createContact = asyncHandler(async (req,res) =>{
    console.log("contact is ", req.body)
    const {name, email, phone} = req.body

    if(!name || !email || !phone){
        res.status(400)
        throw new Error("All fields are mandatory")
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
    })
    res.status(201).json(contact);
})

const getIndContact = asyncHandler(async (req,res) =>{
    const contacts = await Contact.findById(req.params.id);
    console.log(contacts)
    if(!contacts) {
        res.status(404)
        throw new Error("Contact not found");
    }
    res.status(200).json(contacts);
})

const updateContact = asyncHandler(async (req,res) =>{

    const contact = await Contact.findById(req.params.id)

    if(!contact) {
        res.status(404)
        throw new Error("Contact not found")
    }

    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true}
    );

    res.status(200).json(updateContact);
})

const deleteContact = asyncHandler(async (req,res) =>{
    const contact = await Contact.findById(req.params.id)
    
    if(!contact) {
        res.status(404)
        console.log("delete request")
        throw new Error("Contact not found")
    }

    await Contact.deleteOne()
    res.status(200).json(contact);
})


module.exports = {getContact, createContact, getIndContact, updateContact, deleteContact};