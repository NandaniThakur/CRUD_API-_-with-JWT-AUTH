const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
// asyncHandler do the job of try catch for the async, express has a inbuilt function named as express-async-handler which do this try catch job for async automatically.
// @desc Get all Contacts
// @route Get /api/contacts
// @access Private
const getContacts = asyncHandler(async (req,res) => {
    const getcontacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(getcontacts);
});

// @desc create new Contacts
// @route Post /api/contacts
// @access Private
const createContact = asyncHandler(async (req,res) => {
     console.log("enter your data, req body",req.body);
     const {name,email, phone_no} = req.body;
     if(!name || !email || !phone_no) {
        res.status(400);
        throw new Error("all fields are mendatory ");
     }
     const createcontact = await Contact.create({
        name,
        email,
        phone_no,
        user_id: req.user.id
     });

    res.status(201).json(createcontact);
})

// @desc Get  Contacts
// @route Get /api/contacts/:id
// @access Private

const getContact = asyncHandler(async (req,res) => {
    console.log("Fetching contact with ID:", req.params.id); // Debugging log
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("conatact not found");
    }
    res.status(201).json(contact);
});

// const getContact = asyncHandler(async (req, res) => {
//     const contactId = req.params.id;
//     console.log("Fetching contact with ID:", contactId); // Debugging log

//     // Validate the ID format
//     if (!contactId.match(/^[0-9a-fA-F]{24}$/)) {
//         res.status(400);
//         throw new Error("Invalid contact ID format");
//     }

//     // Fetch contact by ID
//     const contact = await Contact.findById(contactId);
//     if (!contact) {
//         res.status(404);
//         throw new Error("Contact not found");
//     }

//     res.status(200).json(contact);
// });



// @desc update Contacts
// @route Put /api/contacts/:id
// @access Private
const updateContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }

    if(contact.user_id.toString() != req.user.id) {
        res.status(403);
        throw new Error("user cannot modify or altr other users details");
    }

    const updatecontact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true}
    );
    res.status(201).json(updatecontact);
});

// @desc Delete all Contacts
// @route Delete/api/contacts
// @access Private
const deleteContact = asyncHandler(async (req, res) => {
    console.log("Delete route hit with ID:", req.params.id); // Debugging log
    
    try {
        // Check if contact exists
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        if(contact.user_id.toString() != req.user.id) {
            res.status(403);
            throw new Error("user cannot modify or altr other users details");
        }
        
        // Perform delete operation
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedContact) {
            return res.status(500).json({ message: "Failed to delete contact" });
        }
        
        console.log("Contact deleted:", deletedContact); // Debugging log
        res.status(200).json({ message: "Contact deleted successfully", deletedContact });
    } catch (error) {
        console.error("Error deleting contact:", error);
        res.status(500).json({ message: "Failed to delete contact", error: error.message });
    }
});



module.exports = {
    getContacts, 
    createContact,
    getContact,
    updateContact,
    deleteContact,
};


// // asyncHandler do the job of try catch for the async, express has a inbuilt function named as express-async-handler which do this try catch job for async automatically.
// // @desc Get all Contacts
// // @route Get /api/contacts
// // @access public
// const getContacts = asyncHandler(async (req,res) => {
//     res.status(200).json({message : "get all clients"});
// });

// // @desc create new Contacts
// // @route Post /api/contacts
// // @access public
// const createContact = asyncHandler(async (req,res) => {
//      console.log("enter your data, req body",req.body);
//      const {name,email, phone_no} = req.body;
//      if(!name || !email || !phone_no) {
//         res.status(400);
//         throw new Error("all fields are mendatory ")

//      }


//     res.status(201).json({message : "Create  clients"});
// })

// // @desc Get  Contacts
// // @route Get /api/contacts/:id
// // @access public
// const getContact = asyncHandler(async (req,res) => {
//     res.status(201).json({message : `get client contacts for ${req.params.id}`});
// });

// // @desc update Contacts
// // @route Put /api/contacts/:id
// // @access public
// const updateContact = asyncHandler(async (req,res) => {
//     res.status(201).json({message : `update client contacts for ${req.params.id}`});
// });

// // @desc Delete all Contacts
// // @route Delete/api/contacts
// // @access public
// const deleteContact = asyncHandler(async (req,res) => {
//     res.status(200).json({message : `Delete clients for ids ${req.params.id}`});
// });


// module.exports = {
//     getContacts, 
//     createContact,
//     getContact,
//     updateContact,
//     deleteContact,
// };