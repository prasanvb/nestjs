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

  // Creates a new report associated with a user.
  create(reportDto: CreateReportsDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user;
    return this.repo.save(report);
  }

  // Retrieves a report by ID, including associated user data.
  findReport(id: number) {
    const reportId = Number(id);
    if (isNaN(reportId)) {
      throw new NotFoundException("Invalid report ID");
    }
    return this.repo.findOne({ where: { id: reportId }, relations: ["user"] });
  }

  // Updates the approval status of a report.
  async changeApproval(id: number, approved: boolean) {
    const report = await this.repo.findOne({ where: { id }, relations: ["user"] });
    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    report.approved = approved;
    return this.repo.save(report);
  }

  // Retrieves all reports with associated user data.
  getAllReports() {
    return this.repo.find({ relations: ["user"] });
  }

  // Generates an estimate based on vehicle and location criteria.
  createEstimates(estimatesDto: GetEstimatesDto) {
    const { make, model, long, lat, mileage, year } = estimatesDto;
    return this.repo
      .createQueryBuilder('report')
      .select('AVG(price)', 'price')
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('long - :long BETWEEN -5 AND 5', { long })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .andWhere('approved IS TRUE')
      .setParameter('mileage', mileage)
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .limit(3)
      .getRawMany();
  }
}
