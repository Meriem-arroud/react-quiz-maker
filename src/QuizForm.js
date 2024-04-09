import { useState, useEffect } from 'react';
import QuizQuestions from './QuizQuestions';

export default function QuizForm() {

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [showQuestions, setshowQuestions] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://opentdb.com/api_category.php');
        const data = await response.json();
        setCategories(data.trivia_categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
  };

  const handleCreateQuiz = () => {
    console.log('Category:', selectedCategory);
    console.log('Difficulty:', selectedDifficulty);
    setshowQuestions(true)
  };

  return (
    <div>
      <h4>QUIZ MAKER</h4>
      <select id="categorySelect" onChange={handleCategoryChange} value={selectedCategory}>
        <option value="">Select a category</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <select id="difficultySelect" onChange={handleDifficultyChange} value={selectedDifficulty}>
        <option value="">Select difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button id="createBtn" onClick={handleCreateQuiz}>Create</button>
      {showQuestions && <QuizQuestions category={selectedCategory} difficulty={selectedDifficulty} />}
    </div>
  );
}