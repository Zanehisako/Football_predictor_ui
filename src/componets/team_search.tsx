import { useState } from "react"
import Fuse from "fuse.js"
interface searchResult {
    item: string,
    refIndex: number,
    score: number
}
interface TeamSearchProps {
    type?: string,
    teams: string[]
    setSelectedTeam: (team: string) => void
}
export default function TeamSearch(props: TeamSearchProps) {
    const [team, setTeam] = useState<string>("")
    const [results, setResults] = useState<searchResult[]>([])
    const options = {
        includeScore: true
    }

    const fuse = new Fuse(props.teams, options)

    return (
        <div>
            <h2>{props.type} team:</h2>
            <input
                type="text"
                value={team}
                onChange={(e) => {
                    setTeam(e.target.value)
                    const results = fuse.search(e.target.value) as searchResult[]
                    // console.log(results)
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
                                props.setSelectedTeam(result.item)
                                setTeam(result.item)
                                setResults([])
                            }}>
                                {result.item}
                            </li>
                        ))
                    }
                </ul>
            }
            <div>
                Selected Team: {team}
            </div>
        </div>
    )
}