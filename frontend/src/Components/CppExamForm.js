import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';




const CppExamForm = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(Array(20).fill(null));
  const [loading, setLoading] = useState(true);
 

  const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const name = queryParams.get('name');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/getResponse?name=${name}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (!res.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data = await res.json();
        const parsedResponse =await JSON.parse(data.choices[0].message.content);
        setQuestions(parsedResponse.questions);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching questions:', err);
      }
    };

    fetchData();
  }, []);

  const handleOptionChange = (questionIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Answers:', answers);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="exam-form">
      <h2 className="Subject-header">C++ Exam</h2>
      <form onSubmit={handleSubmit} className="subject-form">
        {questions.map((questionData, questionIndex) => (
          <div key={questionIndex} className="question">
            <p>
              {questionIndex + 1} . {questionData.question}
            </p>
            {questionData.options.map((option, optionIndex) => (
              <label key={optionIndex} className="objectives">
                
                <input
                  type="radio"
                  name={`question-${questionIndex}`}
                  value={optionIndex}
                  checked={answers[questionIndex] === optionIndex}
                  onChange={() => handleOptionChange(questionIndex, optionIndex)}
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CppExamForm;
