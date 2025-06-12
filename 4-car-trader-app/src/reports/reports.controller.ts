import { ReportsService } from "./reports.service";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CreateReportsDto } from "./dto/create-reports.dto";
import { AuthGuard } from "../auth/guards/auth.gaurds";
import { CurrentUser } from "../users/decorator/current-user.decorator";
import { User } from "../users/users.entity";
import { Serialize } from "../users/interceptor/serialize.interceptor";
import { ViewReportsDto } from "./dto/view-reports.dto";

@Serialize(ViewReportsDto) // Restricts the contents of the api response object
@Controller("reports")
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  createReports(@Body() body: CreateReportsDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }
}
