import React, { useEffect, useState } from 'react';

const DateCounter = ({ startDate, endDate }) => {
  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft(startDate, endDate),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(startDate, endDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [startDate, endDate]);

  function calculateTimeLeft(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    let timeLeft = {};

    if (now < start) {
      timeLeft = {
        message: `OPEN ${startDate}`,
      };
    } else if (now < end) {
      const difference = end - now;
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = {
        message: 'CLOSE',
      };
    }

    return timeLeft;
  }

  return (
    <div>
      {timeLeft.message ? (
        <div className="text-gray-400 font-semibold">{timeLeft.message}</div>
      ) : (
        <div className="text-gray-400 font-semibold">
          {timeLeft.days}일 {timeLeft.hours}시간 {timeLeft.minutes}분{' '}
          {timeLeft.seconds}초
        </div>
      )}
    </div>
  );
};

export default DateCounter;
