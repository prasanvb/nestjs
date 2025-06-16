import { Expose, Exclude } from "class-transformer";

export class ViewUserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  admin: boolean;

  @Exclude()
  password: string;
}
