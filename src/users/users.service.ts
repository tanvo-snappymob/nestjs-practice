import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

export interface User {
  id: string;
  name: string;
  age: number;
}

@Injectable()
export class UsersService {
  db: User[];

  constructor() {
    this.db = [];
  }

  async findById(id: string) {
    return this.db.find((user) => user.id === id);
  }

  async findAll() {
    return this.db;
  }

  async create(data) {
    const id = uuid();
    const newUser: User = {
      id,
      name: data.name,
      age: data.age,
    };
    this.db.push(newUser);

    return newUser;
  }

  async deleteById(id: string) {
    this.db = this.db.filter((user) => user.id !== id);

    return `DELETED user ${id} from db`;
  }
}
