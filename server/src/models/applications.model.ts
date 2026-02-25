import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { APPLICATION_STATUSES } from "src/types/applications.type";
import type { IApplication, IApplicationStatus, IApplicationPipeline } from "src/types/applications.type";

export type IApplicationDocument = HydratedDocument<IApplication>;

@Schema({ _id: false })
class ApplicationPipeline implements IApplicationPipeline {
    @Prop({ required: true })
    stage: string;

    @Prop({ required: true })
    scheduledAT: Date;

    @Prop()
    interviewer?: string;
}

const ApplicationPipelineSchema = SchemaFactory.createForClass(ApplicationPipeline);

@Schema({
    timestamps: true
})
export class Application {
    @Prop({ required: true })
    companyName: string;

    @Prop({ required: true })
    position: string;

    @Prop({ required: true })
    location: string;

    @Prop({ required: true, enum: ['remote', 'onsite', 'hybrid'] })
    locationType: 'remote' | 'onsite' | 'hybrid';

    @Prop({ required: true })
    applicationDate: Date;

    @Prop({ required: true })
    jobURL: string;

    @Prop({ required: true, enum: APPLICATION_STATUSES })
    status: IApplicationStatus;

    @Prop()
    notes?: string; // MD format

    @Prop({ type: [ApplicationPipelineSchema] })
    applicationPipeline: IApplicationPipeline[];
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);