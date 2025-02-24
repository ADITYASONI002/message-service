import { DbUser, User } from '../interfaces/users.interface.js';
import DatabaseLoader from '../../loaders/database.loader.js';

export default class UsersService {
  private dbInstance: ReturnType<typeof DatabaseLoader.getInstance>;
  constructor() {
    this.dbInstance = DatabaseLoader.getInstance();
  }

  async create(user: User): Promise<DbUser> {
    const { Users } = this.dbInstance;
    return Users.create(user) as DbUser;
  }

  async find(query: { [key: string]: any }): Promise<DbUser | null> {
    const { Users } = this.dbInstance;
    return Users.findOne({ where: query });
  }
}
