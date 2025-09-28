import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Shield, Gift, ArrowRight, CheckCircle, MapPin, Clock, Award, TrendingUp, Camera, FileText, ChevronDown, Hotel, Plane, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);
  const processRef = useRef(null);
  const requirementsRef = useRef(null);
  const reviewsRef = useRef(null);
  const ctaRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const isInViewHero = useInView(heroRef, { once: true });
  const isInViewProcess = useInView(processRef, { once: true, threshold: 0.3 });
  const isInViewRequirements = useInView(requirementsRef, { once: true, threshold: 0.3 });
  const isInViewReviews = useInView(reviewsRef, { once: true, threshold: 0.3 });
  const isInViewCta = useInView(ctaRef, { once: true, threshold: 0.3 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // 3D Model Placeholder
  const ThreeDModel = () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-full h-full">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            {/* Остров */}
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.5, type: "spring" }}
              className="w-64 h-64 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full shadow-2xl"
            >
              {/* Пальмы */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div className="w-2 h-16 bg-yellow-800 absolute"></div>
                <div className="w-16 h-8 bg-green-500 rounded-full -ml-8"></div>
              </div>
              {/* Отель */}
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <div className="w-16 h-12 bg-white rounded-lg shadow-lg">
                  <div className="w-full h-2 bg-blue-500"></div>
                  <div className="grid grid-cols-3 gap-1 p-1">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-blue-300 rounded-sm"></div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Волны */}
            <motion.div
              animate={{ x: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-80"
            >
              <div className="w-full h-4 bg-blue-400 rounded-full opacity-60"></div>
              <div className="w-full h-3 bg-blue-500 rounded-full mt-1 opacity-40"></div>
            </motion.div>
          </div>
        </div>
        
        {/* Парящие элементы */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 left-20"
        >
          <Plane className="w-8 h-8 text-white opacity-80" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          className="absolute top-40 right-32"
        >
          <Compass className="w-6 h-6 text-yellow-300 opacity-90" />
        </motion.div>
      </div>
    </div>
  );

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

  const FloatingElements = () => (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-1/4 left-10"
      >
        <div className="w-4 h-4 bg-yellow-400 rounded-full opacity-60"></div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="absolute top-1/3 right-20"
      >
        <div className="w-6 h-6 bg-blue-400 rounded-full opacity-40"></div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-1/4 left-20"
      >
        <div className="w-3 h-3 bg-green-400 rounded-full opacity-50"></div>
      </motion.div>
    </>
  );

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800"
        style={{ y, opacity }}
      >
        <ThreeDModel />
        <FloatingElements />
        
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInViewHero ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-white/20 text-white border-white/30 text-sm px-4 py-2 backdrop-blur-sm">
              🏨 Программа качества Островка
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Станьте
              <motion.span 
                className="block bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInViewHero ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Секретным гостем
              </motion.span>
            </h1>
            <motion.p 
              className="text-lg md:text-xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInViewHero ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              Путешествуйте бесплатно или со скидкой до 100%, помогая отелям повышать качество сервиса.
              Ваши честные отзывы делают индустрию лучше для всех.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isInViewHero ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
            >
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
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              animate={isInViewHero ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
            >
              {[
                { number: "500+", label: "Активных гостей" },
                { number: "1200+", label: "Проверенных отелей" },
                { number: "95%", label: "Довольных участников" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInViewHero ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  <div className="text-3xl font-bold text-orange-400 mb-2">{stat.number}</div>
                  <div className="text-white/80">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-white/70" />
        </motion.div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section 
        className="py-20 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Преимущества программы
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Получайте уникальные возможности, помогая индустрии гостеприимства становиться лучше
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 h-full">
                  <CardHeader className="text-center pb-4">
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <benefit.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-lg font-semibold">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 text-center leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Requirements Section */}
      <motion.section 
        ref={requirementsRef}
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        animate={isInViewRequirements ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInViewRequirements ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Кто может стать секретным гостем?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Мы ищем опытных путешественников с критическим мышлением и вниманием к деталям.
              </p>
              <ul className="space-y-4">
                {requirements.map((req, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInViewRequirements ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{req}</span>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInViewRequirements ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
              >
                <Button className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3">
                  Проверить соответствие
                </Button>
              </motion.div>
            </motion.div>
            <motion.div 
              className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl"
              initial={{ opacity: 0, x: 50 }}
              animate={isInViewRequirements ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center">
                <motion.div 
                  className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Users className="w-12 h-12 text-white" />
                </motion.div>
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
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* How it works - Curved Timeline */}
      <motion.section 
        ref={processRef}
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isInViewProcess ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Декоративные элементы */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full translate-x-1/2 translate-y-1/2 opacity-20"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInViewProcess ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Как проходит процесс?
            </h2>
            <p className="text-xl text-gray-600">
              От заявки до получения вознаграждения — пошаговый путь секретного гостя
            </p>
          </motion.div>

          {/* Мобильная версия */}
          <div className="block md:hidden space-y-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInViewProcess ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-blue-600 mb-1">Шаг {step.step}</div>
                        <h3 className="text-lg font-semibold mb-2 text-gray-900">{step.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Десктоп версия с кривой линией */}
          <div className="hidden md:block relative min-h-[800px]">
            {/* Кривая линия - SVG Path */}
            <svg 
              className="absolute left-1/2 top-0 w-full h-full transform -translate-x-1/2 pointer-events-none z-0"
              viewBox="0 0 400 800"
              preserveAspectRatio="xMidYMid meet"
            >
              <motion.path
                d="M200,80 Q300,200 200,320 Q100,440 200,560 Q300,680 200,720"
                stroke="url(#gradient)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isInViewProcess ? { pathLength: 1 } : {}}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>

            {/* Блоки процесса */}
            {howItWorks.map((step, index) => {
              const isLeft = index % 2 === 0;
              const positions = [80, 200, 320, 440, 560];
              
              return (
                <motion.div
                  key={index}
                  className={`absolute ${isLeft ? 'left-8' : 'right-8'} w-5/12`}
                  style={{ top: `${positions[index]}px` }}
                  initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                  animate={isInViewProcess ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative"
                  >
                    {/* Точка на линии */}
                    <motion.div
                      className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-white shadow-lg z-10"
                      style={{ 
                        [isLeft ? 'right' : 'left']: '-3rem',
                      }}
                      initial={{ scale: 0 }}
                      animate={isInViewProcess ? { scale: 1 } : {}}
                      transition={{ delay: index * 0.3, type: "spring", stiffness: 200 }}
                    >
                      <step.icon className="w-3 h-3 text-white" />
                    </motion.div>

                    {/* Карточка */}
                    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                      {/* Акцентная полоска */}
                      <div className={`absolute top-0 bottom-0 w-1 ${isLeft ? 'right-0' : 'left-0'} bg-gradient-to-b from-blue-500 to-purple-600`}></div>
                      
                      <CardContent className="p-6 relative z-10">
                        <div className="flex items-start space-x-4">
                          <motion.div 
                            className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                          >
                            {step.step}
                          </motion.div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-blue-600 mb-1">Шаг {step.step}</div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-gray-800 transition-colors">
                              {step.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Стрелочка к центральной линии */}
                    <motion.div
                      className={`absolute top-1/2 transform -translate-y-1/2 ${
                        isLeft ? 'right-0 translate-x-8' : 'left-0 -translate-x-8'
                      }`}
                      initial={{ scale: 0, rotate: isLeft ? 180 : 0 }}
                      animate={isInViewProcess ? { scale: 1, rotate: isLeft ? 180 : 0 } : {}}
                      transition={{ delay: index * 0.3 + 0.5 }}
                    >
                      <div className={`w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg ${
                        isLeft ? 'rotate-180' : ''
                      }`}>
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Recent Reviews */}
      <motion.section 
        ref={reviewsRef}
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        animate={isInViewReviews ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInViewReviews ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Результаты работы секретных гостей
            </h2>
            <p className="text-xl text-gray-600">
              Реальные улучшения в отелях благодаря честным отчетам наших экспертов
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentReports.map((report, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInViewReviews ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 border border-gray-200 hover:-translate-y-2">
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
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={isInViewReviews ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
              Посмотреть все отчеты
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        ref={ctaRef}
        className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isInViewCta ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        {/* Парящие элементы */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-10 left-10 opacity-20"
        >
          <Hotel className="w-16 h-16 text-white" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 2 }}
          className="absolute bottom-20 right-20 opacity-20"
        >
          <Compass className="w-12 h-12 text-yellow-300" />
        </motion.div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInViewCta ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Готовы изменить индустрию?
          </motion.h2>
          <motion.p 
            className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInViewCta ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            Станьте частью программы, которая делает путешествия лучше для миллионов людей.
            Ваш опыт и честность — наша сила.
          </motion.p>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInViewCta ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            {[
              { number: "До 100%", label: "Скидка на проживание" },
              { number: "24/7", label: "Поддержка экспертов" },
              { number: "VIP", label: "Статус в сообществе" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInViewCta ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div className="text-2xl font-bold text-orange-400 mb-2">{stat.number}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInViewCta ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
          >
            <Link to="/application">
              <Button size="lg" className="bg-gradient-to-r фfrom-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white text-lg px-10 py-6 shadow-2xl">
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
          </motion.div>

          <motion.p 
            className="text-white/70 text-sm mt-6"
            initial={{ opacity: 0 }}
            animate={isInViewCta ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
          >
            Обработка заявок занимает 3-5 рабочих дней
          </motion.p>
        </div>
      </motion.section>
    </div>
  );
};

export default Index;