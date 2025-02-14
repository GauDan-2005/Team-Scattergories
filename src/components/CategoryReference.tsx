import React from "react";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

const CATEGORY_ANSWERS: Record<string, string[]> = {
  // Tech Categories
  "Programming Languages": [
    "Python",
    "Perl",
    "PHP",
    "Pascal",
    "Prolog",
    "PowerShell",
  ],
  "Tech Companies": [
    "PayPal",
    "Pinterest",
    "Palantir",
    "Palo Alto Networks",
    "Pandora",
  ],
  "Computer Parts": [
    "Processor",
    "Power Supply",
    "Port",
    "PCIe Card",
    "Peripheral",
  ],
  "Developer Tools": [
    "Postman",
    "PyCharm",
    "Prettier",
    "Prisma",
    "PM2",
    "Puppet",
  ],
  "Tech Buzzwords": [
    "Paradigm Shift",
    "Proof of Concept",
    "Progressive Web App",
    "Predictive Analytics",
  ],
  "Tech Websites": ["ProductHunt", "Patreon", "PCMag", "PCWorld", "PyPI"],
  "Tech YouTubers": [
    "Programming with Mosh",
    "Primeagen",
    "Philip DeFranco",
    "PowerfulJRE",
  ],
  "Programming Terms": [
    "Parameter",
    "Promise",
    "Polymorphism",
    "Prototype",
    "Pointer",
  ],
  "Tech Conferences": [
    "PyCon",
    "PostgresConf",
    "PHP[tek]",
    "PowerShell Summit",
  ],
  "Tech Podcasts": [
    "Planet Money",
    "Pod Save America",
    "Python Bytes",
    "Pursuit Podcast",
  ],
  "Browser Extensions": [
    "Privacy Badger",
    "Pinterest Save Button",
    "Password Manager",
    "Page Ruler",
  ],
  "Linux Commands": ["pwd", "ping", "ps", "passwd", "printenv", "pkill"],

  // Fun Categories
  "Video Game Characters": [
    "Pac-Man",
    "Princess Peach",
    "Pikachu",
    "Portal's GLaDOS",
  ],
  "Internet Slang": ["POG", "POGGERS", "PepeHands", "Pog Champ", "Pain"],
  "Emoji Meanings": [
    "🎭 Performance",
    "🍐 Pear",
    "🐼 Panda",
    "🎨 Palette",
    "🏓 Ping Pong",
  ],
  "Streaming Shows": [
    "Peaky Blinders",
    "Prison Break",
    "Power",
    "Picard",
    "Preacher",
  ],
  "Meme Templates": [
    "Pointing Spider-Man",
    "Philosoraptor",
    "Pepe the Frog",
    "POV Memes",
  ],
  "Reddit Subreddits": [
    "r/programming",
    "r/ProgrammerHumor",
    "r/Python",
    "r/PCMasterRace",
  ],
  "Discord Emotes": ["PepeHands", "PogChamp", "Pepega", "PepeL", "Prayge"],
  "Gaming Consoles": [
    "PlayStation",
    "PSP",
    "PS Vita",
    "PS2",
    "PS3",
    "PS4",
    "PS5",
  ],
  "Keyboard Shortcuts": [
    "Paste (Ctrl+P)",
    "Print (Ctrl+P)",
    "Page Up",
    "Page Down",
  ],
  "Tech Movie Characters": [
    "Peter Parker",
    "Professor X",
    "Parzival (Ready Player One)",
  ],
  "Fictional AI Names": [
    "Project 2501",
    "PAL 9000",
    "Proxy",
    "Program",
    "Prime Intellect",
  ],
  "Tech Easter Eggs": [
    "Penny Lane Easter Egg",
    "Pirate Mode",
    "Pac-Man Google Maps",
    "Portal References",
  ],
};

interface CategoryReferenceProps {
  letter?: string;
}

const CategoryReference: React.FC<CategoryReferenceProps> = ({
  letter = "P",
}) => {
  return (
    <Card className="w-full p-4">
      <h3 className="text-lg font-semibold mb-4">
        Category Reference Guide (Letter: {letter})
      </h3>
      <ScrollArea className="h-[600px]">
        <div className="space-y-4">
          {Object.entries(CATEGORY_ANSWERS).map(([category, answers]) => (
            <div key={category} className="space-y-2">
              <h4 className="font-medium">{category}</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground pl-4">
                {answers.map((answer, i) => (
                  <li key={i}>{answer}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default CategoryReference;
