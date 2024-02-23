import React, { useState } from 'react';
import Header from './Components/Header';


function App() {
  const [expression, setExpression] = useState('');
  const [history, setHistory] = useState([]);

  const Expresion = (value) => {
    setExpression((prev) => prev + value);
  };

  const limpiar = () => {
    setExpression('');
  };

  const Resultado = () => {
    try {
      const result = eval(expression);
      setHistory([...history, { expression, result }]);
      setExpression(String(result));
    } catch (error) {
      setExpression('Error');
    }
  };

  return (
    <div className="container  mx-auto mt-8">
      <Header/>
      
      <div className="flex flex-col items-center">
        
        <div className="mb-4">

          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 w-64 text-xl text-right"
            value={expression}
            readOnly
          />
        </div>
        <div className="container grid mx-auto grid-cols-4 gap-2">
          {[7, 8, 9, '+', 4, 5, 6, '-', 1, 2, 3, '*', 0, '/', 'C', '='].map(
            (item, index) => (
              <button
                key={index}
                className="bg-white hover:bg-red-500 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => {
                  if (typeof item === 'number' || item === '.') {
                    Expresion(item);
                  } else if (item === 'C') {
                    limpiar();
                  } else if (item === '=') {
                    Resultado();
                  } else {
                    Expresion(` ${item} `);
                  }
                }}
              >
                {item}
              </button>
            )
          )}
        </div>
      </div>
      <div className="bg-white shadow-md m-6 rounded px-8 pb-8 pt-6 mb-4">
        <h2 className="text-center text-teal-400 uppercase font-semibold mb-2">Historial de operaciones</h2>
        <ul>
          {history.map((entry, index) => (
            <li key={index}>
              <span className="mr-2">{entry.expression}</span>
              <span>= {entry.result}</span>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
}

export default App;

