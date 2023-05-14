const usersList = [];

const getIndividualRoomUsers = (room) => {
  return usersList.filter((user) => user.room === room);
};

const AddNewUser = (user) => {
  usersList.push(user);
  return usersList;
};

const removeUserFromRoom = (socketId) => {
  const index = usersList.findIndex((user) => user.id === socketId);

  if (index !== -1) {
    return usersList.splice(index, 1)[0];
  }
};

const formatMessage = (userName, text) => {
  const now = new Date();

  // Get the current hours and minutes
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const time = hours + ":" + minutes;

  return {
    userName,
    text,
    time,
  };
};

module.exports = {
  getIndividualRoomUsers,
  AddNewUser,
  removeUserFromRoom,
  formatMessage,
};
