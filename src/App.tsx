import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { GenreMovies, Genres, MainPage, Movie } from "./pages";
import { Footer } from "./components/Footer";
import { Account } from "./pages/Account";
import { Header } from "./components/Header";
import { RootState, saveProfile, saveRandomMovie } from "./store/reducer";
import { fetchProfile } from "./api/fetchProfile";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "./pages/Modal";
import { LoginForm } from "./components/LoginForm";
import { useEffect } from "react";
import { SearchForm } from "./components/SearchForm";
import { Trailer } from "./components/Trailer";
import { fetchRandom } from "./api/fetchRandom";

export const BASE_URL = 'https://cinemaguide.skillbox.cc';

export function App() {
	const location = useLocation();
	const previousLocation = location.state?.previousLocation;
	const activeModal = useSelector<RootState, boolean>(state => state.activeModal);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const profile = async () => { dispatch(saveProfile(await fetchProfile())) };
		profile();	

		if (!previousLocation && (location.pathname === "/login" || location.pathname.includes("/search/"))) {
			navigate("/");
		}
	}, [])

	return (<>

		<Header />

		<div className="section">
			<main className="content">
				<Routes location={previousLocation || location}>
					<Route path="/" element={<MainPage />} />
					<Route path="/account" element={<Account infoPage={false} />} />
					<Route path="/account/settings" element={<Account infoPage={true} />} />
					<Route path="/movie/:id" element={<Movie />} />
					<Route path="/genres" element={<Genres />} />
					<Route path="/genres/:genre" element={<GenreMovies />} />
					<Route path="/login" element={<Modal active={activeModal} children={<LoginForm />} />} />
					<Route path="/search/:search" element={<Modal active={activeModal} children={<SearchForm />} />} />
					<Route path="/trailer/:id" element={<Modal active={activeModal} children={<Trailer />} />} />
				</Routes>

				{previousLocation && (
					<Routes>
						<Route path="/login" element={<Modal active={activeModal} children={<LoginForm />} />} />
						<Route path="/search/:search" element={<Modal active={activeModal} children={<SearchForm />} />} />
						<Route path="/trailer/:id" element={<Modal active={activeModal} children={<Trailer />} />} />
					</Routes>
				)}

			</main>
		</div>

		<Footer />
	</>
	);
}

