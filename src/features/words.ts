import { Word } from '../types/Word';

type SetWordsAction = {
  type: 'words/SET',
  payload: Word[],
};

type AddWordsAction = {
  type: 'words/ADD',
  payload: Word,
};

type RemoveWordsAction = {
  type: 'words/REMOVE',
  payload: number,
};

const setWords = (words: Word[]): SetWordsAction => ({
  type: 'words/SET',
  payload: words,
});

const addWords = (word: Word): AddWordsAction => ({
  type: 'words/ADD',
  payload: word,
});

const removeWords = (id: number): RemoveWordsAction => ({
  type: 'words/REMOVE',
  payload: id,
});

export const actions = { setWords, addWords, removeWords };

type Action = SetWordsAction | AddWordsAction | RemoveWordsAction;

const wordsReducer = (
  words: Word[] = [],
  action: Action,
): Word[] => {
  switch (action.type) {
    case 'words/SET':
      return action.payload;

    case 'words/ADD':
      return [
        action.payload,
        ...words,
      ];

    case 'words/REMOVE':
      return words.filter(word => word.id !== action.payload);

    default:
      return words;
  }
};

export default wordsReducer;
