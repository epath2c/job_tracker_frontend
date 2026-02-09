import { useEffect, useState } from "react";
import axios from "axios";

import "~/pages/JobList.css";
import type { Job } from "~/types/Job";

const API = "http://localhost:5000/api/jobs";

export default function JobList() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    /* ---------------- Data ---------------- */
    const loadJobs = async (): Promise<void> => {
        setLoading(true);
        try {
            const { data } = await axios.get<Job[]>(API);
            setJobs(data);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadJobs();
    }, []);
    const remove = async (id: number) => {
        await axios.delete(`${API}/${id}`);
        setJobs(prev => prev.filter(j => j.id !== id));
    };
    /* ---------------- UI ---------------- */
    return (
        <div className='flex justify-center bg-gray-100 p-4'>
            <main className='w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 flex md:flex-col'>
                {/* List */}
                <div className='space-y-3 w-full'>
                    {loading && <p className='text-sm text-gray-500'>Loading…</p>}

                    <div className='text-center overflow-x-auto p-6 bg-gray-50 table-wrapper'>
                        <table className='min-w-full bg-white rounded-xl shadow-lg overflow-hidden'>
                            <thead className='[&_th]:text-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white'>
                                <tr>
                                    <th className='px-6 py-4 text-left text-sm font-semibold tracking-wide'>
                                        Company Name
                                    </th>
                                    <th className='px-6 py-4 text-left text-sm font-semibold tracking-wide'>Title</th>
                                    <th className='px-6 py-4 text-left text-sm font-semibold tracking-wide'>
                                        Applied At
                                    </th>
                                    <th className='px-6 py-4 text-left text-sm font-semibold tracking-wide'>
                                        Cover Letter
                                    </th>
                                    <th className='px-6 py-4 text-left text-sm font-semibold tracking-wide'>
                                        Expectation
                                    </th>
                                    <th className='px-6 py-4 text-left text-sm font-semibold tracking-wide'>Result</th>
                                    <th className='px-6 py-4 text-left text-sm font-semibold tracking-wide'>
                                        Rate for the Company
                                    </th>
                                    <th className='px-6 py-4 text-left text-sm font-semibold tracking-wide'>
                                        Referral
                                    </th>
                                    <th className='px-6 py-4 text-left text-sm font-semibold tracking-wide'>Remark</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-200'>
                                {jobs.map(job => (
                                    <tr key={job.id} className='hover:bg-indigo-50 transition'>
                                        <td className='px-6 py-4 font-medium text-gray-800'>{job.company}</td>
                                        <td className='px-6 py-4 text-gray-600'>{job.title}</td>
                                        <td className='px-6 py-4 '>
                                            {new Date(job.applied_at).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </td>
                                        <td className='px-6 py-4 text-gray-500'>{job.cover_letter ? "1" : "0"}</td>
                                        <td className='px-6 py-4'>{job.expectation}</td>
                                        <td className='px-6 py-4'>{job.result}</td>
                                        <td className='px-6 py-4'>{job.company_rate}</td>
                                        <td className='px-6 py-4'>{job.referral ? "1" : "0"}</td>
                                        <td className='px-6 py-4'>{job.remark}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {!loading && jobs.length === 0 && (
                        <p className='text-sm text-gray-500'>No jobs yet. Start applying 🚀</p>
                    )}
                </div>
            </main>
        </div>
    );
}
