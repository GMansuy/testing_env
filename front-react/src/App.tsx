import React, { useEffect, useState } from 'react';
import './App.css';

interface Test {
  id : number;
  text : string;
}

function App() {

  const [helloMessage, setHelloMessage] = useState<string>('No message');

  const fetchMessage = async () => {
    const data = await fetch('http://localhost:5000/message', {method:"GET"});
    const message = await data.json();
    return (message.message);
  }

  useEffect(() => {
    const getMessage = async() => {
      const message : string = await fetchMessage();
      setHelloMessage(message);
    } 
    getMessage();
    
    const displayExistingTests = async() => {
      const testData  =  await getTest();
      setTests(testData);
    }
    displayExistingTests();

  }, [])

  const [tests, setTests] = useState<Test[]>([{id : 0, text : 'No entry'}]);

  const getTest  = async () => {
    const response = await fetch('http://localhost:5000/test', {
      method:"GET"
    });
    const arrayOfTest : Test[] = await response.json();
    return arrayOfTest;
  }

  const [inputText, setInputText] = useState('');
  const [displayTest] = useState<string>('None');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });
      const testData  =  await getTest();
      setTests(testData);
    } catch (error) {
      console.error('Error sending data:', error);
    }

  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputText(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {helloMessage + ' : ' + displayTest} 
        </p>
        <form onSubmit={handleSubmit}>
        <label>
          Enter Text:
          <input type="text" value={inputText} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <ul>
        {tests.map(item => (
          <li key={item.id}>
            {item.text}
          </li>
        ))}
      </ul>
      </header>
    </div>
  );
}

export default App;
