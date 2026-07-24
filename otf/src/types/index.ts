export interface Member {
  name: string;
  role: string;
  birthday: string;
  height: string;
  sign: string;
  nationality: string;
  image: string;
  stats: { [key: string]: number };
}

export interface Unit {
  id: string;
  name: string;
  description: string;
  members: Member[];
}

export interface GroupData {
  name: string;
  description: string;
  image: string;
  debutDate: string;
  debutSong: string;
  members: Member[];
  exMembers?: Member[];
  units?: Unit[];
}
