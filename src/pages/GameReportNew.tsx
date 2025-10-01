import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    CheckCircle, Clock, Star, MapPin, Trophy,
    ArrowLeft, PlayCircle, Save, Timer, Calendar,
    Target, CheckCircle2, XCircle
} from "lucide-react";
import { pointsSystem } from "@/lib/pointsSystem.js";
import { useAssignments } from "@/hooks/useAssignments.js";

function GameReportNew() {
    const { reportId } = useParams();
    const navigate = useNavigate();
    const { takenAssignments } = useAssignments();

    const assignment = takenAssignments.find(a => a.id.toString() === reportId) || {
        id: reportId,
        hotel_name: "Гранд Отель Сочи",
        city: "Сочи",
        check_in_date: "2024-10-15",
        check_out_date: "2024-10-18",
        deadline_date: "2024-10-20",
        priority: "Высокий",
        reward_points: 500
    };

    const [startTime] = useState(Date.now());
    const [streakCount, setStreakCount] = useState(0);
    const [comboMultiplier, setComboMultiplier] = useState(1);

    const [report, setReport] = useState({
        id: reportId,
        hotelName: assignment.hotel_name,
        checkIn: assignment.check_in_date,
        checkOut: assignment.check_out_date,
        deadline: assignment.deadline_date,
        totalPoints: 0,
        progress: 0,
        timeSpent: 0
    });

    const [checkpoints, setCheckpoints] = useState([
        {
            id: "transfer",
            title: "🚗 Трансфер",
            description: "Оцените качество трансфера до отеля",
            completed: false,
            points: 75,
            content: "",
            rating: 0
        },
        {
            id: "checkin",
            title: "🏨 Регистрация",
            description: "Работа стойки регистрации и заселение",
            completed: false,
            points: 100,
            content: "",
            rating: 0
        },
        {
            id: "stay",
            title: "🌟 Пребывание",
            description: "Общее впечатление от отеля",
            completed: false,
            points: 150,
            content: "",
            rating: 0
        },
        {
            id: "checkout",
            title: "👋 Выселение",
            description: "Процесс выселения и финальные впечатления",
            completed: false,
            points: 100,
            content: "",
            rating: 0
        }
    ]);

    const [activeCheckpoint, setActiveCheckpoint] = useState(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setReport(prev => ({
                ...prev,
                timeSpent: Math.floor((Date.now() - startTime) / 1000)
            }));
        }, 1000);
        return () => clearInterval(timer);
    }, [startTime]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return minutes > 0 ? `${minutes}м ${secs}с` : `${secs}с`;
    };

    const completeCheckpoint = (checkpointId, content, rating) => {
        setCheckpoints(prev => prev.map(cp =>
            cp.id === checkpointId
                ? { ...cp, completed: true, content, rating, completedAt: new Date().toISOString() }
                : cp
        ));

        const checkpoint = checkpoints.find(cp => cp.id === checkpointId);
        if (checkpoint) {
            let earnedPoints = checkpoint.points;
            const ratingBonus = rating >= 4 ? 50 : rating >= 3 ? 25 : 0;
            const lengthBonus = content.length > 100 ? 50 : content.length > 50 ? 25 : 0;
            const totalEarned = earnedPoints + ratingBonus + lengthBonus;

            pointsSystem.addPoints(totalEarned, `Чекпоинт: ${checkpoint.title} (${report.hotelName})`);

            setReport(prev => ({
                ...prev,
                totalPoints: prev.totalPoints + totalEarned,
                progress: Math.min(prev.progress + 25, 100)
            }));

            setStreakCount(prev => prev + 1);
        }

        setActiveCheckpoint(null);
    };

    const completedCheckpoints = checkpoints.filter(cp => cp.completed).length;
    const totalCheckpoints = checkpoints.length;
    const overallProgress = (completedCheckpoints / totalCheckpoints) * 100;

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <Button
                            variant="ghost"
                            onClick={() => navigate(-1)}
                            className="text-white hover:bg-white/20"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Назад
                        </Button>
                        <div className="flex items-center space-x-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold">{formatTime(report.timeSpent)}</div>
                                <div className="text-xs opacity-80">Время</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">{streakCount}</div>
                                <div className="text-xs opacity-80">Серия</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">{report.hotelName}</h1>
                            <div className="flex items-center space-x-4 text-sm opacity-90">
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    {report.checkIn} - {report.checkOut}
                                </div>
                                <div className="flex items-center">
                                    <Timer className="w-4 h-4 mr-1" />
                                    Дедлайн: {report.deadline}
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold">{pointsSystem.getUserPoints()} очков</div>
                            <Trophy className="w-5 h-5 inline" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="pt-6">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">Общий прогресс</h3>
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl font-bold text-green-600">{completedCheckpoints}</span>
                                <span className="text-gray-400">/</span>
                                <span className="text-2xl font-bold text-gray-600">{totalCheckpoints}</span>
                                <CheckCircle className="w-5 h-5 text-green-500" />
                            </div>
                        </div>

                        <Progress value={overallProgress} className="h-4" />
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <div className="flex items-center space-x-2">
                    <Target className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-bold">Чекпоинты</h2>
                    <Badge variant="outline">{completedCheckpoints}/{totalCheckpoints}</Badge>
                </div>

                {checkpoints.map((checkpoint, index) => (
                    <Card
                        key={checkpoint.id}
                        className={`transition-all duration-300 hover:shadow-lg ${checkpoint.completed
                            ? 'bg-green-50 border-green-200'
                            : index === completedCheckpoints
                                ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-300'
                                : 'hover:bg-gray-50'
                            }`}
                    >
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${checkpoint.completed
                                        ? 'bg-green-500 text-white'
                                        : index === completedCheckpoints
                                            ? 'bg-blue-500 text-white animate-pulse'
                                            : 'bg-gray-200 text-gray-500'
                                        }`}>
                                        {checkpoint.completed ? (
                                            <CheckCircle2 className="w-5 h-5" />
                                        ) : index === completedCheckpoints ? (
                                            <PlayCircle className="w-5 h-5" />
                                        ) : (
                                            <span className="font-bold">{index + 1}</span>
                                        )}
                                    </div>
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

                        {checkpoint.completed ? (
                            <CardContent>
                                <p className="text-sm text-gray-700">{checkpoint.content}</p>
                                <div className="flex items-center mt-2">
                                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                                    <span className="text-sm">{checkpoint.rating}/5</span>
                                </div>
                            </CardContent>
                        ) : index === completedCheckpoints ? (
                            <CardContent>
                                <Button
                                    onClick={() => setActiveCheckpoint(checkpoint.id)}
                                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500"
                                >
                                    <PlayCircle className="w-4 h-4 mr-2" />
                                    Начать чекпоинт
                                </Button>
                            </CardContent>
                        ) : (
                            <CardContent>
                                <div className="text-center py-4 text-gray-400">
                                    <XCircle className="w-8 h-8 mx-auto mb-2" />
                                    <p className="text-sm">Завершите предыдущие чекпоинты</p>
                                </div>
                            </CardContent>
                        )}
                    </Card>
                ))}
            </div>

            {overallProgress >= 75 && (
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <Trophy className="w-16 h-16 text-green-600 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-green-900 mb-2">🎉 Отчет готов!</h3>
                            <p className="text-green-700 mb-4">
                                Отличная работа! Вы заполнили {Math.round(overallProgress)}% отчета.
                            </p>

                            <Button
                                onClick={() => {
                                    const finalBonus = (assignment.reward_points || 500) + Math.floor(streakCount * 10);
                                    pointsSystem.addPoints(finalBonus, `🏆 Завершение отчета: ${report.hotelName}`);
                                    alert(`🎉 Отчет завершен! Получено ${finalBonus} очков!`);
                                    navigate('/guest-dashboard');
                                }}
                                className="bg-gradient-to-r from-green-500 to-emerald-500"
                                size="lg"
                            >
                                <Trophy className="w-5 h-5 mr-2" />
                                Завершить отчет (+{(assignment.reward_points || 500) + Math.floor(streakCount * 10)} очков)
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {activeCheckpoint && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <Card className="w-full max-w-2xl">
                        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                            <CardTitle>
                                {checkpoints.find(cp => cp.id === activeCheckpoint)?.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 p-6">
                            <div>
                                <Label className="text-lg font-medium">Ваша оценка</Label>
                                <div className="flex space-x-2 mt-2">
                                    {[1, 2, 3, 4, 5].map(rating => {
                                        const currentCheckpoint = checkpoints.find(cp => cp.id === activeCheckpoint);
                                        const isActive = currentCheckpoint && rating <= (currentCheckpoint.rating || 0);
                                        return (
                                            <Button
                                                key={rating}
                                                variant="ghost"
                                                size="lg"
                                                className={`p-2 ${isActive ? 'text-yellow-500' : 'text-gray-300'}`}
                                                onClick={() => {
                                                    setCheckpoints(prev => prev.map(cp =>
                                                        cp.id === activeCheckpoint ? { ...cp, rating } : cp
                                                    ));
                                                }}
                                            >
                                                <Star className={`w-8 h-8 ${isActive ? 'fill-current' : ''}`} />
                                            </Button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <Label className="text-lg font-medium">Подробное описание</Label>
                                <Textarea
                                    placeholder="Опишите ваши впечатления (минимум 50 символов)"
                                    className="mt-2 min-h-[120px]"
                                    value={checkpoints.find(cp => cp.id === activeCheckpoint)?.content || ""}
                                    onChange={(e) => {
                                        setCheckpoints(prev => prev.map(cp =>
                                            cp.id === activeCheckpoint ? { ...cp, content: e.target.value } : cp
                                        ));
                                    }}
                                />
                                <div className="text-sm text-gray-500 mt-1">
                                    {checkpoints.find(cp => cp.id === activeCheckpoint)?.content?.length || 0} символов
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <Button
                                    onClick={() => {
                                        const checkpoint = checkpoints.find(cp => cp.id === activeCheckpoint);
                                        if (checkpoint && checkpoint.content && checkpoint.content.length >= 50 && checkpoint.rating) {
                                            completeCheckpoint(activeCheckpoint, checkpoint.content, checkpoint.rating);
                                        } else {
                                            alert('Пожалуйста, поставьте оценку и напишите описание (минимум 50 символов)');
                                        }
                                    }}
                                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500"
                                    disabled={!checkpoints.find(cp => cp.id === activeCheckpoint)?.rating ||
                                        (checkpoints.find(cp => cp.id === activeCheckpoint)?.content?.length || 0) < 50}
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    Завершить чекпоинт
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
        </div>
    );
}

export default GameReportNew;