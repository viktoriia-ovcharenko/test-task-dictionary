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
import { actions } from './features/words';

interface Props {
  dictionary: Word[];
}

export const App: React.FC<Props> = () => {
  // const [words, setWords] = useState(dictionary);
  const dispatch = useAppDispatch();
  const words = useAppSelector(state => state.words);

  function getWordsFromServer() {
    dispatch(actions.setWords(dictionary));
  }

  useEffect(() => {
    getWordsFromServer();
  }, []);

  const addWord = (word: Word) => {
    words.push(word);
  };

  // const addWord = (word: Word) => {
  //   setWords(wordsList => [
  //     ...wordsList,
  //     word,
  //   ]);
  // };

  const maxId = Math.max(...words.map(word => word.id));

  return (
    <div className="App">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage words={words} />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/newWord" element={<NewWord onAdd={addWord} maxId={maxId} words={words} />} />
          <Route path="/test" element={<Test words={words} />} />
        </Routes>
      </main>
    </div>
  );
};
