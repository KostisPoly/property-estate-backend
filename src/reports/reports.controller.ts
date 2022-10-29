import {
    Controller,
    Post,
    Body,
    UseGuards,
    Param,
    Patch,
    Get,
    Query
} from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { VerifyReportDto } from './dto/verify-report.dto';
import { ReportsService } from "./reports.service";
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { CurrentUser } from '../users/decorator/current-user.decorator';
import { User } from '../users/user.entity';
import { GetValuationDto } from './dto/get-valuation.dto';

@Controller('reports')
export class ReportsController {

    constructor(private reportService: ReportsService) { }

    @UseGuards(AuthGuard)
    @Post()
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportService.create(body, user);
    }

    @UseGuards(AdminGuard)
    @Patch('/:id')
    verifyReport(@Param('id') id: string, @Body() body: VerifyReportDto) {
        return this.reportService.changeVerification(id, body.verified);
    }

    @Get()
    getValuation(@Query() query: GetValuationDto) {

        return this.reportService.createValuation(query);
    }

}
