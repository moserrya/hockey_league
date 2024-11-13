"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scoreGame = scoreGame;
exports.sortScores = sortScores;
exports.formatOutput = formatOutput;
exports.processInput = processInput;
function scoreGame(input, currentScores) {
    const [team1Data, team2Data] = input.split(", ");
    const team1Parts = team1Data.split(/\s+(?=\d+$)/);
    const team2Parts = team2Data.split(/\s+(?=\d+$)/);
    const [team1Name, team1Score] = team1Parts;
    const [team2Name, team2Score] = team2Parts;
    const score1 = parseInt(team1Score);
    const score2 = parseInt(team2Score);
    const updatedScores = Object.assign({}, currentScores);
    if (score1 > score2) {
        updatedScores[team1Name] = (updatedScores[team1Name] || 0) + 3;
        updatedScores[team2Name] = (updatedScores[team2Name] || 0) + 0;
    }
    else if (score1 < score2) {
        updatedScores[team1Name] = (updatedScores[team1Name] || 0) + 0;
        updatedScores[team2Name] = (updatedScores[team2Name] || 0) + 3;
    }
    else {
        updatedScores[team1Name] = (updatedScores[team1Name] || 0) + 1;
        updatedScores[team2Name] = (updatedScores[team2Name] || 0) + 1;
    }
    return updatedScores;
}
function sortScores(scores) {
    return Object.entries(scores).sort((a, b) => b[1] - a[1]);
}
function formatOutput(sortedScores) {
    let pointWord;
    let rank = 1;
    let lastScore = null;
    let sameRankCount = 0;
    let output = "";
    sortedScores.forEach(([teamName, teamScore]) => {
        pointWord = teamScore === 1 ? "pt" : "pts";
        if (lastScore !== null && teamScore < lastScore) {
            rank += sameRankCount + 1;
            sameRankCount = 0;
        }
        else if (lastScore === teamScore) {
            sameRankCount++;
        }
        output += `${rank}. ${teamName}: ${teamScore} ${pointWord}\n`;
        lastScore = teamScore;
    });
    return output.trim();
}
function processInput(input) {
    const finalScores = input.reduce((scores, line) => scoreGame(line, scores), {});
    const sortedScores = sortScores(finalScores);
    return formatOutput(sortedScores);
}
