import * as readline from "readline";

let input: string[] = [];

let output: string = "";

let scores: { [key: string]: number } = {};

const WINNING_SCORE = 3;
const TIE_SCORE = 1;
const LOSING_SCORE = 0;

const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.on('line', (line: string) => {
    input.push(line);
});

rl.on('close', () => {
    processInput(input);
});

function processInput(input: string[]) {
    input.forEach(line => {
        scoreGame(line);
    });

    const sortedScores = sortScores();

    formatOutput(sortedScores);

    console.log(output);
}

function sortScores() {
    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    return sortedScores;
}

function formatOutput(sortedScores: [string, number][]) {
    let pointWord: string;
    let rank: number = 1;
    let lastScore: number | null = null;
    let sameRankCount: number = 0;
    
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
}

function scoreGame(input: string) {
    const [team1Data, team2Data] = input.split(", ");

    const team1Parts = team1Data.split(/\s+(?=\d+$)/);
    const team2Parts = team2Data.split(/\s+(?=\d+$)/);

    const [team1Name, team1Score] = team1Parts;
    const [team2Name, team2Score] = team2Parts;

    const score1 = parseInt(team1Score);
    const score2 = parseInt(team2Score);

    if (score1 > score2) {
        scores[team1Name] = (scores[team1Name] || 0) + WINNING_SCORE;
        scores[team2Name] = (scores[team2Name] || 0) + LOSING_SCORE;
    } else if (score1 < score2) {
        scores[team1Name] = (scores[team1Name] || 0) + LOSING_SCORE;
        scores[team2Name] = (scores[team2Name] || 0) + WINNING_SCORE;
    } else {
        scores[team1Name] = (scores[team1Name] || 0) + TIE_SCORE;
        scores[team2Name] = (scores[team2Name] || 0) + TIE_SCORE;
    }
}

