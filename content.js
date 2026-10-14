// Edit this file to maintain the website. Paths are relative to index.html.
// All sample records are explicitly marked. Replace them with verified lab content.
window.LAB = {
  name: 'Cross-Domain Intelligent Flight Lab', shortName: 'CDIFLab',
  university: 'Northwestern Polytechnical University',
  tagline: 'Perception. Intelligence. Flight.',
  introduction: 'Exploring perception, navigation, and control for intelligent aerial systems.',
  about: 'The Cross-Domain Intelligent Flight Lab (CDIFLab) is based at Northwestern Polytechnical University. This website introduces our group, research, and open resources.',
  research: [
    { title: 'Bio-inspired perception', text: 'Event-based vision, optical flow, and neuromorphic approaches to aerial perception.' },
    { title: 'Intelligent navigation', text: 'Learning and autonomy for aerial robots operating in complex environments.' },
    { title: 'Flight control & systems', text: 'Adaptive and nonlinear control, micro air vehicles, and embedded UAV systems.' }
  ],
  headline: { title: 'Towards intelligent flight across domains', date: '', category: 'RESEARCH VISION', image: 'assets/flight.svg', text: 'Discover the questions that guide our work in aerial robotics.', target: 'about' },
  news: [
    { title: 'A new home for CDIFLab', date: '2026-10-10', category: 'WEBSITE PREVIEW', image: 'assets/flight.svg', text: 'This is an illustrative news entry. Replace it with your lab’s website launch announcement and photograph.' },
    { title: 'Seeing motion differently', date: '', category: 'SAMPLE · RESEARCH', image: 'assets/perception.svg', text: 'Use this space to introduce a research result in event-based vision. Add the actual publication, date, and project photograph before publishing.' },
    { title: 'From ideas to airborne systems', date: '', category: 'SAMPLE · LAB LIFE', image: 'assets/systems.svg', text: 'Share a flight experiment, a new platform, or a behind-the-scenes look at the lab. This entry is a placeholder.' }
  ],
  // Add photo: 'assets/people/name.jpg' for PI photos. Students are displayed without photos.
  director: [
    { id: 'li-ni', name: 'Li Ni', role: 'Professor', photo: 'assets/pi-group.png', photoClass: 'portrait-group-centre', bio: '', url: '' },
  ],
  pis: [
    { id: 'ho-hann-woei', name: 'Ho Hann Woei', role: 'Professor', photo: 'assets/ho-hann-woei.png', bio: '', url: '' },
    { id: 'dong-changyin', name: 'Dong Changyin', role: 'Assoc. Prof.', photo: 'assets/dong-changyin.png', bio: '', url: '' }
  ],
  fellows: [
    { id: 'deng-yunshan', name: 'Deng YunShan', role: 'Dr.', photo: 'assets/deng-yunshan.jpg', bio: '', url: '' },
    { id: 'jiang-hanjie', name: 'Jiang Hanjie', role: 'Dr.', photo: 'assets/jiang-hanjie.jpg', bio: '', url: '' }
  ],
  undergraduates: [],
  alumni: [],
  students: [], // { name: 'Full name', degree: 'PhD student', topic: 'Research topic' }
  publications: [], // { year: 2026, title: 'Paper title', authors: 'Authors', venue: 'Journal / conference', url: 'https://...', code: 'https://...' }
  projects: [
    { type: 'Research', title: 'Bio-inspired aerial perception', image: 'assets/perception.svg', description: 'Sample project slot for event-based vision and optical-flow research.', url: '', sample: true },
    { type: 'Engineering', title: 'Embedded intelligent flight systems', image: 'assets/systems.svg', description: 'Sample project slot for UAV platforms, onboard computing, and flight experiments.', url: '', sample: true }
  ],
  resources: [], // { type: 'Code' or 'Dataset', title: 'Name', description: 'Summary', url: 'https://...', license: 'License' }
  jobs: [], // { title: 'Position', description: 'Requirements, project, and application instructions', url: 'https://...' }
  contact: { email: '', address: 'Northwestern Polytechnical University, Xi’an, China', details: 'Building, room, and campus details will be added here.' },
  social: { github: '', youtube: '' } // Add your lab-specific channel URLs.
};
