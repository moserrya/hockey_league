export function scoreGame(input: string, currentScores: { [key: string]: number }): { [key: string]: number } {
    const [team1Data, team2Data]: string[] = input.split(", ");

    const team1Parts: string[] = team1Data.split(/\s+(?=\d+$)/);
    const team2Parts: string[] = team2Data.split(/\s+(?=\d+$)/);

    const [team1Name, team1Score]: string[] = team1Parts;
    const [team2Name, team2Score]: string[] = team2Parts;

    const score1: number = parseInt(team1Score);
    const score2: number = parseInt(team2Score);

    const updatedScores: { [key: string]: number }  = { ...currentScores };

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

export function rankAndFormatScores(sortedScores: [string, number][]): string {
    let pointWord: string;
    let rank: number = 1;
    let lastScore: number | null = null;
    let sameRankCount: number = 0;
    let output: string = "";

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
    return rankAndFormatScores(sortedScores);
}