import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])
  useEffect(()=>{
    api.get('/repositories').then((response)=>{
      setRepositories([...response.data])
    });
  },[])
  async function handleAddRepository() {
    const data = {
      title: `Projeto ${Date.now()}`,
      url: 'https://github.com/viniciuswz/conceitos-react',
      techs: ['React', 'Node']
    }

    api.post('/repositories',data).then((response)=>{
      setRepositories([...repositories, response.data])
    })
  }

  async function handleRemoveRepository(id) {
    // TODO
    const repositoryIndex = repositories.findIndex( repository=> repository.id === id);

    api.delete(`/repositories/${id}`).then((reponse)=>{
      console.log('done');
      const actualRepositories = repositories;
      actualRepositories.splice(repositoryIndex,1);
      setRepositories([...actualRepositories])
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map( repository => 
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
            )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
