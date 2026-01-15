import ProgramListPage from "../../program/ProgramListPage";
import ProgramEditPage from "../program/ProgramEditPage";
import { useParams } from "react-router-dom";

const ProgramAdminPage = () => {
  const {id} = useParams()
  return (
    <div className="w-full flex min-h-screen">
      <div className="w-1/2 p-6 overflow-auto bg-white">
        <ProgramListPage />
      </div>

      <div className="w-px bg-gray-300"></div>

      <div className="w-1/2 p-6 overflow-auto bg-gray-50">
        <ProgramEditPage id={id} />
      </div>
    </div>
  );
};

export default ProgramAdminPage;
