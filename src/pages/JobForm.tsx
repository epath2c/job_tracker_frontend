import { useEffect, useState } from "react";
import axios from "axios";

import "~/pages/JobForm.css";
import type { Job, CreateJobForm } from "~/types/Job";

const API = "http://localhost:5000/api/jobs";

export default function JobForm() {
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
    const loadResultTypes = async (): Promise<void> => {
        const { data } = await axios.get(`${API}/result-types`);
        setResultTypes(data);
    };
    useEffect(() => {
        const run = async () => {
            await loadResultTypes();
        };
        run();
    }, []);

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(form);
        try {
            await axios.post<Job>(API, form, {
                headers: { "Content-Type": "application/json" },
            });
            setForm({ company: "", title: "" });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Error submitting form:", error.message);
            } else {
                console.error("Error submitting form:", error);
            }
        }
    };

    /* ---------------- UI ---------------- */
    return (
        <div className='justify-center p-4'>
            <main className='w-full max-w-3xl rounded-2xl shadow-lg p-8 flex md:flex-col'>
                {/* Form */}
                <form onSubmit={submit} className=''>
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
                                value={form.applied_at}
                                onChange={e => setForm({ ...form, applied_at: e.target.value })}
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
            </main>
        </div>
    );
}
