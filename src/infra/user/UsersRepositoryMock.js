const UserMapper = require('./SequelizeUserMapper');

class SequelizeUsersRepository {
  constructor({ UserModel }) {
    this.UserModel = UserModel;
    this.users = [
      { dataValues: { id: 1, name: 'Frederick Marshall' } },
      { dataValues: { id: 2, name: 'Adeline Rice' } },
      { dataValues: { id: 3, name: 'Roxie Todd' } },
      { dataValues: { id: 4, name: 'Callie Bowman' } },
      { dataValues: { id: 5, name: 'Bettie Bishop' } },
      { dataValues: { id: 6, name: 'Max Barrett' } },
      { dataValues: { id: 7, name: 'Adelaide Brown' } },
      { dataValues: { id: 8, name: 'Etta Howell' } },
      { dataValues: { id: 9, name: 'Eleanor Scott' } },
      { dataValues: { id: 10, name: 'Josie Marshall' } },
      { dataValues: { id: 11, name: 'Myra Payne' } },
      { dataValues: { id: 12, name: 'Alex Fuller' } },
      { dataValues: { id: 13, name: 'Jessie Gibson' } },
      { dataValues: { id: 14, name: 'Derrick Carr' } },
      { dataValues: { id: 15, name: 'Benjamin White' } },
      { dataValues: { id: 16, name: 'Agnes Salazar' } },
      { dataValues: { id: 17, name: 'Joshua Greer' } },
      { dataValues: { id: 18, name: 'Scott Long' } },
      { dataValues: { id: 19, name: 'Sue Brock' } },
      { dataValues: { id: 20, name: 'Cecilia May' } },
    ];
  }

  async getAll(/*...args*/) {
    return this.users.map(UserMapper.toEntity);
  }

  async getById(id) {
    const user = this.users.find(u => u.dataValues.id == id);

    return UserMapper.toEntity(user);
  }

  async add(user) {
    const { valid, errors } = user.validate();

    if (!valid) {
      const error = new Error('ValidationError');
      error.details = errors;

      throw error;
    }

    await this.users.push(UserMapper.toDatabase(user));
    return UserMapper.toEntity(user);
  }

  async remove(id) {
    const userIndex = await this.users.findIndex(u => u.dataValues.id == id);

    await this.users.splice(userIndex, 1);
    return;
  }

  async update(id, newData) {
    const userIndex = await this.users.findIndex(u => u.dataValues.id == id);

    try {
      this.users[userIndex] = newData;
      const updatedUser = newData;
      const userEntity = UserMapper.toEntity(updatedUser);

      const { valid, errors } = userEntity.validate();

      if (!valid) {
        const error = new Error('ValidationError');
        error.details = errors;

        throw error;
      }

      return userEntity;
    } catch (error) {
      throw error;
    }
  }

  async count() {
    return await this.UserModel.count();
  }

  // Private

  async _getById(id) {
    try {
      return await this.UserModel.findById(id, { rejectOnEmpty: true });
    } catch (error) {
      if (error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `User with id ${id} can't be found.`;

        throw notFoundError;
      }

      throw error;
    }
  }
}

module.exports = SequelizeUsersRepository;
