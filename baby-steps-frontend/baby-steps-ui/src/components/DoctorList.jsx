/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDoctors } from "../redux/actions/doctorActions";
import { Link } from "react-router-dom";

const DoctorList = () => {
    console.log("DoctorList component rendered");
    const dispatch = useDispatch();

    const { doctors, loading, error } = useSelector(state => state.doctors);

    useEffect(() => {
        dispatch(fetchDoctors());
    }, [dispatch])

    if (loading) {
        return <p>Loading doctors...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className=" text-2xl font-bold mb-4 text-pink-500">Our Doctors</h1>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {doctors.map(doctor => (
                    <li key={doctor._id} className="bg-white shadow rounded-md p-4">
                        <Link to={`/doctors/${doctor._id}`}>
                            <h2 className="text-lg font-bold text-pink-600">{doctor.name}</h2>
                            <p className="text-gray-500">Specialization : {doctor.specialization}</p>
                            <p className="text-gray-500">Working Hours : {doctor.workingHours.start} - {doctor.workingHours.end}</p>
                            <Link to={`/doctors/${doctor._id}`} className="text-blue-500">View Slots</Link>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )

}

export default DoctorList;