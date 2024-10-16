export interface team {
  name: string;
  image: string;
  competition: string;
  players: player[];
}

export type player = {
  name: string;
  image: string;
  isTeamLeader: boolean;
};
