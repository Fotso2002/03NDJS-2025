const users = [];

class User {
  static findByEmail(email) {
    return users.find(user => user.email === email);
  }

  static findById(id) {
    return users.find(user => user.id === id);
  }

  static create(userData) {
    const user = { id: Date.now().toString(), ...userData };
    users.push(user);
    return user;
  }

  static getAll() {
    return users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  static delete(id) {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
      return users.splice(index, 1)[0];
    }
    return null;
  }
}

module.exports = User;