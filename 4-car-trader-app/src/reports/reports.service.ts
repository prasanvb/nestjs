import { Injectable } from "@nestjs/common";
import { Report } from "../reports/reports.entity";

@Injectable()
export class ReportsService {
  create(body: Partial<Report>) {
    console.log(body);
  }
}
