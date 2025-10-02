import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../../pages/AdminDashboard";

const ProtectedAdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Проверяем, авторизован ли пользователь как админ
    const isAdmin = localStorage.getItem('isAdmin');
    const adminEmail = localStorage.getItem('adminEmail');

    if (!isAdmin || !adminEmail) {
      // Если не авторизован, перенаправляем на страницу входа
      navigate('/admin-login');
    }
  }, [navigate]);

  // Проверяем авторизацию перед рендером
  const isAdmin = localStorage.getItem('isAdmin');
  const adminEmail = localStorage.getItem('adminEmail');

  if (!isAdmin || !adminEmail) {
    return null; 
  }

  return <AdminDashboard />;
};

export default ProtectedAdminDashboard;
