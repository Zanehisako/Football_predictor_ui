import { useState } from "react"
interface TeamSearchProps {
    type?: string,
}
export default function TeamSearch(props: TeamSearchProps) {
    const [team, setTeam] = useState<string>("")
    return (
        <div>
            <h2>{props.type} team:</h2>
            <input
                type="text"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                placeholder={`search for a ${props.type} team ....`}
            />
        </div>
    )
}