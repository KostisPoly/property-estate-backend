import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity'
import { CreateReportDto } from './dto/create-report.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ReportsService {

    constructor(@InjectRepository(Report) private repository: Repository<Report>) {}

    create(reportDto: CreateReportDto, user: User) {
        const report = this.repository.create(reportDto);
        console.log('Report service');
        console.log(report);
        console.log(user);
        report.userId = user;
        return this.repository.save(report);
    }
}
