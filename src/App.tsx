import { useState } from 'react'
import './App.css'
import TeamSearch from './componets/team_search';

interface PredictionResult {
  message: string;
  probabilities: number[];
  prediction?: string;
}

async function fetchData(home_team: string, away_team: string) {
  try {
    const response = await fetch(`https://football-predictor-backend-6j8a.onrender.com/predict/${home_team}/${away_team}`);

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
      <div className="flex flex-row w-full justify-around  h-screen">
        <TeamSearch type='home' setSelectedTeam={sethomeTeam} />
        <div className='flex flex-col justify-start items-center w-full'>
          <h1>Football Matchup Predictor</h1>
          <label>home: {homeTeam}</label>
          <label>away: {awayTeam}</label>
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

        <TeamSearch type='away' setSelectedTeam={setawayTeam} />

      </div>
    </>
  )
}

export default App
