export function scoreGame(input: string, currentScores: { [key: string]: number }): { [key: string]: number } {
    const [team1Data, team2Data] = input.split(", ");

    const team1Parts = team1Data.split(/\s+(?=\d+$)/);
    const team2Parts = team2Data.split(/\s+(?=\d+$)/);

    const [team1Name, team1Score] = team1Parts;
    const [team2Name, team2Score] = team2Parts;

    const score1 = parseInt(team1Score);
    const score2 = parseInt(team2Score);

    const updatedScores = { ...currentScores };

    if (score1 > score2) {
        updatedScores[team1Name] = (updatedScores[team1Name] || 0) + 3;
        updatedScores[team2Name] = (updatedScores[team2Name] || 0) + 0;
    } else if (score1 < score2) {
        updatedScores[team1Name] = (updatedScores[team1Name] || 0) + 0;
        updatedScores[team2Name] = (updatedScores[team2Name] || 0) + 3;
    } else {
        updatedScores[team1Name] = (updatedScores[team1Name] || 0) + 1;
        updatedScores[team2Name] = (updatedScores[team2Name] || 0) + 1;
    }

    return updatedScores;
}

export function sortScores(scores: { [key: string]: number }): [string, number][] {
    return Object.entries(scores).sort((a, b) => b[1] - a[1]);
}

export function formatOutput(sortedScores: [string, number][]): string {
    let pointWord: string;
    let rank: number = 1;
    let lastScore: number | null = null;
    let sameRankCount: number = 0;
    let output = "";

    sortedScores.forEach(([teamName, teamScore]) => {
        pointWord = teamScore === 1 ? "pt" : "pts";
        if (lastScore !== null && teamScore < lastScore) {
            rank += sameRankCount + 1;
            sameRankCount = 0;
        } else if (lastScore === teamScore) {
            sameRankCount++;
        }
        output += `${rank}. ${teamName}: ${teamScore} ${pointWord}\n`;
        lastScore = teamScore;
    });

    return output.trim();
}

export function processInput(input: string[]): string {
    const finalScores = input.reduce((scores, line) => scoreGame(line, scores), {});
    const sortedScores = sortScores(finalScores);
    return formatOutput(sortedScores);
}