// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import LoginPage from './components/login';
import SectionLinks from './components/sections-links';
import About from "./components/About";
import FruitChatbot from "./components/Chat";
import TranslationPage from "./components/Translation";
import FAQComponent from "./components/Faq";
function App() {
  return (
    <Router>
      <Routes>
        {/* Define routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/sections" element={<SectionLinks />} />
        <Route path="/about" element={<About />} />
        <Route path="/chat" element={<FruitChatbot />} />
        <Route path="/translate" element={<TranslationPage />} />
        <Route path="/faqs" element={<FAQComponent />} />
        {/* Add more routes as necessary */}
      </Routes>
    </Router>
  );
}

export default App;
