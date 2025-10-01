import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CheckCircle, Clock, Star, MapPin, Camera, 
  Utensils, Waves, Dumbbell, Car, Trophy,
  ArrowLeft, Plus, Edit3, Save, Award
} from "lucide-react";

interface Checkpoint {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  points: number;
  content?: string;
  rating?: number;
}

interface ReportBlock {
  id: string;
  title: string;
  icon: any;
  content: string;
  rating: number;
  photos: string[];
  lastUpdated: string;
}

const GameReport = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  
  const [report, setReport] = useState({
    id: reportId,
    hotelName: "Гранд Отель Сочи",
    checkIn: "2024-10-15",
    checkOut: "2024-10-18",
    totalPoints: 0,
    level: 1,
    progress: 0
  });

  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([
    {
      id: "transfer",
      title: "Трансфер",
      description: "Оцените качество трансфера до отеля",
      completed: false,
      points: 50,
      content: "",
      rating: 0
    },
    {
      id: "checkin",
      title: "Регистрация и заселение",
      description: "Работа стойки регистрации, готовность номера",
      completed: false,
      points: 100,
      content: "",
      rating: 0
    },
    {
      id: "stay",
      title: "Пребывание в отеле",
      description: "Еда, пляж, активности, номер",
      completed: false,
      points: 200,
      content: "",
      rating: 0
    },
    {
      id: "checkout",
      title: "Выселение и выезд",
      description: "Процесс выселения, удобства для ожидающих",
      completed: false,
      points: 100,
      content: "",
      rating: 0
    }
  ]);

  const [reportBlocks, setReportBlocks] = useState<ReportBlock[]>([
    {
      id: "room",
      title: "Номер",
      icon: MapPin,
      content: "",
      rating: 0,
      photos: [],
      lastUpdated: ""
    },
    {
      id: "food",
      title: "Еда и рестораны",
      icon: Utensils,
      content: "",
      rating: 0,
      photos: [],
      lastUpdated: ""
    },
    {
      id: "beach",
      title: "Пляж",
      icon: Waves,
      content: "",
      rating: 0,
      photos: [],
      lastUpdated: ""
    },
    {
      id: "activities",
      title: "Активности",
      icon: Dumbbell,
      content: "",
      rating: 0,
      photos: [],
      lastUpdated: ""
    }
  ]);

  const [activeCheckpoint, setActiveCheckpoint] = useState<string | null>(null);
  const [activeBlock, setActiveBlock] = useState<string | null>(null);

  const completeCheckpoint = (checkpointId: string, content: string, rating: number) => {
    setCheckpoints(prev => prev.map(cp => 
      cp.id === checkpointId 
        ? { ...cp, completed: true, content, rating }
        : cp
    ));
    
    const checkpoint = checkpoints.find(cp => cp.id === checkpointId);
    if (checkpoint) {
      setReport(prev => ({
        ...prev,
        totalPoints: prev.totalPoints + checkpoint.points,
        progress: Math.min(prev.progress + 25, 100)
      }));
    }
    
    setActiveCheckpoint(null);
  };

  const updateReportBlock = (blockId: string, content: string, rating: number) => {
    setReportBlocks(prev => prev.map(block => 
      block.id === blockId 
        ? { ...block, content, rating, lastUpdated: new Date().toLocaleString() }
        : block
    ));
    
    // Добавляем бонусные очки за детализацию
    setReport(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + 25
    }));
    
    setActiveBlock(null);
  };

  const getProgressColor = (progress: number) => {
    if (progress < 25) return "bg-red-500";
    if (progress < 50) return "bg-yellow-500";
    if (progress < 75) return "bg-blue-500";
    return "bg-green-500";
  };

  const CheckpointCard = ({ checkpoint }: { checkpoint: Checkpoint }) => (
    <Card className={`cursor-pointer transition-all ${checkpoint.completed ? 'bg-green-50 border-green-200' : 'hover:shadow-md'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {checkpoint.completed ? (
              <CheckCircle className="w-6 h-6 text-green-600" />
            ) : (
              <Clock className="w-6 h-6 text-gray-400" />
            )}
            <div>
              <CardTitle className="text-lg">{checkpoint.title}</CardTitle>
              <p className="text-sm text-gray-600">{checkpoint.description}</p>
            </div>
          </div>
          <Badge variant={checkpoint.completed ? "default" : "secondary"}>
            +{checkpoint.points} очков
          </Badge>
        </div>
      </CardHeader>
      {!checkpoint.completed && (
        <CardContent>
          <Button 
            onClick={() => setActiveCheckpoint(checkpoint.id)}
            className="w-full"
          >
            Заполнить чекпоинт
          </Button>
        </CardContent>
      )}
      {checkpoint.completed && (
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span>Оценка: {checkpoint.rating}/5</span>
            </div>
            <p className="text-sm text-gray-700">{checkpoint.content}</p>
          </div>
        </CardContent>
      )}
    </Card>
  );

  const ReportBlockCard = ({ block }: { block: ReportBlock }) => {
    const IconComponent = block.icon;
    return (
      <Card className="cursor-pointer hover:shadow-md transition-all">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <IconComponent className="w-6 h-6 text-blue-600" />
              <div>
                <CardTitle className="text-lg">{block.title}</CardTitle>
                {block.lastUpdated && (
                  <p className="text-xs text-gray-500">Обновлено: {block.lastUpdated}</p>
                )}
              </div>
            </div>
            {block.rating > 0 && (
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span>{block.rating}/5</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {block.content ? (
            <div className="space-y-2">
              <p className="text-sm text-gray-700">{block.content}</p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setActiveBlock(block.id)}
              >
                <Edit3 className="w-4 h-4 mr-1" />
                Редактировать
              </Button>
            </div>
          ) : (
            <Button 
              onClick={() => setActiveBlock(block.id)}
              variant="outline"
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-1" />
              Добавить информацию
            </Button>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            Назад
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{report.hotelName}</h1>
            <p className="text-gray-600">{report.checkIn} - {report.checkOut}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-2 mb-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-xl font-bold">{report.totalPoints} очков</span>
          </div>
          <Badge className="bg-purple-100 text-purple-800">
            Уровень {report.level}
          </Badge>
        </div>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Прогресс отчета</span>
              <span>{report.progress}%</span>
            </div>
            <Progress value={report.progress} className="h-3" />
            <p className="text-xs text-gray-600">
              Заполните все чекпоинты и блоки для получения максимальных очков
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Checkpoints */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
            Чекпоинты
          </h2>
          {checkpoints.map(checkpoint => (
            <CheckpointCard key={checkpoint.id} checkpoint={checkpoint} />
          ))}
        </div>

        {/* Report Blocks */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Edit3 className="w-6 h-6 mr-2 text-blue-600" />
            Блоки отчета
          </h2>
          {reportBlocks.map(block => (
            <ReportBlockCard key={block.id} block={block} />
          ))}
        </div>
      </div>

      {/* Checkpoint Modal */}
      {activeCheckpoint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>
                {checkpoints.find(cp => cp.id === activeCheckpoint)?.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Оценка (1-5)</Label>
                <div className="flex space-x-2 mt-1">
                  {[1, 2, 3, 4, 5].map(rating => (
                    <Button
                      key={rating}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const checkpoint = checkpoints.find(cp => cp.id === activeCheckpoint);
                        if (checkpoint) {
                          setCheckpoints(prev => prev.map(cp => 
                            cp.id === activeCheckpoint ? { ...cp, rating } : cp
                          ));
                        }
                      }}
                    >
                      <Star className="w-4 h-4" />
                      {rating}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Описание</Label>
                <Textarea 
                  placeholder="Опишите ваши впечатления..."
                  onChange={(e) => {
                    setCheckpoints(prev => prev.map(cp => 
                      cp.id === activeCheckpoint ? { ...cp, content: e.target.value } : cp
                    ));
                  }}
                />
              </div>
              <div className="flex space-x-2">
                <Button 
                  onClick={() => {
                    const checkpoint = checkpoints.find(cp => cp.id === activeCheckpoint);
                    if (checkpoint && checkpoint.content && checkpoint.rating) {
                      completeCheckpoint(activeCheckpoint, checkpoint.content, checkpoint.rating);
                    }
                  }}
                  className="flex-1"
                >
                  <Save className="w-4 h-4 mr-1" />
                  Сохранить
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setActiveCheckpoint(null)}
                >
                  Отмена
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Block Modal */}
      {activeBlock && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>
                {reportBlocks.find(block => block.id === activeBlock)?.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Оценка (1-5)</Label>
                <div className="flex space-x-2 mt-1">
                  {[1, 2, 3, 4, 5].map(rating => (
                    <Button
                      key={rating}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setReportBlocks(prev => prev.map(block => 
                          block.id === activeBlock ? { ...block, rating } : block
                        ));
                      }}
                    >
                      <Star className="w-4 h-4" />
                      {rating}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Описание</Label>
                <Textarea 
                  placeholder="Добавьте детали..."
                  value={reportBlocks.find(block => block.id === activeBlock)?.content || ""}
                  onChange={(e) => {
                    setReportBlocks(prev => prev.map(block => 
                      block.id === activeBlock ? { ...block, content: e.target.value } : block
                    ));
                  }}
                />
              </div>
              <div className="flex space-x-2">
                <Button 
                  onClick={() => {
                    const block = reportBlocks.find(b => b.id === activeBlock);
                    if (block && block.content && block.rating) {
                      updateReportBlock(activeBlock, block.content, block.rating);
                    }
                  }}
                  className="flex-1"
                >
                  <Save className="w-4 h-4 mr-1" />
                  Сохранить
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setActiveBlock(null)}
                >
                  Отмена
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default GameReport;