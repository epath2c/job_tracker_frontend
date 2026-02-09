export interface Job {
    id: number;
    company: string;
    title: string;
    applied_at: string;
    cover_letter: boolean;
    expectation: number | null;
    result: string | null;
    company_rate: number | null;
    referral: boolean;
    custom_fields: Record<string, unknown>;
}

export interface CreateJobForm {
    company: string;
    title: string;
    applied_at: Date;
    cover_letter: boolean;
    expectation: number;
    result: string;
    company_rate: number;
    referral: boolean;
    remark: string;
}
