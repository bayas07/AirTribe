const UserList = ({ users = [], setReceiverIdHandler }) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <button onClick={() => setReceiverIdHandler(user.id)}>
            {user.userName}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
