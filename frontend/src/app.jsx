
import React from "react";
import PatientList from "./components/PatientList";
import PatientForm from "./components/PatientForm";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <div className="min-h-screen bg-green-100 text-gray-800 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">AI Patient Dashboard</h1>

      {/* Side-by-side layout */}
      <div className="flex flex-col lg:flex-row gap-6 justify-center">
        <div className="w-full lg:w-1/2">
          <PatientForm />
        </div>
        <div className="w-full lg:w-1/2">
          <Chatbot />
        </div>
      </div>
    </div>
  );
}

export default App;

