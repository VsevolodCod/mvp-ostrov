import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Shield, Gift, ArrowRight, CheckCircle, MapPin, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const benefits = [
    {
      icon: Gift,
      title: "Бесплатное проживание",
      description: "Получайте скидки до 100% на проживание в премиальных отелях"
    },
    {
      icon: Award,
      title: "Система наград",
      description: "Зарабатывайте баллы, бейджи и повышайте свой рейтинг эксперта"
    },
    {
      icon: Users,
      title: "Сообщество экспертов",
      description: "Присоединяйтесь к закрытому сообществу опытных путешественников"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 text-sm px-4 py-2">
            🏨 Программа качества Островка
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Станьте
            <span className="block bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Секретным гостем
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Путешествуйте бесплатно или со скидкой до 100%, помогая отелям повышать качество сервиса.
            Ваши честные отзывы делают индустрию лучше для всех.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/application">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white text-lg px-8 py-6">
                <CheckCircle className="mr-2 w-5 h-5" />
                Подать заявку сейчас
              </Button>
            </Link>
            <Link to="/hotel-selection">
              <Button size="lg" className="bg-white/20 border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-6">
                Посмотреть задания
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">500+</div>
              <div className="text-white/80">Активных гостей</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">1200+</div>
              <div className="text-white/80">Проверенных отелей</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">95%</div>
              <div className="text-white/80">Довольных участников</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Преимущества программы
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Получайте уникальные возможности, помогая индустрии гостеприимства становиться лучше
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg h-full">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg font-semibold">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 text-center leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Готовы стать секретным гостем?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Присоединяйтесь к программе и начните путешествовать с пользой уже сегодня
          </p>
          <Link to="/application">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
              Подать заявку
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;