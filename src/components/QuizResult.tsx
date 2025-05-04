
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface QuizResultProps {
  result: 'detox' | 'weight-loss' | 'energy';
  onRestart: () => void;
}

const QuizResult = ({ result, onRestart }: QuizResultProps) => {
  const resultData = {
    'detox': {
      title: 'Капельница ДЕТОКС',
      description: 'Идеально подходит для вывода токсинов и очищения организма.',
      analyses: 'АЛТ, АСТ, гамма-ГТП, креатинин, лактат, общий белок, СРБ-ультра, билирубин прямой и непрямой.'
    },
    'weight-loss': {
      title: 'Капельница СНИЖЕНИЕ ВЕСА',
      description: 'Поможет ускорить метаболизм и достичь желаемого веса.',
      analyses: 'ОАК, глюкоза, АЛТ,АСТ, Липидный профиль.'
    },
    'energy': {
      title: 'Капельница ЭНЕРГИЯ',
      description: 'Восстановит силы и повысит жизненный тонус.',
      analyses: 'ОАК, ферритин, В12, лактат, СРБ-ультра, КНТЖ,ОЖСС,общий белок.'
    }
  };

  const data = resultData[result];

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-primary">Ваш результат</CardTitle>
        <CardDescription>Рекомендуемый курс капельниц</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">{data.title}</h2>
          <p className="text-gray-600">{data.description}</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Анализы для консультации:</h3>
          <p>{data.analyses}</p>
        </div>
        
        <div className="bg-primary/10 p-4 rounded-lg">
          <p className="text-xl font-bold text-center">
            Сделайте скриншот полученных результатов и направьте его на WhatsApp +7 902 796-65-85 с фразой «хочу консультацию»
          </p>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button onClick={onRestart} variant="outline" className="w-full">
          Пройти тест заново
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizResult;
