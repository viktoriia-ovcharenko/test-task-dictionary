import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/HomePage';
import dictionary from './api/words.json';
import { Word } from './types/Word';
import { NewWord } from './components/NewWord';
import { Header } from './components/Header';
import { PageNotFound } from './components/PageNotFound';
import { Test } from './components/Test';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as wordsActions } from './features/words';
import { actions as countActions } from './features/count';

interface Props {
  dictionary: Word[];
}

export const App: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const words = useAppSelector(state => state.words);

  function getWordsFromServer() {
    dispatch(wordsActions.setWords(dictionary));
  }

  useEffect(() => {
    getWordsFromServer();
  }, []);

  const addWord = (word: Word) => {
    dispatch(wordsActions.addWords(word));
  };

  const deleteWord = (wordId: number) => {
    dispatch(wordsActions.removeWords(wordId));
    dispatch(countActions.take(1));
  };

  const maxId = Math.max(...words.map(word => word.id));

  return (
    <div className="App">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage words={words} onDelete={deleteWord} />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/newWord" element={<NewWord onAdd={addWord} maxId={maxId} words={words} onDelete={deleteWord} />} />
          <Route path="/test" element={<Test words={words} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </div>
  );
};
