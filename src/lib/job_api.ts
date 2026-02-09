import axios from "axios";
import type { Job } from "~/types/Job";

const API_URL = "http://localhost:5000/api/jobs";

export const loadJobs = async (): Promise<Job[]> => {
    const { data } = await axios.get<Job[]>(API_URL);
    return data;
};
