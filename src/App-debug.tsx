import { BrowserRouter, Routes, Route } from "react-router-dom";

const SimpleIndex = () => (
  <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
    <h1>Секретный гость Островка - Тест</h1>
    <p>Если вы видите этот текст, React приложение работает!</p>
    <p>URL: {window.location.href}</p>
    <p>Base: {import.meta.env.PROD ? '/mvp-ostrov' : 'dev mode'}</p>
  </div>
);

const App = () => (
  <BrowserRouter
    basename={import.meta.env.PROD ? '/mvp-ostrov' : ''}
  >
    <Routes>
      <Route path="/" element={<SimpleIndex />} />
      <Route path="*" element={<div>404 - Страница не найдена</div>} />
    </Routes>
  </BrowserRouter>
);

export default App;