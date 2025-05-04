
import { useState } from 'react';
import QuizConsent from '@/components/QuizConsent';
import QuizQuestion, { Question } from '@/components/QuizQuestion';
import QuizResult from '@/components/QuizResult';

const questions: Question[] = [
  {
    id: 1,
    text: 'Как вы оцениваете свое общее самочувствие?',
    options: [
      'Плохо, чувствую усталость',
      'Нормально, немного не хватает энергии',
      'Хорошо, чувствую себя отлично'
    ]
  },
  {
    id: 2,
    text: 'Как часто вы испытываете стресс?',
    options: [
      'Часто, это влияет на здоровье',
      'Иногда, но справляюсь',
      'Редко, стресс меня не беспокоит'
    ]
  },
  {
    id: 3,
    text: 'Как вы оцениваете свой уровень физической активности?',
    options: [
      'Низкий, почти не занимаюсь спортом',
      'Средний, занимаюсь время от времени',
      'Высокий, занимаюсь регулярно'
    ]
  },
  {
    id: 4,
    text: 'Как вы относитесь к своему питанию?',
    options: [
      'Неправильное, много фастфуда',
      'Умеренное, стараюсь следить за рационом',
      'Здоровое, питаюсь правильно'
    ]
  },
  {
    id: 5,
    text: 'Как вы оцениваете свою мотивацию к здоровому образу жизни?',
    options: [
      'Низкая, сложно себя заставить',
      'Средняя, иногда хватает сил',
      'Высокая, всегда стремлюсь к лучшему'
    ]
  },
  {
    id: 6,
    text: 'Как вы относитесь к детокс-программам?',
    options: [
      'За, считаю это полезным',
      'Нейтрально, не пробовал',
      'Против, не верю в их эффективность'
    ]
  }
];

const Index = () => {
  const [hasConsent, setHasConsent] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  const handleConsent = () => {
    setHasConsent(true);
  };

  const handleAnswer = (questionId: number, answerIndex: number) => {
    setAnswers({
      ...answers,
      [questionId]: answerIndex
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsFinished(false);
  };

  const getResult = () => {
    const counts = [0, 0, 0]; // Счетчики для каждого варианта ответа
    
    Object.values(answers).forEach(answerIndex => {
      counts[answerIndex]++;
    });
    
    const maxCount = Math.max(...counts);
    const winnerIndex = counts.indexOf(maxCount);
    
    if (winnerIndex === 0) return 'detox';
    if (winnerIndex === 1) return 'weight-loss';
    return 'energy';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-xl">
        {!hasConsent ? (
          <QuizConsent onConsent={handleConsent} />
        ) : isFinished ? (
          <QuizResult result={getResult()} onRestart={handleRestart} />
        ) : (
          <QuizQuestion 
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            onNext={handleNextQuestion}
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={questions.length}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
