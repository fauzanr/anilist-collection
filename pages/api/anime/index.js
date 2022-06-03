export default function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;
    if (!id) return res.status(200).json([]);

    const arrayId = id.split(",");
    console.log(arrayId);

    const data = [
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
    ];
    res.status(200).json(data);
  }
}
