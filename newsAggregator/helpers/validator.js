class Validator {
  static validateUserSignUp(users, newUser) {
    const { name, email, password } = newUser;
    if (name && email && password) {
      if (!this.validateEmail(email)) {
        return { status: false, message: "Incorrect email" };
      }
      if (this.validateUserExist(users, newUser)) {
        return { status: false, message: "Email id already exists" };
      }
      if (!(password.length >= 6)) {
        return {
          status: false,
          message: "Password should have minimum six characters",
        };
      }
      return { status: true };
    } else {
      return {
        status: false,
        message: "Some properties are missing, please provide required details",
      };
    }
  }

  static validateUserSignIn(users, userCred) {
    const { email, password } = userCred;
    if (email && password) {
      if (!this.validateEmail(email)) {
        return { status: false, message: "Incorrect email" };
      }
      if (!this.validateUserExist(users, userCred)) {
        return { status: false, message: "Email id not found", resStatus: 404 };
      }
      return { status: true };
    } else {
      return {
        status: false,
        message: "Some properties are missing, please provide required details",
      };
    }
  }

  static validateUserExist(users, newUser) {
    return users.some((task) => task.email === newUser.email);
  }

  static validateEmail(email) {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  }
}

module.exports = Validator;
