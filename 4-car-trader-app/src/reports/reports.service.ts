import { Injectable, NotFoundException } from "@nestjs/common";
import { Report } from "../reports/reports.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateReportsDto } from "./dto/create-reports.dto";
import { User } from "../users/users.entity";
import { GetEstimatesDto } from "./dto/getEstimates-reports.dto";

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportDto: CreateReportsDto, user: User) {
    const report = this.repo.create(reportDto);

    report.user = user;

    return this.repo.save(report);
  }

  findReport(id: number) {
    const report = this.repo.findOne({ where: { id }, relations: ["user"] });
    return report;
  }

  async changeApproval(id: number, approved: boolean) {
    const report = await this.repo.findOne({ where: { id }, relations: ["user"] });

    if (!report) {
      throw new NotFoundException(`report with id:${id} not found`);
    }

    report.approved = approved;

    return this.repo.save(report);
  }

  createEstimates(estimatesDto: GetEstimatesDto) {
    console.log(estimatesDto);
    return this.repo.createQueryBuilder().select("*").getRawMany();
  }
}
