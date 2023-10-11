import { useEffect, useState } from "react";

const useClientIp = (): string => {
  const [ip, setIp] = useState('');
  const url: string = 'https://api.ipify.org/?format=json';
	useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setIp(data.ip));

	}, [url]);
	return ip;
};

export default useClientIp;
