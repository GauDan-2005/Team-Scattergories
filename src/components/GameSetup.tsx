import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import ParticipantList from "./ParticipantList";
import TeamDisplay from "./TeamDisplay";

interface TeamMember {
  name: string;
  isLeader: boolean;
}

interface Team {
  name: string;
  members: TeamMember[];
  score: number;
}

interface GameSetupProps {
  onTeamsGenerated?: (teams: Team[]) => void;
  onStartGame?: (teams: Team[]) => void;
  minTeamSize?: number;
  maxTeamSize?: number;
}

export const GameSetup: React.FC<GameSetupProps> = ({
  onTeamsGenerated = () => {},
  onStartGame = () => {},
  minTeamSize = 3,
  maxTeamSize = 4,
}) => {
  const [participants, setParticipants] = useState<string[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isTeamsGenerated, setIsTeamsGenerated] = useState(false);

  const handleAddParticipant = (name: string) => {
    setParticipants([...participants, name]);
  };

  const handleRemoveParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const generateTeams = () => {
    if (participants.length < minTeamSize) {
      return;
    }

    // Shuffle participants
    const shuffled = [...participants].sort(() => Math.random() - 0.5);

    // Calculate number of teams
    const numTeams = Math.ceil(shuffled.length / maxTeamSize);
    const minMembersPerTeam = Math.floor(shuffled.length / numTeams);

    let newTeams: Team[] = [];
    let currentIndex = 0;

    for (let i = 0; i < numTeams; i++) {
      const teamSize =
        i < shuffled.length % numTeams
          ? minMembersPerTeam + 1
          : minMembersPerTeam;
      const teamMembers = shuffled
        .slice(currentIndex, currentIndex + teamSize)
        .map((name, index) => ({
          name,
          isLeader: index === 0, // First member is the leader
        }));

      newTeams.push({
        name: `Team ${i + 1}`,
        members: teamMembers,
        score: 0,
        letterChangesLeft: 3,
      });

      currentIndex += teamSize;
    }

    setTeams(newTeams);
    setIsTeamsGenerated(true);
    onTeamsGenerated(newTeams);
  };

  const resetTeams = () => {
    setTeams([]);
    setIsTeamsGenerated(false);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto p-6 bg-white shadow-xl">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Tech Scattergories Setup</h1>
          <p className="text-gray-600">
            Add participants and generate balanced teams for the game
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-4">
            <ParticipantList
              participants={participants}
              onAddParticipant={handleAddParticipant}
              onRemoveParticipant={handleRemoveParticipant}
            />

            <div className="flex justify-center gap-4">
              <Button
                onClick={generateTeams}
                disabled={participants.length < minTeamSize || isTeamsGenerated}
                className="w-full max-w-xs"
              >
                Generate Teams
              </Button>
              {isTeamsGenerated && (
                <Button
                  onClick={resetTeams}
                  variant="outline"
                  className="w-full max-w-xs"
                >
                  Reset Teams
                </Button>
              )}
            </div>
          </div>

          {isTeamsGenerated && (
            <>
              <div className="lg:col-span-2">
                <TeamDisplay teams={teams} />
              </div>
              <div className="lg:col-span-2 flex justify-center">
                <Button
                  onClick={() => onStartGame(teams)}
                  size="lg"
                  className="w-full max-w-xs"
                >
                  Start Game
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default GameSetup;
