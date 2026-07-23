import type { Member, GroupData } from '../types';

const oneAndMembers: Member[] = [
  { name: 'Biel', role: 'Main Vocal, Lead Rapper, Sub Dancer', birthday: '30 de Dezembro', height: '176 cm', nationality: 'Korean', image: '/Biel.jpeg', stats: { Vocal: 96, Dance: 68, Rap: 82, Visual: 84 } },
  { name: 'Cauy', role: 'Main Vocal, Sub Rapper, Sub Dancer', birthday: '11 de Setembro', height: '174 cm', nationality: 'Korean', image: '/Cauy.jpeg', stats: { Vocal: 99, Dance: 65, Rap: 55, Visual: 85 } },
  { name: 'Guhan', role: 'Sub Vocal, Visual, Sub Rapper', birthday: '18 de Janeiro', height: '180 cm', nationality: 'Korean', image: '/Guhan.jpeg', stats: { Vocal: 68, Dance: 70, Rap: 62, Visual: 94 } },
  { name: 'Iggy', role: 'Leader, Main Rapper, Vocalista, Sub Dancer', birthday: '20 de Fevereiro', height: '172 cm', nationality: 'Korean', image: '/Iggy.jpeg', stats: { Vocal: 78, Dance: 65, Rap: 97, Visual: 88 } },
  { name: 'Leb', role: 'Main Dancer, Visual, Vocalista, Sub Rapper', birthday: '05 de Março', height: '178 cm', nationality: 'Korean', image: '/Leb.jpeg', stats: { Vocal: 75, Dance: 98, Rap: 60, Visual: 95 } },
  { name: 'Luna', role: 'Lead Vocal, Lead Rapper, Lead Dancer', birthday: '14 de Maio', height: '165 cm', nationality: 'Korean', image: '/Luna.jpeg', stats: { Vocal: 88, Dance: 88, Rap: 85, Visual: 80 } },
  { name: 'Lune', role: 'Face, Center, Visual, Lead Dancer, Sub Vocal, Maknae', birthday: '22 de Julho', height: '167 cm', nationality: 'Korean', image: '/Lune.jpeg', stats: { Vocal: 70, Dance: 89, Rap: 40, Visual: 97 } }
];

const lothusMembers: Member[] = [
  { name: 'Andy', role: 'Main Vocal, Leader', birthday: '07 de Dezembro de 2004', height: '182 cm', nationality: 'Brazilian', image: '/Andy.jpeg', stats: { Vocal: 97, Dance: 75, Rap: 60, Visual: 88 } },
  { name: 'Myke', role: 'Main Rapper, Lead Vocal, Visual, Center', birthday: '16 de Janeiro de 2003', height: '182 cm', nationality: 'Brazilian', image: '/Myke2.jpg', stats: { Vocal: 85, Dance: 80, Rap: 98, Visual: 95 } },
  { name: 'Dhi', role: 'Lead Vocal, Lead Dancer, Face', birthday: '22 de Abril de 2003', height: '182 cm', nationality: 'Brazilian', image: '/Dhi.jpeg', stats: { Vocal: 88, Dance: 90, Rap: 55, Visual: 96 } },
  { name: 'Oyvas', role: 'Main Dancer, Sub Vocal', birthday: '10 de Abril de 2002', height: '180 cm', nationality: 'Korean', image: '/Oyvas.jpeg', stats: { Vocal: 70, Dance: 98, Rap: 45, Visual: 82 } },
  { name: 'Eddie', role: 'Lead Dancer, Sub Vocal, Visual, Maknae', birthday: '28 de Novembro', height: '172 cm', nationality: 'Korean', image: '/Eddie.png', stats: { Vocal: 78, Dance: 92, Rap: 50, Visual: 94 } }
];

const prettysinMembers: Member[] = [
  { name: 'LUI', role: 'Leader, Center, Main Vocal, Visual, Face, Main Rapper, Main Dancer', birthday: '15 de Março', height: '178 cm', nationality: 'Korean', image: '/Lui.jpeg', stats: { Vocal: 98, Dance: 96, Rap: 95, Visual: 99 } }
];

const prettysinExMembers: Member[] = [
  { name: 'Lari', role: 'Lead Vocalista, Visual, Sub Rapper, Main Dancer', birthday: '22 de Abril', height: '170 cm', nationality: 'Brazilian', image: '/Lari.jpeg', stats: { Vocal: 82, Dance: 92, Rap: 68, Visual: 90 } },
  { name: 'Luize', role: 'Lead Vocal, Lead Rapper, Lead Dancer', birthday: '10 de Junho', height: '168 cm', nationality: 'Brazilian', image: '/Luize.jpeg', stats: { Vocal: 88, Dance: 82, Rap: 80, Visual: 85 } },
  { name: 'Bruna', role: 'Sub Vocal, Main Rapper, Main Dancer', birthday: '05 de Fevereiro', height: '172 cm', nationality: 'Brazilian', image: '/Bruna.jpeg', stats: { Vocal: 72, Dance: 90, Rap: 94, Visual: 86 } },
  { name: 'Gio', role: 'Sub Vocal, Face, Center, Visual, Lead Dancer, Maknae', birthday: '30 de Agosto', height: '165 cm', nationality: 'Brazilian', image: '/Gio.jpeg', stats: { Vocal: 68, Dance: 88, Rap: 55, Visual: 96 } },
  { name: 'Mars', role: 'Main Vocal, Sub Rapper, Sub Dancer', birthday: '14 de Janeiro', height: '176 cm', nationality: 'Brazilian', image: '/Mars.jpeg', stats: { Vocal: 94, Dance: 72, Rap: 65, Visual: 82 } },
  { name: 'Zallia', role: 'Main Vocal, Lead Rapper, Sub Dancer', birthday: '03 de Julho', height: '170 cm', nationality: 'Brazilian', image: '/Zallia.jpeg', stats: { Vocal: 93, Dance: 68, Rap: 84, Visual: 78 } },
  { name: 'Princeso', role: 'Sub Rapper, Sub Vocal, Visual', birthday: '18 de Outubro', height: '175 cm', nationality: 'Brazilian', image: '/Princeso.jpeg', stats: { Vocal: 62, Dance: 60, Rap: 72, Visual: 88 } },
  { name: 'Carlos', role: 'Sub Vocalista, Main Rapper, Sub Dancer', birthday: '12 de Setembro', height: '180 cm', nationality: 'Brazilian', image: '/Carlos.jpeg', stats: { Vocal: 66, Dance: 74, Rap: 92, Visual: 76 } }
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
  },
  prettysin: {
    name: 'PRETTYSIN',
    description: 'PRETTYSIN — OTF - Units. Grupo visual e performático com conceito refinado e presença marcante.',
    members: prettysinMembers,
    exMembers: prettysinExMembers,
    units: [
      {
        id: 'infinity8',
        name: 'INFINITY8',
        description: 'Sub-unit da PRETTYSIN focada em performances de alto impacto e conceitos futuristas.',
        members: [prettysinMembers[0], prettysinExMembers[4], prettysinExMembers[5], prettysinExMembers[6], prettysinExMembers[7], prettysinExMembers[8]]
      },
      {
        id: 'runway',
        name: 'RUNWAY',
        description: 'Sub-unit COLLAB ALL OTF — colaboração entre todos os grupos OTF com foco em conceitos de moda e passarela.',
        members: [prettysinMembers[0], prettysinExMembers[3], prettysinExMembers[6]]
      },
      {
        id: 'solos',
        name: 'Soloists',
        description: 'Solistas oficializados da PRETTYSIN com lançamentos e promoções individuais ativas.',
        members: [prettysinMembers[0]]
      }
    ]
  }
};