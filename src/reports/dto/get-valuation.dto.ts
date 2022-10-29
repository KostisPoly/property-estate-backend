import {
    IsString,
    IsNumber,
    Min,
    Max,
    IsLatitude,
    IsLongitude
} from 'class-validator'
import { Transform } from 'class-transformer';

export class GetValuationDto {
    @IsString()
    type: string;

    @IsString()
    category: string;

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    size: number;

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(1900)
    @Max(2023)
    year: number;

    @Transform(({ value }) => parseFloat(value))
    @IsLatitude()
    lat: number;

    @Transform(({ value }) => parseFloat(value))
    @IsLongitude()
    lng: number;
}