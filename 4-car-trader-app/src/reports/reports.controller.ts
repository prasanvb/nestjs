import { ReportsService } from "./reports.service";
import { Body, Controller, Get, NotFoundException, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { CreateReportsDto } from "./dto/create-reports.dto";
import { AuthGuard, AdminGuard } from "../guards/index";
import { CurrentUser } from "../users/decorator/current-user.decorator";
import { User } from "../users/users.entity";
import { Serialize } from "../users/interceptor/serialize.interceptor";
import { ViewReportsDto } from "./dto/view-reports.dto";
import { ApproveReportDto } from "./dto/approve-reports.dto";
import { GetEstimatesDto } from "./dto/getEstimates-reports.dto";

@Serialize(ViewReportsDto) // Transforms the contents of all routes in the reports api response object before sending out
@Controller("reports")
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  createReports(@Body() body: CreateReportsDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  async viewReport(@Param("id") id: string) {
    const report = await this.reportsService.findReport(parseInt(id));
    if (!report) {
      throw new NotFoundException(`report with id:${id} not found`);
    }
    return report;
  }

  @Patch(":id")
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  async approveReport(@Param("id") id: string, @Body() body: ApproveReportDto) {
    const { approved } = body;
    const report = await this.reportsService.changeApproval(parseInt(id), approved);

    return report;
  }

  @Get()
  getEstimates(@Query() query: GetEstimatesDto) {
    console.log("getEstimates", { query });
  }
}
