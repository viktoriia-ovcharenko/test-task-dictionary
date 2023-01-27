import { Word } from '../types/Word';

type SetWordsAction = {
  type: 'words/SET';
  payload: Word[];
};

// type AddWordsAction = {
//   type: 'words/ADD';
//   payload: Word;
// };

const setWords = (words: Word[]): SetWordsAction => ({
  type: 'words/SET',
  payload: words,
});

// const addWords = (word: Word): AddWordsAction => ({
//   type: 'words/ADD',
//   payload: word,
// });

export const actions = { setWords };

type Action = SetWordsAction;

const wordsReducer = (
  words: Word[] = [],
  action: Action,
): Word[] => {
  switch (action.type) {
    case 'words/SET':
      return action.payload;

    // case 'words/ADD':
    //   return [
    //     ...words,
    //     action.payload,
    //   ];
    default:
      return words;
  }
};

export default wordsReducer;
