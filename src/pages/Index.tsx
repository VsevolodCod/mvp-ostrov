import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Shield, Gift, ArrowRight, CheckCircle, MapPin, Clock, Award, TrendingUp, Camera, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const benefits = [
    {
      icon: Gift,
      title: "Бесплатное проживание",
      description: "Получайте скидки до 100% на проживание в премиальных отелях",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Award,
      title: "Система наград",
      description: "Зарабатывайте баллы, бейджи и повышайте свой рейтинг эксперта",
      color: "from-yellow-500 to-orange-600"
    },
    {
      icon: TrendingUp,
      title: "Влияние на качество",
      description: "Ваши отчеты напрямую влияют на улучшение сервиса отелей",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Users,
      title: "Сообщество экспертов",
      description: "Присоединяйтесь к закрытому сообществу опытных путешественников",
      color: "from-purple-500 to-pink-600"
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Подайте заявку",
      description: "Заполните детальную анкету о своем опыте путешествий и предпочтениях",
      icon: FileText
    },
    {
      step: "2",
      title: "Пройдите отбор",
      description: "Наша команда проверит вашу заявку и опыт путешествий",
      icon: CheckCircle
    },
    {
      step: "3",
      title: "Получите задание",
      description: "Выберите отель из списка доступных или получите персональное предложение",
      icon: MapPin
    },
    {
      step: "4",
      title: "Проведите проверку",
      description: "Остановитесь в отеле инкогнито и оцените все аспекты сервиса",
      icon: Camera
    },
    {
      step: "5",
      title: "Создайте отчет",
      description: "Заполните подробный отчет с фото и получите вознаграждение",
      icon: Award
    }
  ];

  const requirements = [
    "Опыт путешествий не менее 10 поездок в год",
    "Внимательность к деталям и объективность",
    "Готовность следовать инструкциям программы",
    "Возраст от 21 года",
    "Активность в социальных сетях (желательно)"
  ];

  const recentReports = [
    {
      hotel: "Отель Метрополь",
      city: "Москва",
      rating: 4.2,
      guest: "Анна П.",
      date: "15 марта 2024",
      status: "Проверен",
      improvements: "Улучшен завтрак"
    },
    {
      hotel: "Гранд Отель Европа",
      city: "СПб",
      rating: 4.7,
      guest: "Михаил К.",
      date: "12 марта 2024",
      status: "Проверен",
      improvements: "Обновлен номерной фонд"
    },
    {
      hotel: "Курорт Роза Хутор",
      city: "Сочи",
      rating: 4.5,
      guest: "Елена С.",
      date: "10 марта 2024",
      status: "Проверен",
      improvements: "Расширен SPA-центр"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800">
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
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white text-lg px-8 py-6 shadow-xl">
                <CheckCircle className="mr-2 w-5 h-5" />
                Подать заявку сейчас
              </Button>
            </Link>
            <Link to="/hotel-selection">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 backdrop-blur-sm">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
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

      {/* Requirements Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Кто может стать секретным гостем?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Мы ищем опытных путешественников с критическим мышлением и вниманием к деталям.
              </p>
              <ul className="space-y-4">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
              <Link to="/application">
                <Button className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3">
                  Проверить соответствие
                </Button>
              </Link>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Присоединяйтесь к элите</h3>
                <p className="text-gray-600 mb-6">
                  Только 15% заявок проходят отбор. Станьте частью эксклюзивного сообщества экспертов по качеству.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">15%</div>
                    <div className="text-sm text-gray-500">Процент отбора</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">4.9</div>
                    <div className="text-sm text-gray-500">Средний рейтинг</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Как проходит процесс?
            </h2>
            <p className="text-xl text-gray-600">
              От заявки до получения вознаграждения — пошаговый путь секретного гостя
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center relative">
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 transform -translate-x-1/2"></div>
                )}
                <div className="relative z-10 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="text-sm font-semibold text-blue-600 mb-2">Шаг {step.step}</div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Reviews */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Результаты работы секретных гостей
            </h2>
            <p className="text-xl text-gray-600">
              Реальные улучшения в отелях благодаря честным отчетам наших экспертов
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentReports.map((report, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border border-gray-200">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900">{report.hotel}</CardTitle>
                      <CardDescription className="flex items-center mt-1 text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        {report.city}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-lg">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-semibold text-yellow-700">{report.rating}</span>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 w-fit">
                    {report.status}
                  </Badge>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="bg-blue-50 p-3 rounded-lg mb-4">
                    <div className="text-sm font-medium text-blue-900 mb-1">Улучшения:</div>
                    <div className="text-sm text-blue-700">{report.improvements}</div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Эксперт: {report.guest}</span>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {report.date}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/reports">
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                Посмотреть все отчеты
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Готовы изменить индустрию?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Станьте частью программы, которая делает путешествия лучше для миллионов людей.
            Ваш опыт и честность — наша сила.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400 mb-2">До 100%</div>
              <div className="text-white/80 text-sm">Скидка на проживание</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400 mb-2">24/7</div>
              <div className="text-white/80 text-sm">Поддержка экспертов</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400 mb-2">VIP</div>
              <div className="text-white/80 text-sm">Статус в сообществе</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/application">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white text-lg px-10 py-6 shadow-2xl">
                <CheckCircle className="mr-2 w-5 h-5" />
                Подать заявку сейчас
              </Button>
            </Link>
            <Link to="/guest-dashboard">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-10 py-6 backdrop-blur-sm">
                <Users className="mr-2 w-5 h-5" />
                Войти в личный кабинет
              </Button>
            </Link>
          </div>

          <p className="text-white/70 text-sm mt-6">
            Обработка заявок занимает 3-5 рабочих дней
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
