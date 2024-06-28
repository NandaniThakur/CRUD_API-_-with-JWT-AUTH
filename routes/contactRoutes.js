// Routes :   they only have the job of routing for the webspp, just that only.  
//             to make that for which link wht we have to do.



const express = require("express");
const router = express.Router();
const {getContacts, 
    createContact,
    getContact,
    updateContact,
    deleteContact,} = require("../controllers/contactControllers");
const validateToken = require("../middleare/validateTokenHandler");

    router.use(validateToken);
    router.route("/").get(getContacts).post(createContact);
    router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

    //  this is also a way to 
// router.route("/").get(getContacts);
// router.route("/:id").get(getContact);
// router.route("/").post(createContact);
// router.route("/:id").put(updateContact);
// router.route("/:id").delete(deleteContact);

module.exports = router; 




//  WITH ONLY ROUTE / A WAY TO CREATE RUTES

// const express = require("express");
// const router = express.Router();

// router.route("/").get((req,res) => {
//     res.status(200).json({message : "get all clients"});
// });
// router.route("/:id").get((req,res) => {
//     res.status(200).json({message : `get client contacts for ${req.params.id}`});
// });
// router.route("/").post((req,res) => {
//     res.status(200).json({message : "Create  clients"});
// });
// router.route("/:id").put((req,res) => {
//     res.status(200).json({message : `update client contacts for ${req.params.id}`});
// });
// router.route("/:id").delete((req,res) => {
//     res.status(200).json({message : `Delete clients for ids ${req.params.id}`});
// });
// module.exports = router; 