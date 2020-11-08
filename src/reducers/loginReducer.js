import { SIGGNED_IN } from '../actions/types';

const initialState = {
  isSignedIn: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGGNED_IN:
      return {
        ...state,
        isSignedIn: action.signed,
      };

    default:
      return state;
  }
};
