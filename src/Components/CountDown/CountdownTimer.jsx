import { useState, useEffect } from "react";

export default function CountdownTimer() {
  const [seconds, setSeconds] = useState(10 * 60); // 10 دقائق بالثواني

  useEffect(() => {
    if (seconds <= 0) return; // توقف العداد عند الصفر

    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(timer); // تنظيف المؤقت عند إلغاء تحميل المكون
  }, [seconds]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const secs = time % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
     
      <p className=" ps-3 text-gray-500"> Expire in : <span className="text-main font-semibold text-sm">{formatTime(seconds)}</span></p>
   
  );
}
