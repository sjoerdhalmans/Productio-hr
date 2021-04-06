import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePassword } from './DTO\'s/password.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  public accumulate(data: number[]): number {
    return (data || []).reduce((a, b) => Number(a) + Number(b));
  }

  public add(user: User) {
    this.usersRepository.save(user);
  }

  public updatePassword(passUpdate: UpdatePassword) {
    var axios = require("axios").default;

    var options = {
      method: 'POST',
      url: 'https://deathrun.auth0.com/dbconnections/change_password',
      headers: {'content-type': 'application/json'},
      data: {
        client_id: '0Bn57fCuuroEEtQj40Zj5edn8UhUxdsZ',
        email: passUpdate.email,
        connection: 'Productio'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }
}
