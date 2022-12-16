import React from 'react'
import { Tabs, Input, Pagination } from 'antd'

import MovieCardList from '../movie-card-list'

import './movie-app.css'

export default class MovieApp extends React.Component {
  cardsData = [
    {
      adult: false,
      backdrop_path: '/4QLdZ2A8mkDWp2rpfgDrwmeCtUW.jpg',
      genre_ids: [28, 12, 80],
      id: 47971,
      original_language: 'en',
      original_title: 'xXx: Return of Xander Cage',
      overview: `Extreme athlete turned government operative Xander Cage comes out of self-imposed exile, 
        thought to be long dead, and is set on a collision course with deadly alpha warrior Xiang and 
        his team in a race to recover a sinister and seemingly unstoppable weapon known as Pandora\\'s Box. 
        Recruiting an all-new group of thrill-seeking cohorts, Xander finds himself enmeshed in a deadly 
        conspiracy that points to collusion at the highest levels of world governments.`,
      popularity: 85.226,
      poster_path: '/hba8zREJpP1AYhaXgb2oJLQeO0K.jpg',
      release_date: '2017-01-13',
      title: 'xXx: Return of Xander Cage',
      video: false,
      vote_average: 6.1,
      vote_count: 7681,
    },
    {
      adult: false,
      backdrop_path: '/kTtBDUeDZATzrTUlqHUG0ZWjg9m.jpg',
      genre_ids: [10752],
      id: 635744,
      original_language: 'en',
      original_title: 'Jarhead: Law of Return',
      overview: `Major Ronan Jackson, an accomplished fighter pilot for the Israel Defense 
        Forces and son of a U.S. Senator, is shot down while flying through Syrian airspace. 
        After miraculously surviving the crash, Jackson is taken captive by a group of Hezbollah 
        militiamen. A squad of elite soldiers, led by Gunnery Sergeant Dave Torres, risk their own 
        lives in the hopes of saving an ally they\\'ve never met.`,
      popularity: 39.356,
      poster_path: '/6LlqyjAik3Kh68QQ9AchSJEF0Z5.jpg',
      release_date: '2019-10-01',
      title: 'Jarhead: Law of Return',
      video: false,
      vote_average: 6.5,
      vote_count: 3040,
    },
    {
      adult: false,
      backdrop_path: '/dzgz0lXdDNOM78SepUHNcQHLhUZ.jpg',
      genre_ids: [14, 16, 878, 10751, 28],
      id: 8965,
      original_language: 'en',
      original_title: 'Atlantis: Milos Return',
      overview:
        'Milo and Kida reunite with their friends to investigate strange occurances around the world that seem to have links to the secrets of Atlantis.',
      popularity: 29.629,
      poster_path: '/c9siOypFgzsKL4LQI1d3EkDN6U3.jpg',
      release_date: '2003-02-25',
      // eslint-disable-next-line quotes
      title: "Atlantis: Milo\\'s Return",
      video: false,
      vote_average: 6.3,
      vote_count: 3248,
    },
    {
      adult: false,
      backdrop_path: '/1SeydkGlChbUrYJeV95TNSLQsFt.jpg',
      genre_ids: [16, 12, 35, 14],
      id: 125521,
      original_language: 'ja',
      original_title: 'スレイヤーズ RETURN',
      overview: `Lina Inverse and Naga the White Serpent are back! What begins as a routine bandit-stomping turns 
        into the adventure of a lifetime involving magical golems, an ancient Elven weapon and even someone bent on 
        destroying the world. It\\'s a predicament only Lina and Naga could get themselves in to.`,
      popularity: 11.467,
      poster_path: '/rDkod619OH3cWDAH3GwehFEx2Uu.jpg',
      release_date: '1996-08-03',
      title: 'Slayers Return',
      video: false,
      vote_average: 6.4,
      vote_count: 1549,
    },
    {
      adult: false,
      backdrop_path: '/PSBUyz5jXYqKr2OvLhQWmTbmSx.jpg',
      genre_ids: [99],
      id: 1015606,
      original_language: 'en',
      // eslint-disable-next-line prettier/prettier
      original_title: "Obi-Wan Kenobi: A Jedi's Return",
      overview:
        'A new documentary that showcases the making of the epic limited series. Features never-before-seen, behind-the-scenes footage, interviews and visits to the creature shop and props department.',
      popularity: 52.909,
      poster_path: '/wn6LkWQst96dPGEkn8Cl2TnNnLp.jpg',
      release_date: '2022-09-08',
      // eslint-disable-next-line prettier/prettier
      title: "Obi-Wan Kenobi: A Jedi's Return",
      video: false,
      vote_average: 6.6,
      vote_count: 625,
    },
    {
      adult: false,
      backdrop_path: '/8rft8A9nH43IReybFtYt21ezfMK.jpg',
      genre_ids: [99],
      id: 899082,
      original_language: 'en',
      original_title: 'Harry Potter 20th Anniversary: Return to Hogwarts',
      overview:
        'An enchanting making-of story told through all-new in-depth interviews and cast conversations, inviting fans on a magical first-person journey through one of the most beloved film franchises of all time.',
      popularity: 74.661,
      poster_path: '/jntLBq0MLR3hrwKaTQswxACRPMs.jpg',
      release_date: '2022-01-01',
      title: 'Harry Potter 20th Anniversary: Return to Hogwarts',
      video: false,
      vote_average: 7.3,
      vote_count: 2467,
    },
    {
      adult: false,
      backdrop_path: '/1GzlEn3AOlBFrx6vsqq1JAkH4G3.jpg',
      genre_ids: [16, 28, 878, 14],
      id: 43641,
      original_language: 'en',
      original_title: 'Superman/Shazam!: The Return of Black Adam',
      overview:
        'Chosen the world’s protector against the Seven Deadly Enemies of Man – pride, envy, greed, hatred, selfishness, laziness and injustice – young Billy Batson accepts his destiny as Captain Marvel. Battling alongside Superman against nefarious Black Adam, Billy soon discovers the challenge super heroes ultimately face: is it revenge or justice?',
      popularity: 53.869,
      poster_path: '/3MgwChvi42N1RnhQE9A4pQVHyUY.jpg',
      release_date: '2010-11-16',
      title: 'Superman/Shazam!: The Return of Black Adam',
      video: false,
      vote_average: 7,
      vote_count: 1271,
    },
    {
      adult: false,
      backdrop_path: '/nRCgF2ndHQ0vflGekeU4V2lufrF.jpg',
      genre_ids: [28, 878],
      id: 10366,
      original_language: 'en',
      original_title: 'Universal Soldier: The Return',
      overview:
        'Luc Deveraux, the heroic former Universal Soldier, is about to be thrown into action once again. When SETH, the supercomputer-controlled ultra-warrior, decides to take revenge and destroy its creators, only Luc can stop it. All hell breaks loose as Luc battles SETH and a deadly team of perfect soldiers in a struggle that pits man against machine and good against evil.',
      popularity: 20.635,
      poster_path: '/qlcPJK0Me8aUtDPwk3TqN2RdKH4.jpg',
      release_date: '1999-08-05',
      title: 'Universal Soldier: The Return',
      video: false,
      vote_average: 5.8,
      vote_count: 986,
    },
    {
      adult: false,
      backdrop_path: '/k6jiBYXllu7ziky7oEoyqRdaeUo.jpg',
      genre_ids: [35, 878],
      id: 11285,
      original_language: 'en',
      original_title: 'Cocoon: The Return',
      overview:
        'The reinvigorated elderly group that left Earth comes back to visit their relatives. Will they all decide to go back to the planet where no one grows old, or will they be tempted to remain on Earth?',
      popularity: 14.281,
      poster_path: '/xBsXdBl8qCXoQsWX6vfsVjWOMGk.jpg',
      release_date: '1988-09-13',
      title: 'Cocoon: The Return',
      video: false,
      vote_average: 6.3,
      vote_count: 754,
    },
    {
      adult: false,
      backdrop_path: '/8vG0vicedQKdmpNggqyHgYH8T0t.jpg',
      genre_ids: [12, 28, 878],
      id: 1892,
      original_language: 'en',
      original_title: 'Return of the Jedi',
      overview:
        'Luke Skywalker leads a mission to rescue his friend Han Solo from the clutches of Jabba the Hutt, while the Emperor seeks to destroy the Rebellion once and for all with a second dreaded Death Star.',
      popularity: 25.513,
      poster_path: '/q6ydU8r1iYyy2bV7tPVaq266Y1k.jpg',
      release_date: '1983-05-25',
      title: 'Return of the Jedi',
      video: false,
      vote_average: 7.9,
      vote_count: 13567,
    },
    {
      adult: false,
      backdrop_path: '/mOOJm3tamy9iHg2mOEA77CM6ufZ.jpg',
      genre_ids: [10751, 12, 16, 10749],
      id: 15969,
      original_language: 'en',
      original_title: 'The Return of Jafar',
      overview: `The evil Jafar escapes from the magic lamp as an all-powerful genie, ready to plot his 
        revenge against Aladdin. From battling elusive villains atop winged horses, to dodging flames inside an exploding lava pit, it\\'s up to Aladdin - with Princess Jasmine and the outrageously funny Genie by his side - to save the kingdom once and for all.`,
      popularity: 24.67,
      poster_path: '/7SC793qtORB6YL4mu0F5o3hfjDQ.jpg',
      release_date: '1994-05-20',
      title: 'The Return of Jafar',
      video: false,
      vote_average: 6.2,
      vote_count: 2925,
    },
    {
      adult: false,
      backdrop_path: '/rQavRvcXYbv2gRAYhIEwV3gDpyX.jpg',
      genre_ids: [10751, 14, 35, 10770, 28],
      id: 34204,
      original_language: 'en',
      original_title: 'Return to Halloweentown',
      overview: `As Halloweentown prepares to celebrate its 1,000th anniversary, Marnie Piper and her brother 
        Dylan return to Witch University, where trouble is in session from the Sinister Sisters and from someone who\\'s plotting to use Marnie\\'s powers for evil.`,
      popularity: 20.401,
      poster_path: '/yYIVsEUyGdp8bEtRjOZGwQA3qmq.jpg',
      release_date: '2006-10-20',
      title: 'Return to Halloweentown',
      video: false,
      vote_average: 6.6,
      vote_count: 494,
    },
    {
      adult: false,
      backdrop_path: '/vjCfmGVlplqgTBEm6TfjAIu3xhX.jpg',
      genre_ids: [12, 10751, 14],
      id: 13155,
      original_language: 'en',
      original_title: 'Return to Oz',
      overview: `Dorothy, saved from a psychiatric experiment by a mysterious girl, finds herself back in the land of her dreams, 
        and makes delightful new friends, and dangerous new enemies.`,
      popularity: 15.315,
      poster_path: '/pBY9FawVepBnGca1TxVhoRJV6bZ.jpg',
      release_date: '1985-06-21',
      title: 'Return to Oz',
      video: false,
      vote_average: 6.6,
      vote_count: 808,
    },
    {
      adult: false,
      backdrop_path: '/quYU0dRWsAHUY9DpIJqF0E3k91.jpg',
      genre_ids: [12, 14, 16, 10751],
      id: 16690,
      original_language: 'en',
      original_title: 'Return to Never Land',
      overview: `In 1940, the world is besieged by World War II. Wendy, all grown up, has two children; including Jane, 
        who does not believe Wendy\\'s stories about Peter Pan.`,
      popularity: 21.524,
      poster_path: '/y8TePNvpkId43hdFmZ6XvujVPl8.jpg',
      release_date: '2002-02-14',
      title: 'Return to Never Land',
      video: false,
      vote_average: 6.4,
      vote_count: 2018,
    },
    {
      adult: false,
      backdrop_path: '/y71J24BNl00V1CMJeFJEljKMk5i.jpg',
      genre_ids: [12, 878, 14],
      id: 521494,
      original_language: 'en',
      original_title: 'Transformers: Titans Return',
      overview:
        'After the Combiner Wars ended, Cybertron started to be rebuilt. However, an undead Starscream has been reincarnated as Trypticon, wreaking havoc around him. To combat this menace, Windblade gathers up a ragtag team of Transformers, including Optimus Prime and Megatron, to resurrect an ancient ally. And while some may be forever changed by the events, others may not emerge with their sparks intact.',
      popularity: 8.817,
      poster_path: '/nP4nfW0E1cl1dAy6j8iKHsJRyQ2.jpg',
      release_date: '2017-11-14',
      title: 'Transformers: Titans Return',
      video: false,
      vote_average: 6.5,
      vote_count: 132,
    },
    {
      adult: false,
      backdrop_path: '/lXhgCODAbBXL5buk9yEmTpOoOgR.jpg',
      genre_ids: [12, 14, 28],
      id: 122,
      original_language: 'en',
      original_title: 'The Lord of the Rings: The Return of the King',
      overview: `Aragorn is revealed as the heir to the ancient kings as he, Gandalf and the other members of the broken 
        fellowship struggle to save Gondor from Sauron\\'s forces. Meanwhile, Frodo and Sam take the ring closer to the heart of Mordor, the dark lord\\'s realm.`,
      popularity: 76.132,
      poster_path: '/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg',
      release_date: '2003-12-01',
      title: 'The Lord of the Rings: The Return of the King',
      video: false,
      vote_average: 8.5,
      vote_count: 20667,
    },
    {
      adult: false,
      backdrop_path: '/70tfSdpFBXI8VzELLc015aN9kwa.jpg',
      genre_ids: [12, 18],
      id: 13888,
      original_language: 'en',
      original_title: 'Return to the Blue Lagoon',
      overview:
        'In this sequel to the 1980 classic, two children are stranded on a beautiful island in the South Pacific. With no adults to guide them, the two make a simple life together and eventually become tanned teenagers in love.',
      popularity: 27.298,
      poster_path: '/jhUTLuPgc3Qcvr5xtji8oiWSfYy.jpg',
      release_date: '1991-08-02',
      title: 'Return to the Blue Lagoon',
      video: false,
      vote_average: 6.1,
      vote_count: 896,
    },
    {
      adult: false,
      backdrop_path: '/a1r0Eqw6qeFH6LNnf3uwWEg8aT1.jpg',
      genre_ids: [35, 27],
      id: 10925,
      original_language: 'en',
      original_title: 'The Return of the Living Dead',
      overview:
        'When foreman Frank shows new employee Freddy a secret military experiment in a supply warehouse in Louisville, Kentucky, the two klutzes accidentally release a gas that reanimates corpses into flesh-eating zombies. As the epidemic spreads throughout the town, and the creatures satisfy their hunger in gory and outlandish ways, Frank and Freddy fight to survive with the help of their boss and a mysterious mortician.',
      popularity: 27.165,
      poster_path: '/qVTFBabgnWz4jZ8wOQRYZI5EITF.jpg',
      release_date: '1985-04-25',
      title: 'The Return of the Living Dead',
      video: false,
      vote_average: 7.1,
      vote_count: 1615,
    },
    {
      adult: false,
      backdrop_path: '/3R7E4YcHlRGohxIWSsnay70pF6X.jpg',
      genre_ids: [37],
      id: 390555,
      original_language: 'en',
      original_title: 'Bonanza: The Return',
      overview:
        'A man with a grudge against the late Little Joe seeks revenge on the Cartwrights and attempts to take over the Ponderosa.',
      popularity: 6.272,
      poster_path: '/5q5ghl8VLPGGiEVC5aO3z0KMGA6.jpg',
      release_date: '1993-11-24',
      title: 'Bonanza: The Return',
      video: false,
      vote_average: 6,
      vote_count: 85,
    },
    {
      adult: false,
      backdrop_path: '/3fIELwQezqPoIrfgzCf19r9TymE.jpg',
      genre_ids: [27, 878],
      id: 628866,
      original_language: 'en',
      original_title: 'The Return',
      overview: `After the death of his father, a brilliant college student returns to his family home where 
        he learns that the horrors from his childhood aren\\'t as dead and gone as he once thought.`,
      popularity: 7.419,
      poster_path: '/rK2gW2kOIC5hG3JjVB81vU9v8gC.jpg',
      release_date: '2020-09-05',
      title: 'The Return',
      video: false,
      vote_average: 6.4,
      vote_count: 114,
    },
  ]

  render() {
    return (
      <div className="app body__app">
        <div className="app__tabs-switch">
          <Tabs
            defaultActiveKey="1"
            centered="true"
            items={[
              {
                label: 'Search',
                key: '1',
                children: null,
              },
              {
                label: 'Rated',
                key: '2',
                children: null,
              },
            ]}
          />
        </div>
        <Input placeholder="Type to search..." />
        <MovieCardList movies={this.cardsData} />
        <Pagination defaultCurrent={1} total={50} className="app__pagination" />
      </div>
    )
  }
}
