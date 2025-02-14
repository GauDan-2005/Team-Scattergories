import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "./ui/alert-dialog";
import { Timer, Check, X, RefreshCw } from "lucide-react";

interface Team {
  name: string;
  members: { name: string; isLeader: boolean }[];
  score: number;
  roundScores?: number[];
  letterChangesLeft: number;
}

const DEFAULT_ROUND_TIME = 120; // seconds
const CATEGORIES = [
  // Tech Categories (50%)
  "Programming Languages",
  "Tech Companies",
  "Computer Parts",
  "Developer Tools",
  "Tech Buzzwords",
  "Tech Websites",
  "Tech YouTubers",
  "Programming Terms",
  "Tech Conferences",
  "Tech Podcasts",
  "Browser Extensions",
  "Linux Commands",
  // Fun Categories (50%)
  "Video Game Characters",
  "Internet Slang",
  "Emoji Meanings",
  "Streaming Shows",
  "Meme Templates",
  "Reddit Subreddits",
  "Discord Emotes",
  "Gaming Consoles",
  "Keyboard Shortcuts",
  "Tech Movie Characters",
  "Fictional AI Names",
  "Tech Easter Eggs",
];

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface GameInterfaceProps {
  teams: Team[];
  onUpdateScores?: (teams: Team[]) => void;
}

const GameInterface: React.FC<GameInterfaceProps> = ({
  teams = [
    {
      name: "Team 1",
      members: [{ name: "Player 1", isLeader: true }],
      score: 0,
      letterChangesLeft: 3,
    },
  ],
  onUpdateScores = () => {},
}) => {
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [roundTime, setRoundTime] = useState(DEFAULT_ROUND_TIME);
  const [timeLeft, setTimeLeft] = useState(roundTime);
  const [isRoundActive, setIsRoundActive] = useState(false);
  const [currentLetter, setCurrentLetter] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [draftAnswers, setDraftAnswers] = useState<Record<string, string>>({});
  const [roundAnswers, setRoundAnswers] = useState<Record<string, string>>({});
  const [isPaused, setIsPaused] = useState(false);
  const [showTimeUpAlert, setShowTimeUpAlert] = useState(false);

  const resetGame = () => {
    setCurrentTeamIndex(0);
    setTimeLeft(roundTime);
    setIsRoundActive(false);
    setCurrentLetter("");
    setSelectedCategories([]);
    setDraftAnswers({});
    setRoundAnswers({});
    setIsPaused(false);

    // Reset all team scores
    const resetTeams = teams.map((team) => ({
      ...team,
      score: 0,
      roundScores: [],
    }));
    onUpdateScores(resetTeams);
  };

  const startRound = () => {
    // Pick a random letter
    const randomLetter = LETTERS[Math.floor(Math.random() * LETTERS.length)];
    setCurrentLetter(randomLetter);

    // Select 12 random categories
    const shuffledCategories = [...CATEGORIES].sort(() => Math.random() - 0.5);
    setSelectedCategories(shuffledCategories.slice(0, 12));

    setTimeLeft(roundTime);
    setIsRoundActive(true);
    setDraftAnswers({});
    setRoundAnswers({});
    setIsPaused(false);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const submitAnswer = (category: string) => {
    const draft = draftAnswers[category];
    if (draft?.trim()) {
      setRoundAnswers({
        ...roundAnswers,
        [category]: draft.trim(),
      });
      setDraftAnswers({
        ...draftAnswers,
        [category]: "",
      });
    }
  };

  const removeAnswer = (category: string) => {
    const newAnswers = { ...roundAnswers };
    delete newAnswers[category];
    setRoundAnswers(newAnswers);
  };

  const endRound = () => {
    // Calculate round score
    const roundScore = Object.keys(roundAnswers).length;

    // Update team scores
    const updatedTeams = [...teams];
    const currentTeam = updatedTeams[currentTeamIndex];

    // Add round score to roundScores array
    currentTeam.roundScores = [...(currentTeam.roundScores || []), roundScore];
    currentTeam.score += roundScore;

    onUpdateScores(updatedTeams);

    // Move to next team
    setCurrentTeamIndex((currentTeamIndex + 1) % teams.length);

    // Reset for next team
    setTimeLeft(roundTime);
    setIsRoundActive(false);
    setCurrentLetter("");
    setDraftAnswers({});
    setRoundAnswers({});
    setIsPaused(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRoundActive && timeLeft > 0 && !isPaused) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRoundActive) {
      setShowTimeUpAlert(true);
      setIsRoundActive(false);
    }
    return () => clearInterval(timer);
  }, [isRoundActive, timeLeft, isPaused]);

  const currentTeam = teams[currentTeamIndex];

  return (
    <div className="space-y-6">
      <AlertDialog open={showTimeUpAlert} onOpenChange={setShowTimeUpAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Time's Up!</AlertDialogTitle>
            <AlertDialogDescription>
              {currentTeam.name}'s turn is over. They got{" "}
              {Object.keys(roundAnswers).length} answers!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setShowTimeUpAlert(false);
                endRound();
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* Teams Overview */}
      <Card className="w-full p-4 bg-white shadow-lg">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Teams Overview</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.map((team, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${currentTeamIndex === index ? "bg-primary/10" : "bg-secondary/10"}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{team.name}</h3>
                  <Badge
                    variant={currentTeamIndex === index ? "default" : "outline"}
                  >
                    Total: {team.score}
                  </Badge>
                </div>
                <div className="text-sm space-y-1">
                  {team.roundScores?.map((score, roundIndex) => (
                    <div
                      key={roundIndex}
                      className="flex justify-between items-center"
                    >
                      <span>Round {roundIndex + 1}:</span>
                      <span>{score} points</span>
                    </div>
                  )) || "No rounds played"}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Current Team:</span>
            <div className="flex gap-2">
              {currentTeam.members.map((member, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {member.name} {member.isLeader && "👑"}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Main Game Interface */}
      <Card className="w-full max-w-6xl mx-auto p-6 bg-white shadow-xl">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Panel */}
          <div className="col-span-3 space-y-6 border-r pr-6">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Letter</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (currentTeam.letterChangesLeft > 0) {
                      const newLetter =
                        LETTERS[Math.floor(Math.random() * LETTERS.length)];
                      setCurrentLetter(newLetter);

                      // Update the team's letter changes left
                      const updatedTeams = [...teams];
                      updatedTeams[currentTeamIndex].letterChangesLeft--;
                      onUpdateScores(updatedTeams);
                    }
                  }}
                  disabled={!currentTeam.letterChangesLeft}
                >
                  Change ({currentTeam.letterChangesLeft})
                </Button>
              </div>
              <h2 className="text-4xl font-bold">{currentLetter || "?"}</h2>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Time</span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newTime = Math.max(0, roundTime - 10);
                      setRoundTime(newTime);
                      setTimeLeft(newTime);
                    }}
                    disabled={isRoundActive}
                  >
                    -
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newTime = roundTime + 10;
                      setRoundTime(newTime);
                      setTimeLeft(newTime);
                    }}
                    disabled={isRoundActive}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="text-4xl font-mono text-center">{timeLeft}</div>
              <Button
                variant="outline"
                className="w-full"
                onClick={togglePause}
              >
                {isPaused ? "Resume" : "Pause"}
              </Button>
            </div>
          </div>

          {/* Center Panel - Categories */}
          <div className="col-span-7 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Categories</h3>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" disabled>
                  Add A Category
                </Button>
                <span className="text-sm text-gray-500">12</span>
              </div>
            </div>

            <div className="space-y-2">
              {selectedCategories.map((category, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="w-6 text-sm text-gray-500">{index + 1}</span>
                  <div className="flex-1 flex items-center justify-between p-2 rounded hover:bg-slate-50">
                    <span>{category}</span>
                    {roundAnswers[category] ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          {roundAnswers[category]}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAnswer(category)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Input
                          value={draftAnswers[category] || ""}
                          onChange={(e) =>
                            setDraftAnswers({
                              ...draftAnswers,
                              [category]: e.target.value,
                            })
                          }
                          placeholder={`Enter ${currentLetter} word...`}
                          className="w-48"
                          onKeyPress={(e) =>
                            e.key === "Enter" && submitAnswer(category)
                          }
                        />
                        <Button onClick={() => submitAnswer(category)}>
                          <Check className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel */}
          <div className="col-span-2 space-y-6 border-l pl-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">
                {currentTeam.name}'s Turn
              </h2>
              <p className="text-sm text-gray-600">
                Score: {currentTeam.score}
              </p>
            </div>

            {!isRoundActive ? (
              <Button onClick={startRound} className="w-full">
                Start Round
              </Button>
            ) : (
              <Button onClick={endRound} variant="outline" className="w-full">
                End Round
              </Button>
            )}

            <Button variant="ghost" className="w-full" onClick={resetGame}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Restart
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GameInterface;
