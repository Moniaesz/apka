import React, { useEffect, useState } from 'react';

import { shuffle } from 'utils';
import { Question, Answer } from '../types/Question';
import Loading from './Loading';
import QuestionContainer from './QuestionContainer';

import rawQuestions from '../assets/questions';

const getRandomQuestionsPool = (questions: Question[]): Question[] =>
  shuffleAnswers(shuffle<Question>([...questions]).slice(0, 10));

const shuffleAnswers = (questions: Question[]): Question[] =>
  questions.map(question => {
    const answers = shuffle<Answer>(question.answers);
    return { ...question, answers };
  });

export default () => {
  const questions: Question[] = rawQuestions;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionsPool, setQuestionsPool] = useState([] as Question[]);

  useEffect(() => {
    if (questionsPool.length < 1 && questions) {
      setQuestionsPool(getRandomQuestionsPool(questions));
    }
  }, [questionsPool.length, questions]);

  const getCurrentQuestion = (): Question | null => {
    if (!questionsPool) {
      return null;
    }

    return questionsPool[currentQuestionIndex];
  };

  const goToNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const question = getCurrentQuestion();

  return question ? (
    <QuestionContainer
      question={question}
      questionNumber={currentQuestionIndex + 1}
      questionsTotalNumber={questionsPool.length}
      onAnswerPick={goToNextQuestion}
    />
  ) : (
    <Loading />
  );
};
