export class UserModel {
  constructor(email, password, name, employeeNumber) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.employeeNumber = employeeNumber;
  }
}

module.exports = UserModel;
