const express = require("express");
const { users } = require("../data/users.json");

const router = express.Router();

/**
 * Route: /users
 * TYPE: GET
 * Description: Get all users
 * Access: Public
 * Parameters: None
 */
router.get("/", (req, res) => {
  res.status(200).json({ success: true, data: users });
});

/**
 * Route: /users/:id
 * TYPE: GET
 * Description: Get user by id
 * Access: Public
 * Parameters: id
 */
router.get("/:id", (req, res) => {
  const user = users.filter((each) => each.id === req.params.id);

  if (user.length === 0)
    return res.status(404).json({ success: false, message: "User not found" });

  res.status(200).json({ success: true, data: user });
});

/**
 * Route: /users/subscription-details/:id
 * TYPE: GET
 * Description: Get all users subscription details
 * Access: Public
 * Parameters: id
 */
router.get("/subscription-details/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => {
    return each.id === id;
  });

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const getDateInDays = (data = "") => {
    let date;
    if (data === "") {
      date = new Date();
    } else {
      date = new Date(data);
    }
    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };

  const subscriptionType = (date) => {
    if (user.subscriptionType === "Basic") {
      date = date + 90;
    } else if (user.subscriptionType === "Standard") {
      date = date + 180;
    } else if (user.subscriptionType === "Premium") {
      date = date + 365;
    }
    return date;
  };

  // Subscription expiration calculation
  // The number of milliseconds that have elapsed since midnight on January 1, 1970, UTC.
  let returnDate = getDateInDays(user.returnDate);
  let currentDate = getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDate);

  console.log(returnDate, currentDate);

  const data = {
    ...user,
    email: undefined,
    subscriptionExpired: subscriptionExpiration < currentDate,
    daysLeftForExpiration:
      subscriptionExpiration <= currentDate
        ? 0
        : subscriptionExpiration - currentDate,
    fine:
      returnDate < currentDate
        ? subscriptionExpiration <= currentDate
          ? 200
          : 100
        : 0,
  };

  res.status(200).json({ success: true, data });
});

/**
 * Route: /users
 * TYPE: POST
 * Description: Create new user
 * Access: Public
 * Parameters:
 */
router.post("/", (req, res) => {
  // another approach of getting data from user
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body.data;
  const user = users.find((each) => each.id === id);
  if (user) {
    return res
      .status(409)
      .json({ success: false, message: "User already exists" });
  }
  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });
  res.status(201).json({ success: true, data: users });
});

/**
 * Route: /users/:id
 * TYPE: PUT
 * Description: Update a user details
 * Access: Public
 * Parameters: id
 */
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const user = users.find((each) => each.id === id);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  // const index = users.indexOf(user);

  const updatedUser = users.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });

  return res.status(200).json({ success: true, data: updatedUser });
});

/**
 * Route: /users/:id
 * TYPE: DELETE
 * Description: Delete a user
 * Access: Public
 * Parameters: id
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  const index = users.indexOf(user);
  users.splice(index, 1);
  return res.status(200).json({ success: true, data: users });
});

module.exports = router;
