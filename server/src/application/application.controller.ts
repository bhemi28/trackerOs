import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { IApplicationDocument } from 'src/models/applications.model';
import { CreateApplicationDTO } from './dto/application.dto';
import { GetAllApplicationQueryDTO } from './dto/getAllApplication.dto';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  async create(@Body() createApplicationDTO: CreateApplicationDTO): Promise<void> {
    try {
      await this.applicationService.create(createApplicationDTO);
    } catch (error) {
      throw error;
    }
  }

  // @Get()
  // async findAll(): Promise<IApplicationDocument[]> {
  //   try {
  //     return await this.applicationService.findAll();
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  @Get()
  async findAllWithFilters(@Query() filters: GetAllApplicationQueryDTO): Promise<{data: IApplicationDocument[], total: number}> {
    try {
      let { page, pageSize } = filters;
      if (!page || !pageSize) {
        page = 1;
        pageSize = 10;
      }
      if (page < 1 || pageSize < 1) {
        throw new Error('Page and pageSize must be positive integers');
      }

      return await this.applicationService.findAllWithFilters({ ...filters, page, pageSize });
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<IApplicationDocument | null> {
    try {
      return await this.applicationService.findById(id);
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateApplicationDTO: Partial<CreateApplicationDTO>): Promise<IApplicationDocument | null> {
    try {
      return await this.applicationService.update(id, updateApplicationDTO);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    try {
      return await this.applicationService.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
