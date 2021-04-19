import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePassword } from './DTO\'s/password.dto';
import { assignRoles, UpdateUser } from './DTO\'s/user.dto';
import { json } from 'express';

@Injectable()
export class AppService {
  constructor(

  ) { }

  public accumulate(data: number[]): number {
    return (data || []).reduce((a, b) => Number(a) + Number(b));
  }

  public updatePassword(passUpdate: UpdatePassword) {
    var axios = require("axios").default;

    var options = {
      method: 'POST',
      url: 'https://deathrun.auth0.com/dbconnections/change_password',
      headers: { 'content-type': 'application/json' },
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

  public async updateUser(userDto: UpdateUser) {
    var axios = require("axios").default;
    const token = await this.getToken();

    var options = {
      method: 'patch',
      url: 'https://deathrun.auth0.com/api/v2/users/' + userDto.provider + '|' + userDto.id,
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: {
        email: userDto.email,
        nickname: userDto.nickname
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }

  public getToken(): Promise<string> {
    var request = require("request");

    var options = {
      method: 'POST',
      url: 'https://deathrun.auth0.com/oauth/token',
      headers: { 'content-type': 'application/json' },
      body: '{"client_id":"R22YD7yuO3hjNQprHFpcYDqkiJS2rqXS","client_secret":"M5a3DS-owK8Rx1Sh4FgoM8lt0I1vYBucj-JmgnYaiajVkWHyCgwMi6kF7tD0MdBM","audience":"https://deathrun.auth0.com/api/v2/","grant_type":"client_credentials"}'
    };



    return new Promise(function (resolve, reject) {
      request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          let token = JSON.parse(body);
          resolve(token.access_token);
        } else {
          reject(error);
        }
      })
    });
  }

  public async assignRoles(roleDto: assignRoles) {
    var axios = require("axios").default;
    const token = await this.getToken();

    var options = {
      method: 'post',
      url: 'https://deathrun.auth0.com/api/v2/users/' + roleDto.userId + "/roles",
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: {
        roles: roleDto.roles,
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }

  public async removeRoles(roleDto: assignRoles) {
    var axios = require("axios").default;
    const token = await this.getToken();

    var options = {
      method: 'delete',
      url: 'https://deathrun.auth0.com/api/v2/users/' + roleDto.userId + "/roles",
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: {
        roles: roleDto.roles,
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }

  public async getAll(): Promise<any[]> {
    var axios = require("axios").default;
    var data;
    const token = await this.getToken();

    var options = {
      method: 'get',
      url: 'https://deathrun.auth0.com/api/v2/users?q=identities.connection%3A%22Productio%22&search_engine=v3',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    };
    await axios.request(options).then(function (response) {
      data = response.data
    }).catch(function (error) {
      console.log(error);
    });
    return data;
  }

  public async getUserRoles(id): Promise<any[]> {
    var axios = require("axios").default;
    var data;
    const token = await this.getToken();

    var options = {
      method: 'get',
      url: 'https://deathrun.auth0.com/api/v2/users/' + id + "/roles",
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    };
    await axios.request(options).then(function (response) {
      data = response.data
    }).catch(function (error) {
      console.log(error);
    });
    return data;
  }

  public async getRoles(): Promise<any[]> {
    var axios = require("axios").default;
    var data;
    const token = await this.getToken();

    var options = {
      method: 'get',
      url: 'https://deathrun.auth0.com/api/v2/roles?name_filter=_Productio',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    };
    await axios.request(options).then(function (response) {
      data = response.data
    }).catch(function (error) {
      console.log(error);
    });
    return data;
  }
}