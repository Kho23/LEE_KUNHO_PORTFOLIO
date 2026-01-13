import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOne } from "../../api/programApi";
import ProgramListPageComponent from "./ProgramListPageComponent";

const initState = {
  content: "",
  programeName: "",
};

const ProgramListPage = () => {
  const { programId } = useParams();
  const [data, setData] = useState(initState);

  useEffect(() => {
    const f = async () => {
      try {
        const res = await getOne(programId);
        console.log("가져온 Data", res);
        setData(res);
      } catch (error) {
        console.error("가져오기 실패", error);
      }
    };
    f();
  }, [programId]);

  return (
    <div>
      <ProgramListPageComponent data={data} programId={programId} />
    </div>
  );
};

export default ProgramListPage;
