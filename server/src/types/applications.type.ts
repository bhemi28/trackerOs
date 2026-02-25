export const APPLICATION_STATUSES = ['applied', 'screening', 'technical', 'manager', 'hr', 'offer', 'rejected', 'ghosted'] as const;
export type IApplicationStatus = typeof APPLICATION_STATUSES[number];

export interface IApplicationPipeline {
    stage: string;
    scheduledAT: Date;
    interviewer?: string;
}

export interface IApplication {
    companyName: string;
    position: string;
    location: string;
    locationType: 'remote' | 'onsite' | 'hybrid';
    applicationDate: Date;
    jobURL: string;
    status: IApplicationStatus;
    notes?: string; // MD format
    applicationPipeline: IApplicationPipeline[];
    createdAt: Date;
    updatedAt: Date;
}

export interface ICreateApplicationDTO {
    companyName: string;
    position: string;
    location: string;
    locationType: 'remote' | 'onsite' | 'hybrid';
    applicationDate: Date;
    jobURL: string;
    status: IApplicationStatus;
}