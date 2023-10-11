import { useEffect, useState } from "react";

const useClientIp = (): string => {
  const [ip, setIp] = useState('');

	useEffect(() => {
    fetch('https://api.ipify.org/?format=json')
      .then((res) => res.json())
      .then((data) => setIp(data));

	}, []);
	return ip;
};

export default useClientIp;
