import { ActionCreator, Reducer, Action } from "redux";

export type Profile = {
  email: string; favorites: string[]; name: string; surname: string
}

export type RootState = {
  activeModal: boolean;
  profile: Profile;
  randomMovie: any
};
const initialState = {
  activeModal: false,
  profile: { email: "", favorites: [], name: "", surname: "" },
  randomMovie: {}
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
  randomMovie: any
}
export const saveRandomMovie: ActionCreator<SaveRandomMovieAction> = (randomMovie: any) => ({
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
