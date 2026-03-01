import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { type IApplicationStatus, IGetAllApplicationQueryDTO } from "src/types/applications.type";

export class GetAllApplicationQueryDTO implements IGetAllApplicationQueryDTO {
    @IsOptional()
    @Type(() => Number)   // ← transforms "1" → 1
    @IsNumber()
    @Min(1)
    page: number = 1;

    @IsOptional()
    @Type(() => Number)   // ← transforms "10" → 10
    @IsNumber()
    @Min(1)
    pageSize: number = 10;

    @IsOptional()
    @IsString()
    status?: IApplicationStatus;

    @IsOptional()
    @IsString()
    companyName?: string;
}