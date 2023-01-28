import React from 'react';
import './HomePage.scss';
import { Word } from '../../types/Word';
import { WordsList } from '../WordsList';

interface Props {
  words: Word[];
  onDelete: (wordId: number) => void;
}

export const HomePage: React.FC<Props> = ({ words, onDelete }) => {
  return (
    <div className="home container">
      <h1 className="home__title">Your Dictionary</h1>
      <WordsList words={words} onDelete={onDelete} />
    </div>
  );
};
