const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getSingleUserById,
  deleteUser,
  updateUserById,
  createNewUser,
  getSubDetailsById,
} = require("../controllers/user-controller");

/**
 * Route: /users or /users/
 * TYPE: GET
 * Description: GET all users
 * Access: Public
 * Parameters: None
 */
router.get("/", getAllUsers);

/**
 * Route: /users/:id
 * TYPE: GET
 * Description: GET user details by id
 * Access: Public
 * Parameters: id
 */
router.get("/:id", getSingleUserById);

/**
 * Route: /users/:id
 * TYPE: DELETE
 * Description: deleting user by id
 * Access: Public
 * Parameters: id
 */
router.delete("/:id", deleteUser);

/**
 * Route: /users/:id
 * TYPE: PUT
 * Description: Update a user details by id
 * Access: Public
 * Parameters: id
 */
router.put("/:id", updateUserById);

/**
 * Route: /users
 * TYPE: POST
 * Description: Create/Add new user
 * Access: Public
 * Parameters: none
 * Data: id, name, surname, email, subscriptionType, subscriptionDate
 */
router.post("/", createNewUser);

/**
 * Route: /users/subscription-details/:id
 * TYPE: GET
 * Description: Get specific users subscription details
 * Access: Public
 * Parameters: id
 */
router.get("/subscription-details/:id", getSubDetailsById);

module.exports = router;
