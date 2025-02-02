import { House, Puzzle, Trophy, Users } from "lucide-react";

export const APP_CONFIG = {
  secretPassCookie: "secret_pass",
  name: "NoteBot Analytics",
  logoIcon: "/icon.png",
  colorPrimary: "#377fcc",
  colorSecondary: "#000000",
  appLink: "https://play.google.com/store/apps/details?id=com.hawkers.notebot",
  botLink: "https://www.messenger.com/t/103148557940299",
  submitLink: "https://forms.gle/RjPXedjRDim4YE6P8",
  founder: {
    name: "Afshin Nahian Tripto",
    github: "https://github.com/TriptoAfsin",
    web: "https://www.triptex.me/",
  },
  secretPass: import.meta.env.VITE_SECRET_PASS,
};

export const APP_HEADER_MENU = [
  {
    id: 0,
    icon: <House size={20} strokeWidth={1.5} />,
    label: "Home",
    href: "/",
  },
  {
    id: 122,
    icon: <Users size={20} strokeWidth={1.5} />,
    label: "Users",
    href: "/users",
  },
  {
    id: 2121,
    icon: <Puzzle size={20} strokeWidth={1.5} />,
    label: "Missed Words",
    href: "/missed-words",
  },
  {
    id: 12323,
    icon: <Trophy size={20} strokeWidth={1.5} />,
    label: "Game Score",
    href: "/game-score",
  },
  // {
  //   id: 21212,
  //   icon: <Bug size={20} strokeWidth={1.5} />,
  //   label: "Error Logs",
  //   href: "/error-logs",
  // },
];
