import { useState } from "react"
import Fuse from "fuse.js"
interface searchResult {
    item: string,
    refIndex: number,
    score: number
}
interface TeamSearchProps {
    type?: string,
}
export default function TeamSearch(props: TeamSearchProps) {
    const [team, setTeam] = useState<string>("")
    const [selectedTeam, setSelectedTeam] = useState<string>("")
    const [results, setResults] = useState<searchResult[]>([])
    const options = {
        includeScore: true
    }

    const list = [
        "Arsenal",
        "Aston Villa",
        "Bournemouth",
        "Brentford",
        "Brighton",
        "Chelsea",
        "Crystal Palace",
        "Everton",
        "Fulham",
        "Leeds United",]
    const fuse = new Fuse(list, options)

    return (
        <div>
            <h2>{props.type} team:</h2>
            <input
                type="text"
                value={team}
                onChange={(e) => {
                    setTeam(e.target.value)
                    const results = fuse.search(e.target.value) as searchResult[]
                    console.log(results)
                    setResults(results)
                }
                }
                placeholder={`search for a ${props.type} team ....`}
            />
            {
                results.length > 0 && <ul>
                    {
                        results.map((result, index) => (
                            <li key={index} onClick={() => {
                                setSelectedTeam(result.item)
                                setResults([])
                            }}>
                                {result.item}
                            </li>
                        ))
                    }
                </ul>
            }
            <div>
                Selected Team: {selectedTeam}
            </div>
        </div>
    )
}