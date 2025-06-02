import { Expose, Exclude } from "class-transformer";

export class ViewUserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Exclude()
  password: string;
}
