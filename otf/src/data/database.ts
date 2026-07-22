import type { Member, GroupData } from '../types';

const oneAndMembers: Member[] = [
  { name: 'Biel', role: 'Main Vocal, Lead-rapper, Sub-dancer', birthday: '30 de Dezembro', height: '176 cm', nationality: 'Korean', image: '/Biel.jpeg', stats: { Vocal: 96, Dance: 68, Rap: 82, Visual: 84 } },
  { name: 'Cauy', role: 'Main Vocal, Sub-rapper, Sub-dancer', birthday: '11 de Setembro', height: '174 cm', nationality: 'Korean', image: '/Cauy.jpeg', stats: { Vocal: 99, Dance: 65, Rap: 55, Visual: 85 } },
  { name: 'Guhan', role: 'Sub-vocal, Visual, Sub-rapper', birthday: '18 de Janeiro', height: '180 cm', nationality: 'Korean', image: '/Guhan.jpeg', stats: { Vocal: 68, Dance: 70, Rap: 62, Visual: 94 } },
  { name: 'Iggy', role: 'Leader, Main Rapper, Vocalista, Sub-dancer', birthday: '20 de Fevereiro', height: '172 cm', nationality: 'Korean', image: '/Iggy.jpeg', stats: { Vocal: 78, Dance: 65, Rap: 97, Visual: 88 } },
  { name: 'Leb', role: 'Main Dancer, Visual, Vocalista, Sub-rapper', birthday: '05 de Março', height: '178 cm', nationality: 'Korean', image: '/Leb.jpeg', stats: { Vocal: 75, Dance: 98, Rap: 60, Visual: 95 } },
  { name: 'Luna', role: 'Lead-vocal, Lead-rapper, Lead-dancer', birthday: '14 de Maio', height: '165 cm', nationality: 'Korean', image: '/Luna.jpeg', stats: { Vocal: 88, Dance: 88, Rap: 85, Visual: 80 } },
  { name: 'Lune', role: 'Face, Center, Visual, Lead-dancer, Sub-vocal, Maknae', birthday: '22 de Julho', height: '167 cm', nationality: 'Korean', image: '/Lune.jpeg', stats: { Vocal: 70, Dance: 89, Rap: 40, Visual: 97 } }
];

const lothusMembers: Member[] = [
  { name: 'Andy', role: 'Main Vocal, Leader', birthday: '07 de Dezembro de 2004', height: '182 cm', nationality: 'Brazilian', image: '/Andy.jpeg', stats: { Vocal: 97, Dance: 75, Rap: 60, Visual: 88 } },
  { name: 'Myke', role: 'Main Rapper, Lead Vocal, Visual, Center', birthday: '16 de Janeiro de 2003', height: '182 cm', nationality: 'Brazilian', image: '/Myke2.jpg', stats: { Vocal: 85, Dance: 80, Rap: 98, Visual: 95 } },
  { name: 'Dhi', role: 'Lead Vocal, Lead Dancer, Face', birthday: '22 de Abril de 2003', height: '182 cm', nationality: 'Brazilian', image: '/Dhi.jpeg', stats: { Vocal: 88, Dance: 90, Rap: 55, Visual: 96 } },
  { name: 'Oyvas', role: 'Main Dancer, Sub Vocal', birthday: '03 de Abril de 2002', height: '180 cm', nationality: 'Korean', image: '/Oyvas.jpeg', stats: { Vocal: 70, Dance: 98, Rap: 45, Visual: 82 } },
  { name: 'Eddie', role: 'Lead Dancer, Sub Vocal, Visual, Maknae', birthday: '28 de Novembro', height: '172 cm', nationality: 'Korean', image: '/Eddie.png', stats: { Vocal: 78, Dance: 92, Rap: 50, Visual: 94 } }
];

export const database: { [key: string]: GroupData } = {
  otf: {
    name: 'ONE&',
    description: 'ONE& (Antes: One & Four e One & Five). Um grupo de alta performance focado em conceitos futuristas e narrativas profundas.',
    members: oneAndMembers,
    units: [
      {
        id: 'overlap',
        name: 'ONE& overl4p',
        description: 'Sub-unit focada em quebras de ritmo e misturas conceituais complexas.',
        members: [oneAndMembers[0], oneAndMembers[2], oneAndMembers[5]]
      },
      {
        id: 'lethal',
        name: 'ONE& LETHAL VIP&RS',
        description: 'Sub-unit com o conceito mais maduro, agressivo e impactante do grupo.',
        members: [oneAndMembers[1], oneAndMembers[4], oneAndMembers[6]]
      },
      {
        id: 'cabigy',
        name: 'CABIGY',
        description: 'Formada por Cauy, Biel e Iggy. Antiga sub-unit conhecida como ONE& RAINBOW DASH.',
        members: [oneAndMembers[3], oneAndMembers[4], oneAndMembers[6]]
      },
      {
        id: 'solos',
        name: 'Soloists',
        description: 'Solistas oficializados da OTF que possuem lançamentos e promoções individuais ativas.',
        members: [oneAndMembers[3], oneAndMembers[4], oneAndMembers[1], oneAndMembers[6]]
      }
    ]
  },
  lothus: {
    name: 'LOTHUS',
    description: 'LOTHUS (Antes: Wicked Dreams). Grupo de alto conceito com performances intensas e presença de palco marcante.',
    members: lothusMembers,
    units: [
      {
        id: 'blackpethal',
        name: 'BLACK PETHAL',
        description: 'Sub-unit formada por Andy, Myke, Oyvas e Eddie. Foco em conceitos sombrios e poderosos.',
        members: [lothusMembers[0], lothusMembers[1], lothusMembers[3], lothusMembers[4]]
      },
      {
        id: 'mad',
        name: 'MAD',
        description: 'Sub-unit formada por Andy, Myke e Dhi. Energia intensa e performances explosivas.',
        members: [lothusMembers[0], lothusMembers[1], lothusMembers[2]]
      },
      {
        id: 'mayday',
        name: 'MayDay',
        description: 'Sub-unit formada por Andy e Myke. Dupla de alta sinergia e versatilidade.',
        members: [lothusMembers[0], lothusMembers[1]]
      },
      {
        id: 'solos',
        name: 'Soloists',
        description: 'Solistas oficializados da LOTHUS com lançamentos e promoções individuais ativas.',
        members: [lothusMembers[0], lothusMembers[1], lothusMembers[4]]
      }
    ]
  }
};
