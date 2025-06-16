import { Expose, Exclude, Transform } from "class-transformer";
import { User } from "src/users/users.entity";

export class ViewReportsDto {
  @Expose()
  id: number;

  @Expose()
  approved: boolean;

  @Expose()
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

  @Expose()
  @Transform((report: { obj: { user: User } }) => {
    console.log("view-reports.dto", { report });
    return report.obj.user.id;
  })
  userId: number;
}
