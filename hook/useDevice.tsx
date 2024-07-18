import { useEffect, useState } from "react";
import { DeviceType, getDevice } from "@/utils/widthUtil";

const useDevice = () => {
  const [mode, setMode] = useState<DeviceType>("desktop");

  useEffect(() => {
    const ReCount = () => {
      const device = getDevice();
      setMode(device);
    };

    window.addEventListener("resize", ReCount);

    // 초기화
    ReCount();

    return () => {
      window.removeEventListener("resize", ReCount);
    };
  }, []);

  return {
    mode,
  };
};

export default useDevice;
