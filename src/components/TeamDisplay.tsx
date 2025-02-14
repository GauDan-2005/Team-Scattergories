import React from "react";
import { Card } from "./ui/card";
import { Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Crown } from "lucide-react";

interface TeamMember {
  name: string;
  isLeader: boolean;
}

interface Team {
  name: string;
  members: TeamMember[];
  score?: number;
}

interface TeamDisplayProps {
  teams?: Team[];
}

const defaultTeams: Team[] = [
  {
    name: "Team Alpha",
    members: [
      { name: "John Doe", isLeader: true },
      { name: "Jane Smith", isLeader: false },
      { name: "Bob Wilson", isLeader: false },
    ],
    score: 0,
  },
  {
    name: "Team Beta",
    members: [
      { name: "Alice Johnson", isLeader: true },
      { name: "Charlie Brown", isLeader: false },
      { name: "David Miller", isLeader: false },
    ],
    score: 0,
  },
];

const TeamDisplay = ({ teams = defaultTeams }: TeamDisplayProps) => {
  return (
    <div className="w-full p-6 bg-background">
      <h2 className="text-2xl font-bold mb-6 text-center">Teams</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team, index) => (
          <Card key={index} className="p-6 bg-card">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{team.name}</h3>
                {team.score !== undefined && (
                  <Badge variant="secondary">Score: {team.score}</Badge>
                )}
              </div>
              <div className="space-y-3">
                {team.members.map((member, memberIndex) => (
                  <div
                    key={memberIndex}
                    className="flex items-center space-x-3 p-2 rounded-lg bg-muted/50"
                  >
                    <Avatar className="h-8 w-8">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`}
                        alt={member.name}
                      />
                    </Avatar>
                    <span className="flex-1">{member.name}</span>
                    {member.isLeader && (
                      <Crown className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamDisplay;
