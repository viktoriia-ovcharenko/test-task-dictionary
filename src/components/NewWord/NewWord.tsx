import React, { useState } from 'react';
import './NewWord.scss';
import { Word } from '../../types/Word';
import { TextField } from '../TextField';
import { WordsList } from '../WordsList';

interface Props {
  onAdd: (word: Word) => void;
  maxId: number;
  words: Word[];
}

export const NewWord: React.FC<Props> = ({ onAdd, maxId, words }) => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [translation, setTranslation] = useState('');

  const reset = () => {
    setText('');
    setTranslation('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const word = {
      id: maxId + 1,
      text,
      translation,
    };

    onAdd(word);
    setCount(currentCount => currentCount + 1);
    reset();
  };

  const isWordValid = (inputedText: string) => {
    const pattern = /[А-Яа-яёЁЇїІіЄєҐґ]/;

    return pattern.test(inputedText);
  };

  const isTranslateValid = (inputedTranslate: string) => {
    const pattern = /[a-zA-Z]/;

    return pattern.test(inputedTranslate);
  };

  const isDisabled = !(text.trim() && translation.trim()
   && isWordValid(text) && isTranslateValid(translation));

  return (
    <>
      <form
        className="new-word"
        key={count}
        onSubmit={handleSubmit}
      >
        <h2 className="new-word__title">Add a word</h2>

        <TextField
          name="text"
          label="Word"
          value={text}
          onChange={setText}
          required
          isWordValid={isWordValid(text)}
        />

        <TextField
          name="translation"
          label="Translation"
          value={translation}
          onChange={setTranslation}
          isWordValid={isTranslateValid(translation)}
        />

        <div className="new-word__field is-grouped">
          <div className="control">
            <button
              type="submit"
              className="button is-link"
              disabled={isDisabled}
            >
              Add
            </button>
          </div>
        </div>
      </form>

      {count > 0 && (
        <>
          <p>A new word has been added!</p>
          <WordsList words={words.slice(words.length - count)} />
        </>
      )}
    </>
  );
};
