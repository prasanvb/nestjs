import { IsString, IsNumber, Min, Max, IsLongitude, IsLatitude } from "class-validator";
import { Transform } from "class-transformer";

export class GetEstimatesDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform((report: { value: string }) => parseInt(report.value))
  @IsNumber()
  @Min(1950)
  @Max(2050)
  year: number;

  @Transform((report: { value: string }) => parseInt(report.value))
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @Transform((report: { value: string }) => parseFloat(report.value))
  @IsLongitude()
  long: number;

  @Transform((report: { value: string }) => parseFloat(report.value))
  @IsLatitude()
  lat: number;
}
