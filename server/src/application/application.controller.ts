import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { IApplicationDocument } from 'src/models/applications.model';
import { CreateApplicationDTO } from './dto/application.dto';

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

  @Get()
  async findAll(): Promise<IApplicationDocument[]> {
    try {
      return await this.applicationService.findAll();
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
