import React, { useState } from "react";

const PatientForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [issue, setIssue] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // 👈 NEW loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // 👈 Start loading

    try {
      const response = await fetch("http://localhost:8000/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          age: parseInt(age),
          issue: issue.trim(),
        }),
      });

      if (!response.ok) throw new Error("Failed to save patient");

      await response.json();
      setMessage("✅ Patient saved successfully!");
      setName("");
      setAge("");
      setIssue("");
    } catch (err) {
      console.error("Error:", err);
      setMessage("❌ Failed to save patient.");
    } finally {
      setLoading(false); // 👈 End loading
    }
  };

  return (
    <div className="bg-green-200 text-black p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
        Add New Patient
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Medical Issue"
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          required
        />

        <button
          type="submit"
          className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
          }`}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Patient"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-sm font-medium text-green-600">
          {message}
        </p>
      )}
    </div>
  );
};

export default PatientForm;
