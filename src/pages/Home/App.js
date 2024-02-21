import { useState } from 'react'
import Header from '../../components/Header/Header'
import GitHub from '../../assets/images/Github.svg'
import Lista from '../../components/ItemList'
import './styles.css'

const App = () => {
  const [user, setUser] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [repos, setRepos] = useState(null)

  const getData = async () => {
    const response = await fetch(`https://api.github.com/users/${user}`)
    const dataUser = await response.json()
    
    if(dataUser.name){
      const {avatar_url, name, bio, login } = dataUser
      setCurrentUser({avatar_url, name, bio, login }) 
    
      const response_repos = await fetch(`https://api.github.com/users/${user}/repos`)
      const dataRespos = await response_repos.json()

      if(dataRespos.length){
        setRepos(dataRespos)
      }
    }
  }

  return (
    <div className="App">
      <Header />
      <div className="content">
        <img src={GitHub} className="background" alt="background App" />
        <div className="informations">
          <div>
            <input name="usuario" placeholder="Usuario" onChange={(e) => { setUser(e.target.value)}}></input>
            <button onClick={getData} type='button'>Buscar</button>
          </div>
          {
            currentUser?.name ? (
              <>
                <div className="perfil">
                  <img className="profile" src={currentUser.avatar_url} alt="user photo"/>
                  <div>
                    <h2>{currentUser.name == null ? "sem nome" : currentUser.name }</h2>
                    <span>
                      <p>@{currentUser.login}</p>
                    </span>
                    <p>{currentUser.bio == null ? "sem descrição" : currentUser.bio }</p>
                  </div>
                </div>
                <hr></hr>
                <div> 
                  <h3>Repositórios</h3>
                  { repos?.length ? (
                      <>
                        { repos.map((rep) => (
                          <Lista html_url={rep.html_url} title={rep.name} description={rep.description} />
                        ))}
                      </>
                    ) : <><p>Sem Repositório</p></>
                  }
                </div>
              </>
            ) : null
          }
        </div>
      </div>
    </div>
  )
}

export default App;
