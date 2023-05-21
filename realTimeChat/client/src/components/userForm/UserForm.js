import "./UserForm.css";

const UserForm = ({ fnJoinRoom, user, room, handleSetUser, handleSetRoom }) => {
  const submitHandler = (event) => {
    event.preventDefault();
    if (user && room) {
      fnJoinRoom({ userName: user, room });
    }
  };

  return (
    <div className="join-container">
      <div className="join-header">
        <h1>
          <img
            src="https://www.airtribe.live/_nuxt/img/main.6cc64c7.svg"
            alt="airtribe-icon"
          />
          &nbsp;Airtribe
        </h1>
      </div>

      <div className="join-main">
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter username..."
              onChange={(event) => handleSetUser(event.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="room">Chat Channel</label>
            <select
              name="room"
              id="room"
              onChange={(event) => handleSetRoom(event.target.value)}
            >
              <option value="Backend">Backend Engineering </option>
              <option value="Product">Product Management</option>
              <option value="Sales">Sales</option>
              <option value="DevOps">Dev Ops</option>
            </select>
          </div>
          <div className="flex">
            <button type="submit" className="btn">
              Start Chat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
