import type { Job } from "~/types/Job";

const API_URL = "http://localhost:5000/api/jobs";

export async function getJobs(): Promise<Job[]> {
    const res = await fetch(API_URL);
    return res.json();
}
