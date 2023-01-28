import React from 'react';
import './WordsList.scss';
import { Word } from '../../types/Word';

interface Props {
  words: Word[];
  onDelete: (wordId: number) => void;
}

export const WordsList: React.FC<Props> = ({ words, onDelete }) => {
  return (
    <table className="words-list" cellSpacing="0">
      <tr className="words-list__title">
        <th className="words-list__title__text text">Word</th>
        <th className="words-list__title__text text">Translation</th>
        <th className="words-list__title__text text"> </th>
      </tr>
      {words.map(word => (
        <>
          <tr key={word.id} className="words-list__items">
            <td className="words-list__items__text text">{word.text}</td>
            <td className="words-list__items__text text">
              {word.translation}
            </td>
            <td className="words-list__items__text">
              <button type="button" className="button-delete" onClick={() => onDelete(word.id)}>❌</button>
            </td>
          </tr>
        </>
      ))}
    </table>
  );
};
