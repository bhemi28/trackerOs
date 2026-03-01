import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Application, IApplicationDocument } from 'src/models/applications.model';
import { CreateApplicationDTO } from './dto/application.dto';
import { GetAllApplicationQueryDTO } from './dto/getAllApplication.dto';

@Injectable()
export class ApplicationService {

    constructor(
        @InjectModel(Application.name) private applicationModel: Model<IApplicationDocument>
    ) { }

    async create(createApplicationDTO: CreateApplicationDTO): Promise<void> {
        try {
            await this.applicationModel.create(createApplicationDTO);
        } catch (error) {
            throw new BadRequestException('Failed to create application', error?.message);
        }
    }

    // async findAll(): Promise<IApplicationDocument[]> {
    //     try {
    //         return await this.applicationModel.find().exec();
    //     } catch (error) {
    //         throw new BadRequestException('Failed to retrieve applications', error?.message);
    //     }
    // }

    async findAllWithFilters(filters: GetAllApplicationQueryDTO): Promise<{data: IApplicationDocument[], total: number}> {
        try {
            const { status, companyName, page, pageSize } = filters;
            const query: any = {};
            if (status as any !== 'all') {
                query.status = status;
            }
            if (companyName) {
                query.companyName = {$regex: companyName, $options: 'i'};
            }
            const [data, total] = await Promise.all([
                this.applicationModel.find(query).skip((page - 1) * pageSize).limit(pageSize).exec(),
                this.applicationModel.countDocuments(query).exec()
            ]);
            return {data, total};
        } catch (error) {
            throw new BadRequestException('Failed to retrieve applications with filters', error?.message);
        }
    }

    async findById(id: string): Promise<IApplicationDocument | null> {
        try {
            return await this.applicationModel.findById(id).exec();
        } catch (error) {
            throw new BadRequestException(`Failed to retrieve application with id ${id}`, error?.message);
        }
    }

    async update(id: string, updateApplicationDTO: Partial<CreateApplicationDTO>): Promise<IApplicationDocument | null> {
        try {
            return await this.applicationModel.findByIdAndUpdate(id, updateApplicationDTO, { new: true }).exec();
        } catch (error) {
            throw new BadRequestException(`Failed to update application with id ${id}`, error?.message);
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const documentExists = await this.applicationModel.exists({ _id: id });
            if (!documentExists) {
                return false;
            }
            await this.applicationModel.findByIdAndDelete(id).exec();
            return true;
        } catch (error) {
            throw new BadRequestException(`Failed to delete application with id ${id}`, error?.message);
        }
    }

}