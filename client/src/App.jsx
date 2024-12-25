import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import Button from "./components/Button";
import Patient from "./pages/Patient";
import Doctor from "./pages/Doctor";
import Receptionist from "./pages/Receptionist";
import CheckAppointment from "./pages/checkAppointment";
import SignInPage from "./pages/Patients/SignInPage";
import ConfirmationPage from "./pages/Patients/ConfirmationPage";

function App() {
  const navigate = useNavigate(); // Hook to navigate to different pages

  return (
    <div className="flex min-h-screen gap-4 justify-center bg-slate-50 items-center text-center text-3xl">
      <Button variant="primary" onClick={() => navigate("/patients/signin")}>
        Patient
      </Button>
      <Button variant="primary" onClick={() => navigate("/doctor")}>
        Doctor
      </Button>
      <Button variant="primary" onClick={() => navigate("/receptionist")}>
        Receptionist
      </Button>
    </div>
  );
}

function MainApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/patients" element={<Patient />} />
        <Route path="/patients/signin" element={<SignInPage />} /> {/* Set a sign in page for patients */}
        <Route path="/patients/checkAppointment" element={<CheckAppointment />} />

        <Route path="/patients/confirmation" element={<ConfirmationPage />} />
        <Route path="/patients/confirmation/:patientNumber" element={<ConfirmationPage />} />

        <Route path="/doctor" element={<Doctor />} />

        <Route path="/receptionist" element={<Receptionist />} />
      </Routes>
    </Router>
  );
}

export default MainApp;
