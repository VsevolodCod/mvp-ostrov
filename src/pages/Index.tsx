import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Shield, Gift, ArrowRight, CheckCircle, MapPin, Clock } from "lucide-react";
import heroImage from "@/assets/hero-hotel.jpg";

const Index = () => {
  const benefits = [
    {
      icon: Gift,
      title: "Бесплатное проживание",
      description: "Получайте скидки до 100% на проживание в премиальных отелях"
    },
    {
      icon: Star,
      title: "Эксклюзивный доступ",
      description: "Первыми узнавайте о новых отелях и специальных предложениях"
    },
    {
      icon: Shield,
      title: "Влияние на качество",
      description: "Помогайте улучшать сервис для всех путешественников"
    },
    {
      icon: Users,
      title: "Сообщество экспертов",
      description: "Присоединяйтесь к сообществу опытных путешественников"
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Подайте заявку",
      description: "Заполните анкету и расскажите о своем опыте путешествий"
    },
    {
      step: "2", 
      title: "Получите задание",
      description: "Мы подберем отель, соответствующий вашему профилю"
    },
    {
      step: "3",
      title: "Проведите проверку",
      description: "Остановитесь в отеле как обычный гость и оцените сервис"
    },
    {
      step: "4",
      title: "Создайте отчет",
      description: "Поделитесь честными впечатлениями и получите награду"
    }
  ];

  const recentReports = [
    {
      hotel: "Отель Метрополь",
      city: "Москва",
      rating: 4.2,
      guest: "Анна П.",
      date: "15 марта 2024"
    },
    {
      hotel: "Гранд Отель Европа", 
      city: "СПб",
      rating: 4.7,
      guest: "Михаил К.",
      date: "12 марта 2024"
    },
    {
      hotel: "Курорт Роза Хутор",
      city: "Сочи", 
      rating: 4.5,
      guest: "Елена С.",
      date: "10 марта 2024"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Станьте 
            <span className="block text-accent">Секретным гостем</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Путешествуйте бесплатно, помогая отелям становиться лучше. 
            Ваши честные отзывы — ключ к идеальному сервису.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6">
              Стать секретным гостем
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
              Узнать больше
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Почему стоит стать секретным гостем?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Получайте уникальные преимущества, помогая индустрии гостеприимства развиваться
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="shadow-card hover:shadow-travel transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Как это работает?
            </h2>
            <p className="text-xl text-muted-foreground">
              Простой процесс от заявки до получения награды
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-sunset rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Reviews */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Последние отчеты секретных гостей
            </h2>
            <p className="text-xl text-muted-foreground">
              Честные оценки от наших экспертов
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentReports.map((report, index) => (
              <Card key={index} className="shadow-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{report.hotel}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {report.city}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{report.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Гость: {report.guest}</span>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {report.date}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Готовы начать ваше путешествие?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к программе секретных гостей и получайте уникальные возможности для путешествий
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6">
              <CheckCircle className="mr-2 w-5 h-5" />
              Подать заявку сейчас
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
              Связаться с нами
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
