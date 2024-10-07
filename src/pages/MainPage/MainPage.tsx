import { Top10 } from ".";
import { RandomMovie } from "./RandomMovie";

export function MainPage() {
	
	return (
		<div className="mainpage">
			<RandomMovie />
			<Top10 />
		</div>
	);
}
