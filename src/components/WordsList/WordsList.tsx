import React from 'react';
import './WordsList.scss';
import { Word } from '../../types/Word';

interface Props {
  words: Word[];
}

export const WordsList: React.FC<Props> = ({ words }) => {
  return (
    <table className="words-list" cellSpacing="0">
      <tr className="words-list__title">
        <th className="words-list__title__text text">Word</th>
        <th className="words-list__title__text text">Translation</th>
      </tr>
      {words.map(word => (
        <tr key={word.id} className="words-list__items">
          <td className="words-list__items__text text">{word.text}</td>
          <td className="words-list__items__text text">{word.translation}</td>
        </tr>
      ))}
    </table>
  );
};
