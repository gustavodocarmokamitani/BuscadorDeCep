
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import api from './services/api'
import './styles.css';

function App() {

  const [input, setInput] = useState("")
  const [cep, setCep] = useState({})

  async function handleSearch() {
    if (input === "") {
      alert("Preencha o campo Cep !")
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("")
    }

    catch {
      alert("Ops erro ao buscar")
      setInput("")
    }
  }


  return (
    <div className="container">
      <h1 className="title">Buscador de Cep</h1>

      <div className="containerInput">
        <input type="text" placeholder="Digite seu cep ..." value={input} onChange={(e) => setInput(e.target.value)} />

        <button onClick={handleSearch} className="buttonSearch"><FiSearch /></button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h3>CEP: {cep.cep}</h3>
          <span>{cep.logradouro + " " + cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}
    </div>
  );
}

export default App;
