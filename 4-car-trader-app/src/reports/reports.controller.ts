import { ReportsService } from "./reports.service";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CreateReportsDto } from "./dto/create-reports.dto";
import { AuthGuard } from "../auth/guards/auth.gaurds";
import { CurrentUser } from "../users/decorator/current-user.decorator";
import { User } from "../users/users.entity";

@Controller("reports")
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  createReports(@Body() body: CreateReportsDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }
}
