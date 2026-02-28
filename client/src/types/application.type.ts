export const APPLICATION_STATUSES = ['applied', 'screening', 'technical', 'manager', 'hr', 'offer', 'rejected', 'ghosted'] as const;
export type IApplicationStatus = typeof APPLICATION_STATUSES[number];

export interface IApplication {
    _id: string;
    companyName: string;
    position: string;
    location: string;
    applicationDate: Date;
    status: IApplicationStatus;
    createdAt: Date;
}

export interface IUseApplicationReturns {
    applications: IApplication[];
    loading: boolean;
    error: string | null;
}

export interface ICreateApplicationFormData {
    companyName: string;
    position: string;
    location: string;
    locationType: 'remote' | 'onsite' | 'hybrid';
    applicationDate: Date;
    jobURL: string;
    status: IApplicationStatus;
}