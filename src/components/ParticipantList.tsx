import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { X } from "lucide-react";

interface ParticipantListProps {
  participants?: string[];
  onAddParticipant?: (name: string) => void;
  onRemoveParticipant?: (index: number) => void;
}

const ParticipantList: React.FC<ParticipantListProps> = ({
  participants = ["Alice", "Bob", "Charlie"], // Default participants
  onAddParticipant = () => {},
  onRemoveParticipant = () => {},
}) => {
  const [newParticipant, setNewParticipant] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newParticipant.trim()) {
      onAddParticipant(newParticipant.trim());
      setNewParticipant("");
    }
  };

  return (
    <Card className="w-full max-w-md p-6 bg-white shadow-lg">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Participants</h2>
          <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <Input
              type="text"
              value={newParticipant}
              onChange={(e) => setNewParticipant(e.target.value)}
              placeholder="Enter participant name"
              className="flex-1"
            />
            <Button type="submit" variant="default">
              Add
            </Button>
          </form>
        </div>

        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          <div className="space-y-2">
            {participants.map((participant, index) => (
              <div
                key={`${participant}-${index}`}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-slate-100"
              >
                <span className="font-medium">{participant}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveParticipant(index)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="text-sm text-gray-500">
          {participants.length} participant
          {participants.length !== 1 ? "s" : ""} added
        </div>
      </div>
    </Card>
  );
};

export default ParticipantList;
