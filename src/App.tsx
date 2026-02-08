import { useEffect, useState } from "react";
import axios from "axios";
import "~/App.css";
import type { Job, CreateJobForm } from "~/types/Job";

const API = "http://localhost:5000/api/jobs";

export default function App() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [resultTypes, setResultTypes] = useState([]);
    const today = new Date().toISOString().split("T")[0];
    const [form, setForm] = useState<CreateJobForm>({
        company: "",
        title: "",
        applied_at: today,
        cover_letter: false,
        expectation: "",
        result: "GHOSTED",
        company_rate: "",
        referral: false,
        remark: "",
    });
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
    const loadResultTypes = async (): Promise<void> => {
        const { data } = await axios.get(`${API}/result-types`);
        setResultTypes(data);
    };
    // check the nullable number field
    // const checkNullableNumber = (form: any) => {
    //     console.log(form);
    //     setForm({
    //         ...form,
    //         expectation: form.expectation === "" ? null : Number(form.expectation),
    //         company_rate: form.company_rate === "" ? null : Number(form.company_rate),
    //     });
    //     return form;
    // };
    useEffect(() => {
        loadJobs();
        loadResultTypes();
    }, []);

    /* ---------------- Actions ---------------- */

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const cleanedForm = JSON.stringify(checkNullableNumber(form));
        // console.log(cleanedForm);
        try {
            await axios.post<Job>(API, form, {
                headers: { "Content-Type": "application/json" },
            });

            setForm({ company: "", title: "" });
            loadJobs();
        } catch (error: any) {
            console.error("Error submitting form:", error.response?.data || error.message);
        }
    };

    const remove = async (id: number) => {
        await axios.delete(`${API}/${id}`);
        setJobs(prev => prev.filter(j => j.id !== id));
    };

    /* ---------------- UI ---------------- */

    return (
        <div className='flex justify-center bg-gray-100 p-4'>
            <main className='w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 flex md:flex-col'>
                {/* Form */}
                <form onSubmit={submit}>
                    <div className='flex flex-col'>
                        <div className='form-group'>
                            <label htmlFor='company' className='w-40 font-medium pr-10'>
                                Company Name
                            </label>
                            <input
                                id='company'
                                type='text'
                                placeholder='Company'
                                value={form.company}
                                onChange={e => setForm({ ...form, company: e.target.value })}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='title' className='w-40 font-medium pr-10'>
                                Title
                            </label>
                            <input
                                type='text'
                                placeholder='Title'
                                value={form.title}
                                onChange={e => setForm({ ...form, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='date' className='w-40 font-medium pr-10'>
                                Date
                            </label>
                            <input
                                type='date'
                                value={form.date}
                                onChange={e => setForm({ ...form, date: e.target.value })}
                            />
                        </div>
                        <div className='form-group checkbox-wrapper'>
                            <label htmlFor='isActive' className='w-40 font-medium pr-10'>
                                Cover Letter
                            </label>
                            <input
                                type='checkbox'
                                className='checkbox'
                                checked={form.cover_letter}
                                onChange={e => setForm({ ...form, cover_letter: e.target.checked })}
                            />

                            <label htmlFor='status' className='w-40 font-medium pr-10'>
                                Referral
                            </label>
                            <input
                                type='checkbox'
                                className='checkbox'
                                checked={form.referral}
                                onChange={e => setForm({ ...form, referral: e.target.checked })}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='result' className='w-40 font-medium pr-10'>
                                Result
                            </label>
                            <select value={form.result} onChange={e => setForm({ ...form, result: e.target.value })}>
                                <option value=''>Select</option>
                                {resultTypes.map(type => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='status' className='w-40 font-medium pr-10'>
                                Expectation
                            </label>
                            <select
                                value={form.status}
                                onChange={e => setForm({ ...form, expectation: Number(e.target.value) })}
                            >
                                <option value=''>Select</option>
                                <option value={0}>0</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='status' className='w-40 font-medium pr-10'>
                                Company Rate
                            </label>
                            <select
                                value={form.status}
                                onChange={e => setForm({ ...form, company_rate: Number(e.target.value) })}
                            >
                                <option value=''>Select</option>
                                <option value={0}>0</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='company' className='w-40 font-medium pr-10'>
                                remark
                            </label>
                            <textarea
                                placeholder='Other thoughts on this application...'
                                value={form.remark}
                                onChange={e => setForm({ ...form, remark: e.target.value })}
                            />
                        </div>
                        <button type='submit' className='bg-black text-white px-4 rounded hover:bg-slate-800'>
                            Add
                        </button>
                    </div>
                </form>

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
