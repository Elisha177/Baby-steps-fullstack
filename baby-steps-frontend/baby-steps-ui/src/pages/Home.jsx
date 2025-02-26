import DoctorList from "../components/DoctorList";
import React from "react";

const Home = () => {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4 text-pink-500">Home</h1>
            <DoctorList />
        </div>
    )
}

export default Home;