
import { scoreGame, sortScores, rankAndFormatScores, processInput } from '../src/cli';

describe("scoreGame", () => {
    it("should add 3 points to the winner", () => {
        const updatedScores = scoreGame("Lions 3, Snakes 1", {});
        expect(updatedScores["Lions"]).toBe(3);
        expect(updatedScores["Snakes"]).toBe(0);
    });

    it("should add 1 point to each team in case of a tie", () => {
        const updatedScores = scoreGame("Lions 1, Snakes 1", {});
        expect(updatedScores["Lions"]).toBe(1);
        expect(updatedScores["Snakes"]).toBe(1);
    });

    it("should handle multiple games correctly", () => {
        let scores = scoreGame("Lions 3, Snakes 1", {});
        scores = scoreGame("Tarantulas 2, FC Awesome 3", scores);
        expect(scores["Lions"]).toBe(3);
        expect(scores["Snakes"]).toBe(0);
        expect(scores["Tarantulas"]).toBe(0);
        expect(scores["FC Awesome"]).toBe(3);
    });
});

describe("sortScores", () => {
    it("should sort the scores in descending order", () => {
        const scores = {
            "Lions": 5,
            "Snakes": 1,
            "Tarantulas": 6,
            "FC Awesome": 1
        };
        const sortedScores = sortScores(scores);
        expect(sortedScores).toEqual([
            ["Tarantulas", 6],
            ["Lions", 5],
            ["FC Awesome", 1],
            ["Snakes", 1]
        ]);
    });
});

describe("rankAndFormatScores", () => {
    it("should format the scores correctly", () => {
        const sortedScores: [string, number][] = [
            ["Tarantulas", 6],
            ["Lions", 5],
            ["FC Awesome", 1],
            ["Snakes", 1]
        ];
        const formattedOutput = rankAndFormatScores(sortedScores);
        expect(formattedOutput).toBe(
            "1. Tarantulas: 6 pts\n" +
            "2. Lions: 5 pts\n" +
            "3. FC Awesome: 1 pt\n" +
            "3. Snakes: 1 pt"
        );
    });

    it("should handle ties and rank jumps correctly", () => {
        const sortedScores: [string, number][] = [
            ["Lions", 5],
            ["Tarantulas", 5],
            ["Snakes", 3],
            ["FC Awesome", 1]
        ];
        const formattedOutput = rankAndFormatScores(sortedScores);
        expect(formattedOutput).toBe(
            "1. Lions: 5 pts\n" +
            "1. Tarantulas: 5 pts\n" +
            "3. Snakes: 3 pts\n" +
            "4. FC Awesome: 1 pt"
        );
    });
});

describe("processInput", () => {
    it("should process multiple games and produce the correct output", () => {
        const input = [
            "Lions 3, Snakes 3",
            "Tarantulas 1, FC Awesome 0",
            "Lions 1, FC Awesome 1",
            "Tarantulas 3, Snakes 1",
            "Lions 4, Grouches 0"
        ];
        const output = processInput(input);
        expect(output).toBe(
            "1. Tarantulas: 6 pts\n" +
            "2. Lions: 5 pts\n" +
            "3. FC Awesome: 1 pt\n" +
            "3. Snakes: 1 pt\n" +
            "5. Grouches: 0 pts"
        );
    });
});