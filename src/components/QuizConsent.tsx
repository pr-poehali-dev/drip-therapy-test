
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface QuizConsentProps {
  onConsent: () => void;
}

const QuizConsent = ({ onConsent }: QuizConsentProps) => {
  const [isConsented, setIsConsented] = useState(false);

  const handleConsent = () => {
    if (isConsented) {
      onConsent();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Согласие на обработку персональных данных</h2>
      
      <div className="text-sm text-gray-700 mb-6">
        <p className="mb-4">
          Я даю согласие на обработку моих персональных данных в соответствии с Федеральным законом №152-ФЗ "О персональных данных".
        </p>
        <p className="mb-4">
          Согласие дается на обработку результатов теста для подбора индивидуальной программы капельниц.
        </p>
      </div>
      
      <div className="flex items-center space-x-2 mb-6">
        <Checkbox 
          id="consent" 
          checked={isConsented}
          onCheckedChange={(checked) => setIsConsented(checked as boolean)}
        />
        <label
          htmlFor="consent"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Я согласен с условиями обработки персональных данных
        </label>
      </div>
      
      <Button 
        onClick={handleConsent} 
        disabled={!isConsented}
        className="w-full"
      >
        Начать тест
      </Button>
    </div>
  );
};

export default QuizConsent;
