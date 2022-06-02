import styled from "@emotion/styled";
import Head from "next/head";
import AnimeCard from "../components/AnimeCard";

const animes = {
  data: {
    Page: {
      pageInfo: {
        total: 5000,
        currentPage: 1,
        perPage: 10,
        lastPage: 500,
        hasNextPage: true,
      },
      media: [
        {
          id: 1,
          title: {
            english: "Cowboy Bebop",
          },
          description:
            "Enter a world in the distant future, where Bounty Hunters roam the solar system. Spike and Jet, bounty hunting partners, set out on journeys in an ever struggling effort to win bounty rewards to survive.<br><br>\nWhile traveling, they meet up with other very interesting people. Could Faye, the beautiful and ridiculously poor gambler, Edward, the computer genius, and Ein, the engineered dog be a good addition to the group?",
          episodes: 26,
          bannerImage:
            "https://s4.anilist.co/file/anilistcdn/media/anime/banner/1-T3PJUjFJyRwg.jpg",
          coverImage: {
            extraLarge:
              "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1-CXtrrkMpJ8Zq.png",
          },
          genres: ["Action", "Adventure", "Drama", "Sci-Fi"],
          averageScore: 86,
          popularity: 263491,
        },
        {
          id: 5,
          title: {
            english: "Cowboy Bebop: The Movie - Knockin' on Heaven's Door",
          },
          description:
            "As the Cowboy Bebop crew travels the stars, they learn of the largest bounty yet, a huge 300 million Woolongs. Apparently, someone is wielding a hugely powerful chemical weapon, and of course the authorities are at a loss to stop it. The war to take down the most dangerous criminal yet forces the crew to face a true madman, with bare hope to succeed.\n<br><br>\n(Source: Anime News Network)",
          episodes: 1,
          bannerImage:
            "https://s4.anilist.co/file/anilistcdn/media/anime/banner/5-VOcSZFepDDhm.jpg",
          coverImage: {
            extraLarge:
              "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/b5-Zs2cbrglTu67.png",
          },
          genres: ["Action", "Drama", "Mystery", "Sci-Fi"],
          averageScore: 82,
          popularity: 49418,
        },
        {
          id: 6,
          title: {
            english: "Trigun",
          },
          description:
            "Vash the Stampede is a wanted man with a habit of turning entire towns into rubble. The price on his head is a fortune, and his path of destruction reaches across the arid wastelands of a desert planet. Unfortunately, most encounters with the spiky-haired gunslinger don't end well for the bounty hunters who catch up with him; someone almost always gets hurt - and it's never Vash.<br>\n<br>\nOddly enough, for such an infamous fugitive, there's no proof that he's ever taken a life. In fact, he's a pacifist with a doughnut obsession who's more doofus than desperado. There's a whole lot more to him than his reputation lets on - Vash the Stampede definitely ain't your typical outlaw.<br>\n<br>\n(Source: Funimation)",
          episodes: 26,
          bannerImage:
            "https://s4.anilist.co/file/anilistcdn/media/anime/banner/6-4pIR2RY8AHZ0.jpg",
          coverImage: {
            extraLarge:
              "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx6-Zzun7PHNNgPt.jpg",
          },
          genres: ["Action", "Adventure", "Comedy", "Drama", "Sci-Fi"],
          averageScore: 79,
          popularity: 86080,
        },
        {
          id: 7,
          title: {
            english: "Witch Hunter ROBIN",
          },
          description:
            "Robin Sena is a powerful craft user drafted into the STNJ - a group of specialized hunters that fight deadly beings known as Witches. Though her fire power is great, she’s got a lot to learn about her powers and working with her cool and aloof partner, Amon. But the truth about the Witches and herself will leave Robin on an entirely new path that she never expected!<br>\n<br>\n(Source: Funimation)",
          episodes: 26,
          bannerImage:
            "https://s4.anilist.co/file/anilistcdn/media/anime/banner/7-hjjlCe3yO7lO.jpg",
          coverImage: {
            extraLarge:
              "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx7-6uh1fPvbgS9t.png",
          },
          genres: ["Action", "Drama", "Mystery", "Supernatural"],
          averageScore: 68,
          popularity: 12341,
        },
        {
          id: 8,
          title: {
            english: "Beet the Vandel Buster",
          },
          description:
            "It is the dark century and the people are suffering under the rule of the devil, Vandel, who is able to manipulate monsters. The Vandel Busters are a group of people who hunt these devils, and among them, the Zenon Squad is known to be the strongest busters on the continent. A young boy, Beet, dreams of joining the Zenon Squad. However, one day, as a result of Beet's fault, the Zenon squad was defeated by the devil, Beltose. The five dying busters sacrificed their life power into their five weapons, Saiga. After giving their weapons to Beet, they passed away. Years have passed since then and the young Vandel Buster, Beet, begins his adventure to carry out the Zenon Squad's will to put an end to the dark century. ",
          episodes: 52,
          bannerImage: null,
          coverImage: {
            extraLarge:
              "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/b8-ReS3TwSgrDDi.jpg",
          },
          genres: ["Adventure", "Fantasy", "Supernatural"],
          averageScore: 62,
          popularity: 1733,
        },
        {
          id: 15,
          title: {
            english: "Eyeshield 21",
          },
          description:
            "Welcome To the Gridiron of the Damned!   Huge hulking bodies throw themselves at each other, while a tiny lithe body runs between them for the goal!  No, it&rsquo;s not a game of football, it&rsquo;s Sena Kobayakawa trying to evade the monstrous Ha-Ha brothers down the halls of Deimon High School!  But wait!  Sena&rsquo;s incredible skills at not getting caught have been spotted by the devilish (possibly actually demonic) captain of the school&rsquo;s embryonic American style football team, and when Sena asks to be the teams manager, he gets  thrust onto the field as a running back instead!  But there are two BIG catches: first, to keep the identity of their new &ldquo;star&rdquo; player an absolute secret, Yoichi makes Sena wear an opaque visor on his helmet and gives him the alias of &ldquo;Eyeshield 21.&rdquo;  And the second catch?  Well, in order to hit his fastest &ldquo;speed of light&rdquo; running mode, Sena usually has to be absolutely terrified. Not that THAT will be a problem with the monstrous players that he&rsquo;ll soon find himself running from!  The insanity hits the streets when the feet meet the cleats in EYESHIELD 21! <br><br>\n(Source: Sentai Filmworks)",
          episodes: 145,
          bannerImage:
            "https://s4.anilist.co/file/anilistcdn/media/anime/banner/n15-1eTutXlxYzYl.jpg",
          coverImage: {
            extraLarge:
              "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx15-A4F2t0TgWoi4.png",
          },
          genres: ["Action", "Comedy", "Sports"],
          averageScore: 75,
          popularity: 21104,
        },
        {
          id: 16,
          title: {
            english: "Honey and Clover",
          },
          description:
            "Takemoto Yuuta, Mayama Takumi, and Morita Shinobu are college students who share the small apartment. Even though they live in poverty, the three of them are able to obtain pleasure through small things in life. The story follows these characters' life stories as poor college students, as well as their love lives when a short but talented 18 year old girl called Hanamoto Hagumi appears.\n<br><br>\n(Source: Anime News Network)",
          episodes: 24,
          bannerImage:
            "https://s4.anilist.co/file/anilistcdn/media/anime/banner/16-jmEaCBBN5WRS.jpg",
          coverImage: {
            extraLarge:
              "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16-5fJZ2Sy2ThRA.jpg",
          },
          genres: ["Comedy", "Drama", "Romance", "Slice of Life"],
          averageScore: 76,
          popularity: 37741,
        },
        {
          id: 17,
          title: {
            english: null,
          },
          description:
            "Kyosuke Kano has lived under the shadow of his successful brother Seisuke all his life who is a professional soccer player. Tired of being compared and downgraded at, he abandoned playing soccer until a boy from his new highschool discovered him and asked him to join their team. Kyosuke joins it and befriends two other first year players named Rodrigo and Sakai with the dream of becomming professional soccer players themselves.\n<br><br>\n(Source: Anime News Network)",
          episodes: 52,
          bannerImage:
            "https://s4.anilist.co/file/anilistcdn/media/anime/banner/17-2drlTPxc3WTh.png",
          coverImage: {
            extraLarge:
              "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx17-6kqIbdUk3dgi.png",
          },
          genres: ["Comedy", "Slice of Life", "Sports"],
          averageScore: 70,
          popularity: 2935,
        },
        {
          id: 18,
          title: {
            english: "Initial D 4th Stage",
          },
          description:
            'Takumi Fujiwara and brothers Keisuke and Ryousuke Takahashi have formed "Project D," a racing team aimed at bringing their driving skills to their full potential outside their prefecture. Using the internet, Project D issues challenges to other racing teams and posts results of their races. Managed by Ryousuke, the team has Takumi engaging in downhill battles with his AE86, while Keisuke challenges opponents uphill. Among their rivals are the Seven-Star Leaf (SSR) and Todo-juku.',
          episodes: 24,
          bannerImage:
            "https://s4.anilist.co/file/anilistcdn/media/anime/banner/18-aiibhi4BrZeR.jpg",
          coverImage: {
            extraLarge:
              "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/b18-r7IirVmwP89u.jpg",
          },
          genres: ["Action", "Drama", "Sports"],
          averageScore: 79,
          popularity: 24501,
        },
        {
          id: 19,
          title: {
            english: "Monster",
          },
          description:
            "Dr. Kenzo Tenma is a renowned Japanese brain surgeon working at a leading hospital in Germany. One night, Dr. Tenma risks his reputation and career to save the life of a critically wounded young boy over that of the town mayor who had been planning to support the hospital financially. A string of mysterious murders begin to occur soon after the operation, and Dr. Tenma emerges as the primary suspect despite no incriminating evidence. \n<br><br>\nA doctor is taught to believe that all life is equal; however, when another series of murders occur in the surgeon's vicinity, Dr. Tenma's beliefs are shaken as his actions that night are shown to have much broader consequences than he could have imagined. Leaving behind his life as a surgeon he embarks on a journey across the country to unravel the mystery of the boy he saved.",
          episodes: 74,
          bannerImage:
            "https://s4.anilist.co/file/anilistcdn/media/anime/banner/19-kJhwsB0Z97tL.jpg",
          coverImage: {
            extraLarge:
              "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx19-ham53gnijfiN.jpg",
          },
          genres: ["Drama", "Horror", "Mystery", "Psychological", "Thriller"],
          averageScore: 87,
          popularity: 146545,
        },
      ],
    },
  },
};

const H1 = styled.h1`
  text-align: center;
`;

const Container = styled.div`
  padding: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
  margin: auto;
  max-width: 1500px;
`;

export default function Home() {
  return (
    <div>
      <Head>
        <title>Anilist Collection</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <H1>Explore Anime</H1>
      <Container>
        <Grid>
          {animes.data.Page.media.map(
            ({
              id,
              title,
              description,
              episodes,
              coverImage,
              averageScore,
            }) => (
              <AnimeCard
                key={id}
                id={id}
                title={title}
                description={description}
                episodes={episodes}
                coverImage={coverImage}
                averageScore={averageScore}
              />
            )
          )}
        </Grid>
      </Container>
    </div>
  );
}
