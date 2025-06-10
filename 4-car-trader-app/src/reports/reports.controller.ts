import { ReportsService } from "./reports.service";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CreateReportsDto } from "./dto/create-reports.dto";
import { AuthGuard } from "../auth/guards/auth.gaurds";

@Controller("reports")
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  createReports(@Body() body: CreateReportsDto) {
    return this.reportsService.create(body);
  }
}
