import { createTypes } from 'redux-create-types';
import { createAction, handleActions } from 'redux-actions';
import noop from 'lodash/noop';

import ns from '../ns.json';

export const types = createTypes([
  'nextQuestion'
], ns);

export const nextQuestion = createAction(
  types.nextQuestion,
  noop
);

const initialState = {
  currentIndex: 0
};

export const getNS = state => state[ns];
export const currentIndexSelector = state => getNS(state).currentIndex;

export default function createReducers() {
  const reducer = handleActions({
    [types.nextQuestion]: state => ({
      ...state,
      currentIndex: state.currentIndex + 1
    }),
  }, initialState);

  reducer.toString = () => ns;
  return [ reducer ];
}
