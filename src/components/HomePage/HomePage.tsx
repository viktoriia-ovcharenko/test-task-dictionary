import React from 'react';
import './HomePage.scss';
import { Word } from '../../types/Word';
import { WordsList } from '../WordsList';

interface Props {
  words: Word[];
}

export const HomePage: React.FC<Props> = ({ words }) => {
  return (
    <div className="home container">
      <h1 className="home__title">Your Dictionary</h1>
      <WordsList words={words} />
    </div>
  );
};
