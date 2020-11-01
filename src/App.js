import React, {useState, useEffect} from "react";
import "./styles.css";
import api from './services/api'

function App() {

  const [repositories, setRepositories]=useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
      console.log(response.data)
    })
  }, []);

  async function handleAddRepository() {
    const response= await api.post('repositories', {
      title: `Novo Repositorio ${Date.now()}`,
      url:"url",
      techs:["java","javascript"]
    })

    setRepositories([...repositories, response.data])
    
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
    const index=repositories.findIndex((val)=> val.id===id);
    repositories.splice(index,1);
    setRepositories([...repositories]);
   
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((rep,index)=>{
          return (<li key={index}>
            {rep.title}
            <button onClick={() => handleRemoveRepository(rep.id)}>Remover</button>
          </li>)
        })}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
