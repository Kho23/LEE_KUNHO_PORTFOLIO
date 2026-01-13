import ProgramListPage from "../../program/ProgramListPage";
import ProgramEditPage from "../program/ProgramEditPage";

const ProgramAdminPage = () => {
  return (
    <div className="w-full flex min-h-screen">
      <div className="w-1/2 p-6 overflow-auto bg-white">
        <ProgramListPage />
      </div>

      <div className="w-px bg-gray-300"></div>

      <div className="w-1/2 p-6 overflow-auto bg-gray-50">
        <ProgramEditPage />
      </div>
    </div>
  );
};

export default ProgramAdminPage;
