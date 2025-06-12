import { Expose, Exclude, Transform } from "class-transformer";
import { User } from "src/users/users.entity";

export class ViewReportsDto {
  price: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  mileage: number;

  @Expose()
  long: number;

  @Expose()
  lat: number;

  @Transform((report: { obj: { user: User } }) => {
    console.log({ report });
    return report.obj.user.id;
  })
  @Expose()
  userId: number;
}
