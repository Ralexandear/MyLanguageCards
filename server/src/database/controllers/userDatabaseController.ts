import { UserRoleType } from "@shared/types/UserRoleType";
import { User } from "../models";

class UserDatabaseControllerClass {
  async findOrCreate (email: string, password: string, role: UserRoleType = 'user') {
    return User.findOrCreate({where: {_email: email}, defaults: {_email: email, _password: password, _role: role}}).then(([user, isNew]) => ({user, isNew}));
  }

  async find (email: string) {
    return User.findOne({where: { _email: email }})
  }

  async getById(id: number) {
    return User.findByPk(id);
  }
}

export const UserDatabaseController = new UserDatabaseControllerClass();
export default UserDatabaseController;