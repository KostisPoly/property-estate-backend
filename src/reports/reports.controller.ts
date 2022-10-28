import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportsService } from "./reports.service";
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorator/current-user.decorator';
import { User } from '../users/user.entity'; 

@Controller('reports')
export class ReportsController {

    constructor( private reportService: ReportsService) {}

    @UseGuards(AuthGuard)
    @Post()
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        console.log('Report controller');
        console.log(user);
        return this.reportService.create(body, user);
    }
}
