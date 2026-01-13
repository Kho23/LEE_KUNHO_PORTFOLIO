import React, { useEffect, useState } from 'react'
import { getLessonStat } from '../../../api/statisticApi';
import LessonStatPageComponent from './LessonStatPageComponent'

const CATEGORY_MAP = {
    GOLF: '골프',
    HEALTH: '헬스',
    SWIMMING: '수영',
    POOL: '수영',
    FUTSAL: '풋살',
    DANCE: '무용',
};

const LessonStatPage = () => {
  const [chartData, setChartData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const getStat = async () => {
      try {
        const res = await getLessonStat();
        if (res && res.stats) {
          setTotalCount(res.totalCount);
          const processed = processData(res.stats);
          setChartData(processed);
        }
      } catch (error) {
        console.log("에러발생", error);
      }
    };
    getStat();
  }, [])

  const processData = (data) => {
    return data.map(item => ({
      name: CATEGORY_MAP[item.category] || item.category,
      value: item.count
    })).sort((a, b) => b.value - a.value);
  };

  return (
    <div>
      <LessonStatPageComponent chartData={chartData} totalCount={totalCount} />
    </div>
  )
}

export default LessonStatPage