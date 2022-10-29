import { IsString, IsNumber, Min, Max, IsLatitude, IsLongitude } from 'class-validator'

export class CreateReportDto {
    @IsString()
    type: string;

    @IsString()
    category: string;

    @IsNumber()
    size: number;

    @IsNumber()
    @Min(1900)
    @Max(2023)
    year: number;

    @IsLatitude()
    lat: number;

    @IsLongitude()
    lng: number;

    @IsNumber()
    @Min(0)
    @Max(10000000)
    price: number;
}