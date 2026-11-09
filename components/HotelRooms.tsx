import Image from 'next/image';
import {texts, links} from '@/lib/content';
import doubleRoom from '@/public/media/doppelzimmer.jpg';
import doubleDetail from '@/public/media/doppelzimmer-detail.jpg';
import bathroom from '@/public/media/badezimmer.jpg';
import tripleRoom from '@/public/media/dreibettzimmer.jpg';
import tripleDetail from '@/public/media/dreibettzimmer-detail.jpg';
import familyRoom from '@/public/media/familienzimmer.jpg';

const photos = [[doubleRoom, doubleDetail, bathroom], [tripleRoom, tripleDetail], [familyRoom]];

export function HotelRooms() {
  const starts = texts.hotel.flatMap((block, index) => block.tag === 'h3' ? [index] : []);
  return starts.map((start, index) => {
    const title = texts.hotel[start].text;
    const details = texts.hotel.slice(start + 1, starts[index + 1]);
    return <section className="hotel-room" key={title}>
      <div className="prose"><h3>{title}</h3><ul>{details.map(block => <li key={block.text}>{block.text}</li>)}</ul></div>
      <div className="room-photos">{photos[index].map((photo, photoIndex) => <a href={photo.src} key={photo.src} target="_blank" rel="noreferrer" aria-label={`${title}, Aufnahme ${photoIndex + 1} in voller Größe öffnen`}><Image src={photo} alt={`${title} – ${`Originalaufnahme ${photoIndex + 1}`}`} sizes="(max-width:760px) 90vw, 40vw"/></a>)}</div>
      <a className="text-link" href={links.booking}>Zimmer buchen</a>
    </section>;
  });
}
