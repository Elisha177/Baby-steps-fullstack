/* eslint-disable no-unused-vars */
import { ThemeContext } from "./context/ThemeContext";
import DoctorDetails from "./pages/DoctorDetails";
import DoctorList from "./components/DoctorList";
import AppointmentList from "./components/AppointmentList";
import EditAppointmentForm from "./components/EditAppointmentForm";

import React, { useContext } from "react";

import { BrowserRouter as Router, Routes,Route,Link } from "react-router-dom";


const AppRouter = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <Router>
            <div className={`App ${theme === 'dark' ? 'dark' : ''}`}>
                <nav className="bg-white dark:bg-gray-800 p-4">
                    <div className="container mx-auto flex items-center justify-between">
                        <Link to="/" className="text-pink-600 dark:text-pink-400 font-bold text-xl">Baby Steps App</Link>
                        <div>
                            <Link to="/appointments" className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 mr-4">Appointments</Link>
                            <button onClick={toggleTheme} className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded">
                                Toggle Theme
                            </button>
                        </div>
                    </div>
                </nav>

                <Routes>
                    <Route path="/" element={<DoctorList />} />
                    <Route path="/doctor/:doctorId" element={<DoctorDetails />} />
                    <Route path="/appointments" element={<AppointmentList />} />
                    <Route path="/edit-appointment/:id" element={<EditAppointmentForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default AppRouter;