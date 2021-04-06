export class UpdateUser {
  nickname: string;
  email: string;
  id: string;
  provider: string;
}

export class assignRoles {
  userId: string;
  provider: string;
  roles: string[];
}