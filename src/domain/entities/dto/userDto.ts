export class UserDto {
    id: string;
    fullName: string;
    email: string;
    phone?: string;
  
    constructor(id: string, fullName: string, email: string, phone?: string) {
      this.id = id;
      this.fullName = fullName;
      this.email = email;
      this.phone = phone;
    }
  
    static fromEntity(user: any): UserDto {
      return new UserDto(user.id, user.fullName, user.email, user.phone);
    }
  
    static fromEntities(users: any[]): UserDto[] {
      return users.map((user) => UserDto.fromEntity(user));
    }
  }
  