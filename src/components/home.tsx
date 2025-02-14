import React, { useState } from "react";
import { GameSetup } from "./GameSetup";
import GameInterface from "./GameInterface";

interface Team {
  name: string;
  members: { name: string; isLeader: boolean }[];
  score: number;
}

const Home = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [teams, setTeams] = useState<Team[]>([]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-slate-900">
              Tech Scattergories
            </h1>
            <p className="text-slate-600 max-w-2xl">
              A fun word game that combines technical knowledge with quick
              thinking. Form teams and compete to come up with unique answers!
            </p>
          </div>

          {!gameStarted ? (
            <GameSetup
              minTeamSize={3}
              maxTeamSize={4}
              onTeamsGenerated={(newTeams) => {
                setTeams(newTeams);
              }}
              onStartGame={(teams) => {
                setGameStarted(true);
              }}
            />
          ) : (
            <GameInterface teams={teams} onUpdateScores={setTeams} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
