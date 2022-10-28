import { IsBoolean } from 'class-validator'

export class VerifyReportDto {
    @IsBoolean()
    verified: boolean;
}