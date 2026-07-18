import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SplashScreen() {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);

          setTimeout(() => {
            navigate("/login");
          }, 500);

          return 100;
        }

        return prev + 1;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-cyan-400">
      <h1 className="text-6xl font-bold mb-10 tracking-widest">
        CYBERVERSE AI
      </h1>

      <p className="text-xl mb-6">
        Initializing Secure Environment...
      </p>

      <div className="w-[500px] h-4 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-cyan-400 transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-5 text-lg">
        {progress}%
      </p>
    </div>
  );
}

export default SplashScreen;