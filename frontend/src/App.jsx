import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import io from "socket.io-client";

function App() {
	const [count, setCount] = useState(0);
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		const newSocket = io("http://localhost:5000");
		setSocket(newSocket);

		return () => {
			newSocket.disconnect();
		};
	}, []);

    useEffect(() => {
        if (socket) {
            socket.on("count", (data) => {
                console.log("data count: ", data)
                setCount(data);
            });
        }

        return () => {
            if (socket) {
                socket.off("count");
            }
        };
    }, [socket]);

    const handleClick = () => { 
        const newCount = count + 1;
        setCount(newCount);
        socket.emit("count", 1);
    }

	return (
		<>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img
						src={reactLogo}
						className="logo react"
						alt="React logo"
					/>
				</a>
			</div>
			<h1>Counter with socket</h1>
			<div className="card">
				<button onClick={handleClick}>
					count is {count && count}
				</button>
			</div>
		</>
	);
}

export default App;
