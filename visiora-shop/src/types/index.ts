export interface Member {
  name: string;
  role: string;
  birthday: string;
  height: string;
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
  members: Member[];
  units?: Unit[];
}