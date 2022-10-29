import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity'
import { CreateReportDto } from './dto/create-report.dto';
import { User } from '../users/user.entity';
import { GetValuationDto } from './dto/get-valuation.dto';

@Injectable()
export class ReportsService {

    constructor(@InjectRepository(Report) private repository: Repository<Report>) {}

    create(reportDto: CreateReportDto, user: User) {
        const report = this.repository.create(reportDto);
        
        report.userId = user;
        return this.repository.save(report);
    }

    async changeVerification(id: string, verified: boolean) {
        const report = await this.repository.findOneBy({id: parseInt(id)});
        
        if(!report) {
            console.log(`No data found by ID ${id}`);
        }

        report.verified = verified;

        return this.repository.save(report);
    }

    createValuation(valuation: GetValuationDto) {

        return this.repository.createQueryBuilder()
            .select('AVG(price)', 'price')
            .where('type = :type', {type: valuation.type})
            .andWhere('category = :category', {category: valuation.category})
            .andWhere('size - :size BETWEEN -10 AND 10', {size: valuation.size})
            .andWhere('year - :year BETWEEN -5 AND 5', {year: valuation.year})
            .andWhere('lat - :lat BETWEEN -1 AND 1', {lat: valuation.lat})
            .andWhere('lng - :lng BETWEEN -1 AND 1', {lng: valuation.lng})
            .orderBy('year', 'DESC')
            .getRawOne()
    }
}
