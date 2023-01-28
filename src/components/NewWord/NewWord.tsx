import React, { useState } from 'react';
import './NewWord.scss';
import classNames from 'classnames';
import { Word } from '../../types/Word';
import { TextField } from '../TextField';
import { WordsList } from '../WordsList';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as countActions } from '../../features/count';

interface Props {
  onAdd: (word: Word) => void;
  onDelete: (wordId: number) => void;
  maxId: number;
  words: Word[];
}

export const NewWord: React.FC<Props> = ({
  onAdd,
  onDelete,
  maxId,
  words,
}) => {
  const [text, setText] = useState('');
  const [translation, setTranslation] = useState('');

  const dispatch = useAppDispatch();
  const count = useAppSelector(state => state.count);

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
    dispatch(countActions.add(1));
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
          label="Word in Ukrainian"
          value={text}
          onChange={setText}
          required
          isWordValid={isWordValid(text)}
        />

        <TextField
          name="translation"
          label="English translation"
          value={translation}
          onChange={setTranslation}
          required
          isWordValid={isTranslateValid(translation)}
        />

        <div className="new-word__field is-grouped">
          <div className="control">
            <button
              type="submit"
              className={classNames(
                'button is-link',
                { disabled: isDisabled },
              )}
              disabled={isDisabled}
            >
              Add
            </button>
          </div>
        </div>
      </form>

      {count > 0 && (
        <>
          <p className="message">A new word has been added!</p>
          <WordsList
            words={words.slice(0, count)}
            onDelete={onDelete}
          />
        </>
      )}
    </>
  );
};
