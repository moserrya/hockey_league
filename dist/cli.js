"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scoreGame = scoreGame;
exports.sortScores = sortScores;
exports.rankAndFormatScores = rankAndFormatScores;
exports.processInput = processInput;
function parseInput(input) {
    const [team1Data, team2Data] = input.split(", ");
    const team1Parts = team1Data.split(/\s+(?=\d+$)/);
    const team2Parts = team2Data.split(/\s+(?=\d+$)/);
    const [team1Name, team1Score] = team1Parts;
    const [team2Name, team2Score] = team2Parts;
    return [team1Name, parseInt(team1Score), team2Name, parseInt(team2Score)];
}
function determineResult(score1, score2) {
    if (score1 > score2)
        return 'win';
    if (score1 < score2)
        return 'loss';
    return 'draw';
}
function updateScores(team1Name, team2Name, result, currentScores) {
    const POINTS = { win: 3, loss: 0, draw: 1 };
    const updatedScores = Object.assign({}, currentScores);
    if (result === 'win') {
        updatedScores[team1Name] = (updatedScores[team1Name] || 0) + POINTS.win;
        updatedScores[team2Name] = (updatedScores[team2Name] || 0) + POINTS.loss;
    }
    else if (result === 'loss') {
        updatedScores[team1Name] = (updatedScores[team1Name] || 0) + POINTS.loss;
        updatedScores[team2Name] = (updatedScores[team2Name] || 0) + POINTS.win;
    }
    else {
        updatedScores[team1Name] = (updatedScores[team1Name] || 0) + POINTS.draw;
        updatedScores[team2Name] = (updatedScores[team2Name] || 0) + POINTS.draw;
    }
    return updatedScores;
}
function scoreGame(input, currentScores) {
    const [team1Name, score1, team2Name, score2] = parseInput(input);
    const result = determineResult(score1, score2);
    return updateScores(team1Name, team2Name, result, currentScores);
}
function sortScores(scores) {
    return Object.entries(scores).sort((a, b) => b[1] - a[1]);
}
function rankAndFormatScores(sortedScores) {
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
    return rankAndFormatScores(sortedScores);
}
