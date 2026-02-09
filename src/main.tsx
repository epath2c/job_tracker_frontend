import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.tsx";
import "./index.css";
import NavBar from "./components/Navbar.tsx";
import JobList from "./pages/JobList.tsx";

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <NavBar />
        <div className='main'>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/jobs' element={<JobList />} />
            </Routes>
        </div>
    </BrowserRouter>
);
