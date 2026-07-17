import type { Member, GroupData } from '../types';

const otfMembers: Member[] = [
  { name: 'Biel', role: 'Main Vocal, Lead-rapper, Sub-dancer', birthday: '30 de Dezembro', height: '176 cm', nationality: 'Korean', image: '/Biel.jpeg', stats: { Vocal: 96, Dance: 68, Rap: 82, Visual: 84 } },
  { name: 'Cauy', role: 'Main Vocal, Sub-rapper, Sub-dancer', birthday: '11 de Setembro', height: '174 cm', nationality: 'Korean', image: '/Cauy.jpeg', stats: { Vocal: 99, Dance: 65, Rap: 55, Visual: 85 } },
  { name: 'Guhan', role: 'Sub-vocal, Visual, Sub-rapper', birthday: '18 de Janeiro', height: '180 cm', nationality: 'Korean', image: '/Guhan.jpeg', stats: { Vocal: 68, Dance: 70, Rap: 62, Visual: 94 } },
  { name: 'Iggy', role: 'Leader, Main Rapper, Vocalista, Sub-dancer', birthday: '20 de Fevereiro', height: '172 cm', nationality: 'Korean', image: '/Iggy.jpeg', stats: { Vocal: 78, Dance: 65, Rap: 97, Visual: 88 } },
  { name: 'Leb', role: 'Main Dancer, Visual, Vocalista, Sub-rapper', birthday: '05 de Março', height: '178 cm', nationality: 'Korean', image: '/Leb.jpeg', stats: { Vocal: 75, Dance: 98, Rap: 60, Visual: 95 } },
  { name: 'Luna', role: 'Lead-vocal, Lead-rapper, Lead-dancer', birthday: '14 de Maio', height: '165 cm', nationality: 'Korean', image: '/Luna.jpeg', stats: { Vocal: 88, Dance: 88, Rap: 85, Visual: 80 } },
  { name: 'Lune', role: 'Face, Center, Visual, Lead-dancer, Sub-vocal, Maknae', birthday: '22 de Julho', height: '167 cm', nationality: 'Korean', image: '/Lune.jpeg', stats: { Vocal: 70, Dance: 89, Rap: 40, Visual: 97 } }
];

export const database: { [key: string]: GroupData } = {
  otf: {
    name: 'ONE&',
    description: 'ONE& (Antes: One & Four e One & Five). Um grupo de alta performance focado em conceitos futuristas e narrativas profundas.',
    members: otfMembers,
    units: [
      {
        id: 'overlap',
        name: 'ONE& overl4p',
        description: 'Sub-unit focada em quebras de ritmo e misturas conceituais complexas.',
        members: [otfMembers[0], otfMembers[2], otfMembers[5]]
      },
      {
        id: 'lethal',
        name: 'ONE& LETHAL VIP&RS',
        description: 'Sub-unit com o conceito mais maduro, agressivo e impactante do grupo.',
        members: [otfMembers[1], otfMembers[4], otfMembers[6]]
      },
      {
        id: 'cabigy',
        name: 'CABIGY',
        description: 'Formada por Cauy, Biel e Iggy. Antiga sub-unit conhecida como ONE& RAINBOW DASH.',
        members: [otfMembers[3], otfMembers[4], otfMembers[6]]
      },
      {
        id: 'solos',
        name: 'Soloists',
        description: 'Solistas oficializados da OTF que possuem lançamentos e promoções individuais ativas.',
        members: [otfMembers[3], otfMembers[4], otfMembers[1], otfMembers[6]]
      }
    ]
  }
};