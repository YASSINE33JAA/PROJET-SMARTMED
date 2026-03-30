import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MapPin } from "lucide-react";

function PatientRendezVous() {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  let doctor = location.state;

  if (!doctor) {
    doctor = {
      id,
      name: "Docteur depuis API",
      specialty: "Médecine générale"
    };
  }

  const [patient, setPatient] = useState({
    fullName: "",
    phone: "",
    age: "",
    message: "",
    date: "",
    time: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-green-600">
            ✅ Rendez-vous confirmé
          </h2>
          <p className="text-gray-600 mt-2">
            Merci {patient.fullName}
          </p>

          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Retour
          </button>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Télécharger le rendez-vous
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* 🔝 NAVBAR */}
      <div className="bg-green-600 text-white px-6 py-4 flex items-center justify-between shadow-md">

        <button
          onClick={() => navigate(-1)}
          className="bg-white text-green-600 px-3 py-1 rounded-lg font-semibold hover:bg-gray-100"
        >
          ⬅ Retour
        </button>

        <h1 className="text-lg font-bold">
          Rendez-vous médical  
        </h1>

        <div className="w-20"></div>
      </div>

      {/* CONTENT */}
      <div className="flex items-center justify-center p-6">

        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* Doctor Header */}
          <div className="bg-green-500 text-white p-6">
            <h1 className="text-2xl font-bold">
               {doctor.name}
            </h1>
            <p className="opacity-90">
              {doctor.specialty}
            </p>
            <div className="opacity-90">
              <MapPin className="w-4 h-4 inline mr-2" />
              {doctor.location}
            </div>
          </div>

          <div className="p-6">

            <h2 className="text-xl font-semibold mb-4">
              Prendre un rendez-vous
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                name="fullName"
                placeholder="Nom complet"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
                onChange={handleChange}
                required
              />

              <input
                name="phone"
                placeholder="Téléphone"
                className="w-full p-3 border rounded-lg"
                onChange={handleChange}
                required
              />

              <div className="grid grid-cols-2 gap-4">

                <input
                  type="date"
                  name="date"
                  className="w-full p-3 border rounded-lg"
                  onChange={handleChange}
                  required
                />

                <input
                  type="time"
                  name="time"
                  className="w-full p-3 border rounded-lg"
                  onChange={handleChange}
                  required
                />

              </div>

              <textarea
                name="message"
                placeholder="Message..."
                className="w-full p-3 border rounded-lg"
                rows="4"
                onChange={handleChange}
              />

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Confirmer le rendez-vous
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PatientRendezVous;