import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Простые учетные данные для демо (в реальном приложении это должно быть на сервере)
  const adminCredentials = {
    email: "admin@ostrov.ru",
    password: "admin123"
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Симуляция задержки сети
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (loginData.email === adminCredentials.email && loginData.password === adminCredentials.password) {
        toast({
          title: "Успешный вход",
          description: "Добро пожаловать в админ-панель!",
        });
        
        // Сохраняем статус админа в localStorage
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('adminEmail', loginData.email);
        
        // Перенаправляем в админ-панель
        navigate('/admin-dashboard');
      } else {
        toast({
          title: "Ошибка входа",
          description: "Неверный email или пароль",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при входе",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setLoginData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Кнопка возврата */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Вернуться на главную
          </Link>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Вход в админ-панель</CardTitle>
            <CardDescription>
              Войдите в систему управления программой "Секретный гость"
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email администратора</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@ostrov.ru"
                  value={loginData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Пароль</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Введите пароль"
                    value={loginData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "Вход..." : "Войти в админ-панель"}
              </Button>
            </form>

            {/* Информация для демо */}
            <Alert className="mt-6">
              <Shield className="h-4 w-4" />
              <AlertDescription>
                <strong>Демо-доступ:</strong><br />
                Email: admin@ostrov.ru<br />
                Пароль: admin123
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Дополнительная информация */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Админ-панель для управления программой "Секретный гость"</p>
          <p className="mt-1">Создание заданий • Управление гостями • Модерация отчетов</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
