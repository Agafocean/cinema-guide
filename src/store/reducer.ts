import { ActionCreator, Reducer } from "redux";
import { IMovie } from "../pages/Movie/iMovie";

const RandomMovieInit = {
  awardsSummary: "",
  backdropUrl: "",
  budget: "",
  cast: [],
  countriesOfOrigin: [],
  director: "",
  genres: [],
  homepage: "",
  id: 0,
  keywords: [],
  language: "",
  languages: [],
  originalTitle: "",
  plot: "",
  posterUrl: "",
  production: "",
  releaseDate: "",
  releaseYear: 0,
  revenue: "",
  runtime: 0,
  searchL: "",
  status: "",
  title: "",
  tmdbRating: 0,
  trailerUrl: "",
  trailerYouTubeId: ""
}

export type Profile = {
  email: string; favorites: string[]; name: string; surname: string
}

export type RootState = {
  activeModal: boolean;
  profile: Profile;
  randomMovie: IMovie
};
const initialState = {
  activeModal: false,
  profile: { email: "", favorites: [], name: "", surname: "" },
  randomMovie: RandomMovieInit
};

type MyAction = SaveActiveModalAction | SaveProfileAction | SaveRandomMovieAction;

const SAVE_ACTIVEMODAL = 'SAVE_ACTIVEMODAL';
export type SaveActiveModalAction = {
  type: typeof SAVE_ACTIVEMODAL;
  activeModal: boolean
}
export const saveActiveModal: ActionCreator<SaveActiveModalAction> = (activeModal) => ({
  type: "SAVE_ACTIVEMODAL",
  activeModal: activeModal
})

const SAVE_PROFILE = 'SAVE_PROFILE';
export type SaveProfileAction = {
  type: typeof SAVE_PROFILE;
  profile: Profile
}
export const saveProfile: ActionCreator<SaveProfileAction> = (profile: Profile) => ({
  type: SAVE_PROFILE,
  profile: { email: profile.email, favorites: profile.favorites, name: profile.name, surname: profile.surname }
})

const SAVE_RANDOMMOVIE = 'SAVE_RANDOMMOVIE';
export type SaveRandomMovieAction = {
  type: typeof SAVE_RANDOMMOVIE;
  randomMovie: IMovie
}
export const saveRandomMovie: ActionCreator<SaveRandomMovieAction> = (randomMovie: IMovie) => ({
  type: SAVE_RANDOMMOVIE,
  randomMovie: randomMovie
})

export const rootReducer: Reducer<RootState, MyAction> = (state = initialState, action) => {
  switch (action.type) {

    case SAVE_ACTIVEMODAL:
      return {
        ...state,
        activeModal: action.activeModal
      };
    case SAVE_PROFILE:
      return {
        ...state,
        profile: action.profile
      };
    case SAVE_RANDOMMOVIE:
      return {
        ...state,
        randomMovie: action.randomMovie
      };
    default:
      return state;
  }
}
