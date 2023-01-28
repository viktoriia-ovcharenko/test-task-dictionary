/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import './Test.scss';
import { Word } from '../../types/Word';

interface Props {
  words: Word[];
}

function shuffle(arr: any) {
  arr.sort(() => Math.random() - 0.5);
}

export const Test: React.FC<Props> = ({ words }) => {
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  let questions = [];
  let i = 0;

  while (questions.length < 10) {
    const dictionary = JSON.parse(JSON.stringify(words));

    shuffle(dictionary);

    questions.push({
      text: dictionary[0].text,
      options: [
        { id: 0, text: dictionary[0].translation, isCorrect: true },
        { id: 1, text: dictionary[1].translation, isCorrect: false },
        { id: 2, text: dictionary[2].translation, isCorrect: false },
        { id: 3, text: dictionary[3].translation, isCorrect: false },
      ],
    });

    shuffle(questions[i].options);
    i += 1;
  }

  const optionClicked = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const restartTest = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
    questions = [];
  };

  return (
    <div className="test">
      <h1 className="test__title">Test yourself</h1>

      <h2 className="test__score">
        {`Number of correct answers: ${score}`}
      </h2>

      {showResults ? (
        <div className="final-results">
          <h1>Final Results</h1>

          <h2>
            {`Your Score: ${(score / questions.length) * 100}%`}
          </h2>

          <span className="final-results__text">{`Total number of questions: ${questions.length}`}</span>
          <br />

          <span className="final-results__text">{`Number of Correct Answers: ${score}`}</span>
          <br />

          <span className="final-results__text">{`Number of Wrong Answers: ${questions.length - score}`}</span>
          <br />

          <button type="button" className="test__button" onClick={() => restartTest()}>
            Restart test
          </button>
        </div>
      ) : (
        <div className="question-card">
          <h2>
            {`Question: ${currentQuestion + 1} out of ${questions.length}`}
          </h2>
          <h3 className="question-text">{questions[currentQuestion].text}</h3>

          <ul className="test__list">
            {questions[currentQuestion].options.map((option) => {
              return (
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                <li
                  key={option.id}
                  className="test__list__item"
                  onClick={() => optionClicked(option.isCorrect)}
                >
                  {option.text}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
