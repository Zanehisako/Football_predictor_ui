import { useState } from 'react'
import './App.css'

interface PredictionResult {
  message: string;
  probabilities: number[];
  prediction?: string;
}

async function fetchData(home_team: string, away_team: string) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/predict/${home_team}/${away_team}?Odds_1=2.00&Odds_X=3.00&Odds_2=2.00`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // or .text(), .blob()
    console.log(data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }

}

function App() {
  const [homeTeam, sethomeTeam] = useState("")
  const [awayTeam, setawayTeam] = useState("")
  const [result, setRestult] = useState<PredictionResult | null>(null)

  return (
    <>
      <div className="App">
        <h1>Football Matchup Predictor</h1>
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
        <button onClick={async () => {
          const result = await fetchData(homeTeam, awayTeam)
          setRestult(result)
        }}>Submit</button>
        {
          result && <div>
            <div id="result">
              <h2>
                {result?.message}
              </h2>
              <div>
                Home win Proba: {result?.probabilities[2]}
              </div>
              <div>
                Draw Proba: {result?.probabilities[1]}
              </div>
              <div>
                Away win Proba: {result?.probabilities[0]}
              </div>
            </div>
            <h1>
              Result: {result?.prediction}
            </h1>
          </div>
        }
      </div>
    </>
  )
}

export default App
