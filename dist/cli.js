"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
let input = [];
let output = "";
let scores = {};
const WINNING_SCORE = 3;
const TIE_SCORE = 1;
const LOSING_SCORE = 0;
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});
rl.on('line', (line) => {
    input.push(line);
});
rl.on('close', () => {
    processInput(input);
});
function processInput(input) {
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
function formatOutput(sortedScores) {
    let pointWord;
    let rank = 1;
    let lastScore = null;
    let sameRankCount = 0;
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
    output = output.trim();
}
function scoreGame(input) {
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
    }
    else if (score1 < score2) {
        scores[team1Name] = (scores[team1Name] || 0) + LOSING_SCORE;
        scores[team2Name] = (scores[team2Name] || 0) + WINNING_SCORE;
    }
    else {
        scores[team1Name] = (scores[team1Name] || 0) + TIE_SCORE;
        scores[team2Name] = (scores[team2Name] || 0) + TIE_SCORE;
    }
}
