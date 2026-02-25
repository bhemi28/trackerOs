import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { ICreateApplicationDTO } from 'src/types/applications.type';

export class CreateApplicationDTO implements ICreateApplicationDTO{
    @IsString()
    @IsNotEmpty()
    companyName: string;

    @IsString()
    @IsNotEmpty()
    position: string;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsString()
    @IsNotEmpty()
    locationType: 'remote' | 'onsite' | 'hybrid';

    @IsNotEmpty()
    applicationDate: Date;

    @IsString()
    @IsNotEmpty()
    jobURL: string;

    @IsString()
    @IsNotEmpty()
    status: ICreateApplicationDTO['status'];
}