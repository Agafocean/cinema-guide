import { Top10 } from ".";
import { RandomMovie } from "./RandomMovie";
import "./Mainpage.css";

export function MainPage() {
	
	return (
		<div className="mainpage">
			<RandomMovie />
			<Top10 />
		</div>
	);
}
