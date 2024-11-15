function parseInput(input: string): [string, number, string, number] {
    const [team1Data, team2Data]: string[] = input.split(", ");
    const team1Parts: string[] = team1Data.split(/\s+(?=\d+$)/);
    const team2Parts: string[] = team2Data.split(/\s+(?=\d+$)/);
    const [team1Name, team1Score]: string[] = team1Parts;
    const [team2Name, team2Score]: string[] = team2Parts;
    return [team1Name, parseInt(team1Score), team2Name, parseInt(team2Score)];
}

function determineResult(score1: number, score2: number): 'win' | 'loss' | 'draw' {
    if (score1 > score2) return 'win';
    if (score1 < score2) return 'loss';
    return 'draw';
}

function updateScores(
    team1Name: string,
    team2Name: string,
    result: 'win' | 'loss' | 'draw',
    currentScores: { [key: string]: number }
): { [key: string]: number } {
    const POINTS = { win: 3, loss: 0, draw: 1 };
    const updatedScores: { [key: string]: number } = { ...currentScores };

    if (result === 'win') {
        updatedScores[team1Name] = (updatedScores[team1Name] || 0) + POINTS.win;
        updatedScores[team2Name] = (updatedScores[team2Name] || 0) + POINTS.loss;
    } else if (result === 'loss') {
        updatedScores[team1Name] = (updatedScores[team1Name] || 0) + POINTS.loss;
        updatedScores[team2Name] = (updatedScores[team2Name] || 0) + POINTS.win;
    } else {
        updatedScores[team1Name] = (updatedScores[team1Name] || 0) + POINTS.draw;
        updatedScores[team2Name] = (updatedScores[team2Name] || 0) + POINTS.draw;
    }

    return updatedScores;
}

export function scoreGame(input: string, currentScores: { [key: string]: number }): { [key: string]: number } {
    const [team1Name, score1, team2Name, score2] = parseInput(input);
    const result = determineResult(score1, score2);
    return updateScores(team1Name, team2Name, result, currentScores);
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