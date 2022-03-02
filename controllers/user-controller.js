const { users } = require("../data/users.json");

exports.getAllUsers = (req, res) => {
  res.status(200).json({ success: true, data: users });
};

exports.getSingleUserById = (req, res) => {
  const { id } = req.params;
  // filter returns a array []
  const user = users.filter((each) => each.id === id);
  if (user.length === 0) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  res.status(200).json({ success: true, data: user });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  // returns a single element
  const user = users.find((each) => {
    return each.id === id;
  });
  // console.log(user);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  const index = users.indexOf(user);
  // console.log(index);
  // alphabet = ['a', 'b', 'c', 'd'];
  users.splice(index, 1);
  return res.status(200).json({ success: true, data: users });
};

exports.updateUserById = (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const user = users.find((each) => each.id === id);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

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
};

exports.createNewUser = (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body.data;

  const user = users.find((each) => each.id === id);
  if (user) {
    return res.status(409).json({
      success: false,
      message: "User already exists with this id, please use another id",
    });
  }

  users.push({
    id,
    name,
    surname,
    email,
    subscriptionDate,
    subscriptionType,
  });
  res.status(201).json({ success: true, data: users });
};

exports.getSubDetailsById = (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user)
    return res
      .status(404)
      .json({ success: false, message: "No user found with this id" });

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

  // subscription expirationn calculation
  // The number of milliseconds that have elapsed since midnight on January 1, 1970, UTC
  let returnDate = getDateInDays(user.returnDate);
  let currentDate = getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDate);

  console.log(
    returnDate,
    currentDate,
    subscriptionDate,
    subscriptionExpiration
  );

  const data = {
    ...user,
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
};
