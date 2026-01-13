import React, { useEffect, useState } from 'react'
import { getAgeGenderStat } from '../../../api/statisticApi';
import AgeGenderStatPageComponent from './AgeGenderStatPageComponent'

const AgeGenderStatPage = () => {
  const [chartData, setChartData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAgeGenderStat();
        if (res && res.stats) {
          setTotalCount(res.totalCount);
          const processed = processData(res.stats);
          setChartData(processed);
        }
      } catch (error) {
        console.log("에러발생 ", error);
      }
    }
    fetchData();
  }, [])

  const processData = (data) => {
    const result = {};
    data.forEach(item => {
      if (!result[item.ageGroup]) {
        result[item.ageGroup] = { name: item.ageGroup, 남성: 0, 여성: 0 };
      }
      if (item.gender === 'MALE' || item.gender === 'M') {
        result[item.ageGroup].남성 = item.count;
      } else if (item.gender === 'FEMALE' || item.gender === 'F') {
        result[item.ageGroup].여성 = item.count;
      }
    });
    return Object.values(result);
  };

  return (
    <div>
      <AgeGenderStatPageComponent chartData={chartData} totalCount={totalCount} />
    </div>
  )
}

export default AgeGenderStatPage