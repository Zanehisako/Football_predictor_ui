import { useState } from 'react'
import './App.css'

function App() {
  const [homeTeam, sethomeTeam] = useState("")
  const [awayTeam, setawayTeam] = useState("")

  return (
    <>
      <div className="App">
        <h1>Soccer Matchup</h1>
        <div>
          <label>
            Home Team:
            <input
              type="text"
              value={homeTeam}
              onChange={(e) => sethomeTeam(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Away Team:
            <input
              type="text"
              value={awayTeam}
              onChange={(e) => setawayTeam(e.target.value)}
            />
          </label>
        </div>
        <h2>Matchup: {homeTeam} vs {awayTeam}</h2>
      </div>
    </>
  )
}

export default App
