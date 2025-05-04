
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export interface Question {
  id: number;
  text: string;
  options: string[];
}

interface QuizQuestionProps {
  question: Question;
  onAnswer: (questionId: number, answerIndex: number) => void;
  onNext: () => void;
  currentQuestion: number;
  totalQuestions: number;
}

const QuizQuestion = ({ 
  question,
  onAnswer,
  onNext,
  currentQuestion,
  totalQuestions
}: QuizQuestionProps) => {
  // Используем ключ для полного пересоздания компонента RadioGroup при смене вопроса
  const [key, setKey] = useState(question.id);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  // При изменении ID вопроса обновляем ключ и сбрасываем выбор
  useEffect(() => {
    setKey(question.id);
    setSelectedOption(null);
  }, [question.id]);
  
  const handleOptionChange = (value: string) => {
    const answerIndex = parseInt(value);
    setSelectedOption(answerIndex);
    onAnswer(question.id, answerIndex);
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          Вопрос {currentQuestion} из {totalQuestions}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-medium mb-6">{question.text}</h3>
        
        {/* Добавляем key для принудительного перерендера */}
        <RadioGroup 
          key={key}
          value={selectedOption !== null ? selectedOption.toString() : undefined} 
          onValueChange={handleOptionChange}
          className="space-y-4"
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-50">
              <RadioGroupItem value={index.toString()} id={`option-${question.id}-${index}`} />
              <Label htmlFor={`option-${question.id}-${index}`} className="flex-grow cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleNext} 
          disabled={selectedOption === null} 
          className="w-full"
        >
          {currentQuestion === totalQuestions ? "Завершить" : "Следующий вопрос"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizQuestion;
