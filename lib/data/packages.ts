export type PackageCategory = "cultural" | "trekking" | "festival" | "adventure" | "luxury" | "custom"

export type PackageDifficulty = "Easy" | "Moderate" | "Challenging" | "Extreme"

export interface PackageItineraryItem {
  day: number
  title: string
  description: string
  meals?: string
  stay?: string
  // Where the traveler sleeps/ends the day, with altitude where it matters,
  // e.g. "Paro · 2,250 m" or "Jangothang Base Camp · 4,080 m".
  location?: string
  // Optional explicit day image. Only use verified-real photos here — several
  // root-level /public images are AI-generated (see site-audit notes).
  image?: string
}

export interface PackageFaq {
  question: string
  answer: string
}

export interface TourPackage {
  slug: string
  category: PackageCategory
  title: string
  summary: string
  description: string
  durationLabel: string
  durationDays: number
  region: string
  difficulty: PackageDifficulty
  bestTime: string
  groupSize: string
  startingFrom?: number
  comfortLevel: "Essential" | "Comfort" | "Premium" | "Luxury"
  heroImage: string
  gallery: string[]
  highlights: string[]
  itinerary: PackageItineraryItem[]
  included: string[]
  excluded: string[]
  faqs: PackageFaq[]
  keywords: string[]
}

export const packageCategories: { slug: PackageCategory; label: string }[] = [
  { slug: "cultural", label: "Cultural Tours" },
  { slug: "trekking", label: "Trekking Tours" },
  { slug: "festival", label: "Festival Tours" },
  { slug: "adventure", label: "Adventure Tours" },
  { slug: "luxury", label: "Luxury Tours" },
  { slug: "custom", label: "Custom Journeys" },
]

const fallbackGallery = ["/images/package-bg.webp", "/images/tshechu.webp", "/images/bhutan-festival.jpg"]

export const packages: TourPackage[] = [
  {
    slug: "paro-tshechu",
    category: "festival",
    title: "Paro Tshechu Festival Tour",
    summary: "Bhutan’s most iconic masked dance festival with sacred ceremonies and cultural immersion.",
    description:
      "Join the springtime Paro Tshechu celebrations with guided festival access, monastery visits, and Bhutanese cultural encounters.",
    durationLabel: "7 Days / 6 Nights",
    durationDays: 7,
    region: "Western Bhutan",
    difficulty: "Easy",
    bestTime: "March–April",
    groupSize: "2–12 guests",
    comfortLevel: "Comfort",
    heroImage: "/images/packages/paro-tshechu.jpg",
    gallery: [
      "/bhutan-festival-masked-dancers-colorful-costumes-c.jpg",
      "/thimphu-tshechu-festival-bhutan-colorful-masks-dan.jpg",
      "/thongdrel-sacred-scroll-unfurling-thimphu-tshechu-.jpg",
      ...fallbackGallery,
    ],
    highlights: [
      "Paro Tshechu festival experience",
      "Tiger’s Nest monastery hike",
      "Thimphu cultural landmarks",
      "Local crafts and market visits",
    ],
    itinerary: [
      {
        day: 1,
        title: "Flight Into the Himalayas",
        description:
          "Your descent into Paro sweeps past forested ridges and white-walled farmhouses — one of the world's most dramatic landings. Meet your guide with a silk khadar welcome scarf, then ease into Bhutan with an evening stroll through Paro's painted shopfronts and a first butter-lamp offering at 7th-century Kyichu Lhakhang.",
        meals: "Dinner",
        stay: "Paro hotel",
        location: "Paro · 2,250 m",
        image: "/images/itinerary/paro-arrival.jpg",
      },
      {
        day: 2,
        title: "Paro Tshechu — Dances of the Guru",
        description:
          "Join thousands of Bhutanese in their finest gho and kira as masked cham dancers whirl in the courtyard beside Rinpung Dzong — each dance a centuries-old teaching in motion. Between performances, atsara jesters work the crowd while you picnic festival-style among local families.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Paro hotel",
        location: "Paro Dzong festival grounds",
        image: "/images/packages/paro-tshechu.jpg",
      },
      {
        day: 3,
        title: "Fortress, Farmhouse & Craft",
        description:
          "Climb through Rinpung Dzong's great whitewashed galleries, then wind down to the medieval cantilever bridge below. After lunch in a working farmhouse — with a taste of home-distilled ara if you dare — watch weavers and woodcarvers at their benches in Paro's artisan workshops.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Paro hotel",
        location: "Paro Valley",
        image: "/images/packages/cultural-heritage.jpg",
      },
      {
        day: 4,
        title: "Thimphu — The Capital in Motion",
        description:
          "Follow the river road to Thimphu, where golden Buddha Dordenma gazes over the valley from 51 metres up. Circle the Memorial Chorten with murmuring pilgrims, meet the national animal at the takin preserve, and browse the weekend market's chillies, cheeses, and incense.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Thimphu hotel",
        location: "Thimphu · 2,320 m",
        image: "/bhutan-buddha-dordenma-giant-golden-statue-thimphu.jpg",
      },
      {
        day: 5,
        title: "Over Dochula to Punakha",
        description:
          "Crest Dochula Pass at 3,100 metres, where 108 memorial chortens stand against a wall of Himalayan snow peaks. Descend through blooming rhododendron forest to subtropical Punakha and walk the great dzong at the meeting of the Mother and Father rivers — Bhutan's most beautiful fortress.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Punakha hotel",
        location: "Punakha · 1,250 m",
        image: "/bhutan-dochula-pass-108-chortens-himalayan-mountain.jpg",
      },
      {
        day: 6,
        title: "The Tiger's Nest Pilgrimage",
        description:
          "Set out at first light through blue pine forest, climbing switchbacks to the cliff-hung monastery of Taktsang — perched 900 metres above the valley floor where Guru Rinpoche is said to have arrived on a flying tigress. Celebrate the descent with a traditional hot-stone bath at a village farmhouse.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Paro hotel",
        location: "Taktsang · 3,120 m",
      },
      {
        day: 7,
        title: "Farewell, Land of the Thunder Dragon",
        description:
          "One last butter tea at breakfast before your guide walks you to the departure gate with a khadar and an open invitation to return. On a clear morning, watch for sacred Jomolhari off the wingtip as you climb out of the valley.",
        meals: "Breakfast",
        stay: "—",
        location: "Paro International Airport",
        image: "/images/packages/custom-journey.jpg",
      },
    ],
    included: [
      "Licensed Bhutanese guide",
      "Accommodation with daily meals",
      "Private transport and drivers",
      "Festival access coordination",
      "Permits and logistics support",
    ],
    excluded: ["International flights", "Travel insurance", "Personal expenses"],
    faqs: [
      {
        question: "Are festival dates fixed?",
        answer: "Festival dates follow the lunar calendar and are confirmed each year in advance.",
      },
      {
        question: "Is the Tiger’s Nest trek required?",
        answer: "Optional alternatives are available for guests who prefer not to hike.",
      },
    ],
    keywords: ["Paro", "Tshechu", "festival", "Bhutan", "Tiger’s Nest"],
  },
  {
    slug: "thimphu-tshechu",
    category: "festival",
    title: "Thimphu Tshechu Festival",
    summary: "Celebrate Bhutan’s capital city festival with grand dances and urban culture.",
    description: "Experience Bhutan’s largest festival alongside Thimphu’s cultural highlights and crafts.",
    durationLabel: "6 Days / 5 Nights",
    durationDays: 6,
    region: "Western Bhutan",
    difficulty: "Easy",
    bestTime: "September–October",
    groupSize: "2–12 guests",
    comfortLevel: "Comfort",
    heroImage: "/images/packages/thimphu-tshechu.jpg",
    gallery: [
      "/bhutanese-crowd-festival-colorful-traditional-dres.jpg",
      "/thimphu-festival-bhutan-celebration-traditional-da.jpg",
      "/bhutan-festival-masked-dancers-colorful-costumes-c.jpg",
      ...fallbackGallery,
    ],
    highlights: ["Thimphu Tshechu ceremonies", "Buddha Dordenma", "Local artisan markets"],
    itinerary: [
      {
        day: 1,
        title: "Arrival & the Illuminated Fortress",
        description:
          "Land beneath Paro's forested ridges and drive the river road to the capital, pausing where three valleys' waters meet at Chuzom. This evening, see Tashichho Dzong — seat of King and government — glowing gold against the dark hillside.",
        meals: "Dinner",
        stay: "Thimphu hotel",
        location: "Thimphu · 2,320 m",
        image: "/images/itinerary/paro-arrival.jpg",
      },
      {
        day: 2,
        title: "Thimphu Tshechu — The Kingdom Gathers",
        description:
          "Bhutan's largest festival fills the Tendrel Thang grounds beside Tashichho Dzong with a sea of woven silk. Watch the great cham dances — the Lords of the Cremation Grounds, the Black Hats — as your guide unpacks the meaning behind every mask and gesture.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Thimphu hotel",
        location: "Tashichho Dzong festival grounds",
        image: "/images/packages/thimphu-tshechu.jpg",
      },
      {
        day: 3,
        title: "Festival Morning, Golden Buddha Afternoon",
        description:
          "Return for the morning's dances while the crowds are at their most vibrant, then climb to Buddha Dordenma for a valley-wide panorama from beneath the 51-metre gilded statue. End at the takin preserve and Zilukha nunnery, where prayer wheels spin above the city.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Thimphu hotel",
        location: "Thimphu · 2,320 m",
        image: "/bhutan-buddha-dordenma-giant-golden-statue-thimphu.jpg",
      },
      {
        day: 4,
        title: "Thirteen Arts & Market Colours",
        description:
          "Watch students master painting, sculpture, and embroidery at the National Institute for Zorig Chusum — the thirteen traditional arts — then smell fresh handmade paper being pressed at Jungshi mill. Finish among the chillies and butter tea churns of the weekend market, with a friendly round of archery, the national sport.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Thimphu hotel",
        location: "Thimphu · 2,320 m",
        image: "/images/itinerary/market.jpg",
      },
      {
        day: 5,
        title: "Dochula's 108 Chortens",
        description:
          "Drive to Dochula Pass for a horizon of 7,000-metre peaks rising behind 108 memorial chortens, with warm tea at the pass-top café. Return via 17th-century Simtokha Dzong — the kingdom's oldest — before a farewell dinner of ema datshi and red rice with traditional song.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Thimphu hotel",
        location: "Dochula Pass · 3,100 m",
        image: "/bhutan-dochula-pass-108-chortens-himalayan-mountain.jpg",
      },
      {
        day: 6,
        title: "Departure via Paro",
        description:
          "A gentle morning drive returns you to Paro for your flight. Your guide sends you off with a khadar scarf — and, on clear days, one last look at the Himalaya from the climb-out.",
        meals: "Breakfast",
        stay: "—",
        location: "Paro International Airport",
        image: "/images/packages/custom-journey.jpg",
      },
    ],
    included: ["Guided festival access", "Daily meals", "Private transport"],
    excluded: ["International flights", "Travel insurance"],
    faqs: [
      { question: "What should I wear?", answer: "Respectful attire with covered shoulders is recommended." },
    ],
    keywords: ["Thimphu", "festival", "Bhutan"],
  },
  {
    slug: "punakha-drubchen",
    category: "festival",
    title: "Punakha Drubchen & Tshechu",
    summary: "Double festival celebrations paired with Punakha’s riverside heritage.",
    description: "Witness historical reenactments and sacred dances in Bhutan’s former capital.",
    durationLabel: "8 Days / 7 Nights",
    durationDays: 8,
    region: "Western Bhutan",
    difficulty: "Easy",
    bestTime: "February–March",
    groupSize: "2–12 guests",
    comfortLevel: "Comfort",
    heroImage: "/images/packages/punakha-drubchen.jpg",
    gallery: [
      "/bhutan-punakha-dzong-fortress-river-valley-traditi.jpg",
      "/punakha-dzong-fortress-rivers-confluence-bhutan-re.jpg",
      "/punakha-dzong-fortress-mo-chhu-pho-chhu-rivers-con.jpg",
      ...fallbackGallery,
    ],
    highlights: ["Punakha Drubchen", "Punakha Dzong", "Dochula Pass"],
    itinerary: [
      {
        day: 1,
        title: "Welcome to the Kingdom",
        description:
          "Touch down beneath Paro's terraced hillsides and meet your guide with a khadar welcome. Stretch your legs on a gentle walk to 7th-century Kyichu Lhakhang, where oranges are said to fruit year-round in the temple courtyard.",
        meals: "Dinner",
        stay: "Paro hotel",
        location: "Paro · 2,250 m",
        image: "/images/itinerary/paro-arrival.jpg",
      },
      {
        day: 2,
        title: "Across Dochula to the Old Capital",
        description:
          "Climb to Dochula Pass, where 108 chortens face a wall of snow peaks, then drop through mossy rhododendron forest into Punakha's warm valley. Arrive at the fortress that crowned Bhutan's kings, standing where the Mother and Father rivers meet.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Punakha hotel",
        location: "Punakha · 1,250 m",
        image: "/bhutan-dochula-pass-108-chortens-himalayan-mountain.jpg",
      },
      {
        day: 3,
        title: "Drubchen — The Battle Remembered",
        description:
          "Inside Punakha Dzong's courtyards, costumed pazap warriors re-enact the 17th-century defence of Bhutan with war cries, drums, and swirling banners — a spectacle found nowhere else in the kingdom. Your guide narrates the history as it unfolds around you.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Punakha hotel",
        location: "Punakha Dzong",
        image: "/images/packages/punakha-drubchen.jpg",
      },
      {
        day: 4,
        title: "Tshechu — Masks in the Fortress",
        description:
          "The Drubchen flows into the Tshechu proper: masked cham dances turning the dzong's flagstone courtyard into a living mandala of colour and cymbal-crash. Sit among local families sharing zaw and butter tea as the dances teach compassion, judgement, and liberation.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Punakha hotel",
        location: "Punakha Dzong",
        image: "/images/packages/paro-tshechu.jpg",
      },
      {
        day: 5,
        title: "Rice Terraces & the Longest Bridge",
        description:
          "Hike through paddies to the hilltop Khamsum Yulley Namgyal chorten, built by the Queen Mothers, for a river-valley panorama. Cross Bhutan's longest suspension bridge — 160 metres of fluttering prayer flags above the Po Chhu — and drift back along the riverbank.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Punakha hotel",
        location: "Punakha Valley",
      },
      {
        day: 6,
        title: "The Divine Madman's Valley",
        description:
          "Walk across mustard fields to Chimi Lhakhang, temple of the beloved 'Divine Madman' Drukpa Kunley, where pilgrims still come for fertility blessings. Continue to the hillside village of Talo and the Sangchhen Dorji Lhuendrup nunnery, home to 120 nuns above the valley.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Punakha hotel",
        location: "Punakha Valley",
        image: "/images/itinerary/monks.jpg",
      },
      {
        day: 7,
        title: "Return West & the Tiger's Nest",
        description:
          "Recross Dochula in morning light and return to Paro for the kingdom's signature pilgrimage: the cliff-path climb to Taktsang, the Tiger's Nest, hanging 900 metres above the valley. Toast the journey with a farmhouse hot-stone bath and a farewell dinner.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Paro hotel",
        location: "Taktsang · 3,120 m",
        image: "/images/packages/cultural-heritage.jpg",
      },
      {
        day: 8,
        title: "Departure",
        description:
          "After breakfast, your guide accompanies you to Paro airport with a khadar farewell — and the promise that Bhutan always keeps a valley unexplored for your return.",
        meals: "Breakfast",
        stay: "—",
        location: "Paro International Airport",
        image: "/images/packages/custom-journey.jpg",
      },
    ],
    included: ["Festival viewing assistance", "Guide and driver"],
    excluded: ["International flights"],
    faqs: [
      { question: "Is this tour family-friendly?", answer: "Yes, the pace is relaxed and suitable for families." },
    ],
    keywords: ["Punakha", "festival", "drubchen"],
  },
  {
    slug: "jambay-lhakhang",
    category: "festival",
    title: "Jambay Lhakhang Festival",
    summary: "A mystical festival in Bumthang with fire ceremonies and sacred dances.",
    description: "Travel to central Bhutan for unique rituals and valley experiences.",
    durationLabel: "9 Days / 8 Nights",
    durationDays: 9,
    region: "Central Bhutan",
    difficulty: "Easy",
    bestTime: "October–November",
    groupSize: "2–10 guests",
    comfortLevel: "Comfort",
    heroImage: "/images/packages/jambay-lhakhang.jpg",
    gallery: [
      "/bhutan-bumthang-valley-ancient-temples-monasteries.jpg",
      "/bhutan-bumthang-farmhouse-countryside.jpg",
      "/bhutan-traditional-dress-gho-kira-people.jpg",
      ...fallbackGallery,
    ],
    highlights: ["Bumthang valleys", "Fire ceremony", "Ancient temples"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Paro",
        description:
          "Land amid Paro's willow-lined river flats and settle in with an easy acclimatising stroll through town — prayer wheels, painted facades, and your first taste of butter tea.",
        meals: "Dinner",
        stay: "Paro hotel",
        location: "Paro · 2,250 m",
        image: "/images/itinerary/paro-arrival.jpg",
      },
      {
        day: 2,
        title: "West to Punakha",
        description:
          "Cross Dochula Pass beneath fluttering prayer flags and 108 chortens, then descend into Punakha's banana-and-cactus warmth. Visit the great dzong at the river confluence and walk the fields to the Divine Madman's temple at Chimi Lhakhang.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Punakha hotel",
        location: "Punakha · 1,250 m",
        image: "/bhutan-dochula-pass-108-chortens-himalayan-mountain.jpg",
      },
      {
        day: 3,
        title: "Over the Black Mountains to Trongsa",
        description:
          "Journey east over Pele La, gateway to central Bhutan, past yak pastures and dwarf bamboo. Arrive at Trongsa Dzong — the largest fortress in the kingdom, coiled along its ridge above the Mangde river gorge, ancestral seat of Bhutan's monarchy.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Trongsa lodge",
        location: "Trongsa · 2,180 m",
      },
      {
        day: 4,
        title: "Into the Sacred Heartland",
        description:
          "Climb Yotong La and drop into the Chumey valley, famous for yathra — the vivid wool weaving of central Bhutan — before reaching Bumthang's wide, barley-gold valleys. Evening walk through Jakar town beneath its hilltop dzong, the 'Castle of the White Bird'.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Bumthang lodge",
        location: "Bumthang · 2,600 m",
        image: "/images/packages/jambay-lhakhang.jpg",
      },
      {
        day: 5,
        title: "Festival Eve & the Fire Blessing",
        description:
          "Explore 7th-century Jambay Lhakhang, one of Bhutan's two oldest temples, as pilgrims gather for the Drup. After dark, join the crowd streaming beneath a blazing gate of straw for the mewang fire blessing — an unforgettable, ember-lit night.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Bumthang lodge",
        location: "Jambay Lhakhang, Bumthang",
        image: "/images/packages/jambay-lhakhang.jpg",
      },
      {
        day: 6,
        title: "Festival Day & Guru's Rock",
        description:
          "Morning cham dances at the temple courtyard, ancient masks flashing against whitewashed walls. In the afternoon, visit Kurjey Lhakhang, where Guru Rinpoche left his body-print in solid rock, and Tamshing's 500-year-old murals across the river.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Bumthang lodge",
        location: "Bumthang · 2,600 m",
        image: "/images/packages/paro-tshechu.jpg",
      },
      {
        day: 7,
        title: "The Burning Lake & Valley Life",
        description:
          "Stand at Membartsho, the Burning Lake, where treasure-revealer Pema Lingpa dove in with a lit lamp and emerged with sacred relics — the lamp still burning. Round out the day with a farmhouse visit, Bumthang honey and cheese tasting, and time among the barley fields.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Bumthang lodge",
        location: "Tang Valley, Bumthang",
        image: "/images/packages/spiritual-journey.jpg",
      },
      {
        day: 8,
        title: "Return to Paro",
        description:
          "Fly or drive back west through the passes, watching the landscape shift from alpine heartland to Paro's terraced valley. Farewell dinner with a final round of ara and stories from the road.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Paro hotel",
        location: "Paro · 2,250 m",
        image: "/images/packages/western-highlights.jpg",
      },
      {
        day: 9,
        title: "Departure",
        description:
          "Your guide sees you off at Paro airport with a khadar scarf. The festival's fire, masks, and mountain valleys travel home with you.",
        meals: "Breakfast",
        stay: "—",
        location: "Paro International Airport",
        image: "/images/packages/custom-journey.jpg",
      },
    ],
    included: ["Guide services", "Transport"],
    excluded: ["International flights"],
    faqs: [{ question: "How do we reach Bumthang?", answer: "Domestic flight or scenic drive." }],
    keywords: ["Bumthang", "festival", "Jambay Lhakhang"],
  },
  {
    slug: "cultural-heritage",
    category: "cultural",
    title: "Cultural Heritage Explorer",
    summary: "Signature highlights of Paro, Thimphu, and Punakha in one classic journey.",
    description: "Discover Bhutan’s monasteries, dzongs, and living heritage with expert guides.",
    durationLabel: "5 Days / 4 Nights",
    durationDays: 5,
    region: "Western Bhutan",
    difficulty: "Moderate",
    bestTime: "March–May, Sep–Nov",
    groupSize: "2–15 guests",
    comfortLevel: "Comfort",
    heroImage: "/images/packages/cultural-heritage.jpg",
    gallery: [
      "/paro-dzong-rinpung-dzong-fortress-bhutan-real-phot.jpg",
      "/bhutan-traditional-colorful-dzong-fortress-archite.jpg",
      "/bhutan-traditional-colorful-dzong-architecture.jpg",
      ...fallbackGallery,
    ],
    highlights: ["Tiger’s Nest", "Thimphu monuments", "Punakha Dzong"],
    itinerary: [
      {
        day: 1,
        title: "Arrival & First Lights of Thimphu",
        description:
          "From Paro’s dramatic runway, follow the river road to the capital, pausing at the Chuzom confluence with its three styles of chorten. This evening, catch golden Buddha Dordenma lit against the hillside above the city.",
        meals: "Dinner",
        stay: "Thimphu hotel",
        location: "Thimphu · 2,320 m",
        image: "/images/itinerary/paro-arrival.jpg",
      },
      {
        day: 2,
        title: "Capital of Living Heritage",
        description:
          "Circle the Memorial Chorten with pilgrims at their morning rounds, watch the thirteen traditional arts being taught at Zorig Chusum, and meet the takin — Bhutan’s improbable national animal. End at Tashichho Dzong as the evening flag ceremony unfolds.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Thimphu hotel",
        location: "Thimphu · 2,320 m",
        image: "/bhutan-buddha-dordenma-giant-golden-statue-thimphu.jpg",
      },
      {
        day: 3,
        title: "Dochula’s Snow Peaks & the Great Dzong",
        description:
          "Crest Dochula Pass among 108 chortens with the high Himalaya spread across the horizon, then descend to Punakha Dzong, moored like a great ship where two rivers meet. Cross the medieval wooden bridge and walk the jacaranda-shaded courtyards that crowned Bhutan’s first kings.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Punakha hotel",
        location: "Punakha · 1,250 m",
        image: "/bhutan-dochula-pass-108-chortens-himalayan-mountain.jpg",
      },
      {
        day: 4,
        title: "Morning with the Divine Madman, Return to Paro",
        description:
          "Walk field paths to Chimi Lhakhang, the fertility temple of Bhutan’s most irreverent saint, then retrace the pass road to Paro. Evening at leisure among the town’s woodfront shops — or opt for a traditional hot-stone bath at a farmhouse.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Paro hotel",
        location: "Paro · 2,250 m",
        image: "/images/packages/western-highlights.jpg",
      },
      {
        day: 5,
        title: "Tiger’s Nest & Farewell",
        description:
          "Rise early for the pilgrimage that defines Bhutan: the forest climb to Taktsang monastery, clinging to its cliff 900 metres above the valley. Descend triumphant for a celebratory lunch before your guide bids you farewell at the airport — khadar in hand.",
        meals: "Breakfast, Lunch",
        stay: "—",
        location: "Taktsang · 3,120 m",
        image: "/images/packages/cultural-heritage.jpg",
      },
    ],
    included: ["Guided sightseeing", "Accommodation and meals", "Transport"],
    excluded: ["International flights", "Personal expenses"],
    faqs: [
      { question: "Is the hike mandatory?", answer: "Alternatives are available upon request." },
    ],
    keywords: ["Cultural", "Paro", "Thimphu", "Punakha"],
  },
  {
    slug: "spiritual-journey",
    category: "cultural",
    title: "Spiritual Journey",
    summary: "Meditation retreats, monasteries, and sacred heritage in Bhutan’s valleys.",
    description: "Connect with Bhutan’s Buddhist traditions through guided visits and reflection.",
    durationLabel: "7 Days / 6 Nights",
    durationDays: 7,
    region: "Western Bhutan",
    difficulty: "Easy",
    bestTime: "Year-round",
    groupSize: "2–12 guests",
    comfortLevel: "Premium",
    heroImage: "/images/packages/spiritual-journey.jpg",
    gallery: [
      "/bhutanese-buddhist-monks-meditation-prayer-hall-au.jpg",
      "/bhutan-buddhist-monks-prayer-ceremony-monastery.jpg",
      "/bhutan-phajoding-monastery-cliff-mountain-views.jpg",
      ...fallbackGallery,
    ],
    highlights: ["Monastery stays", "Meditation sessions", "Sacred sites"],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Setting Intention",
        description:
          "Arrive in Paro and settle into the valley's quiet rhythm. In the evening, meet your guide over tea to set an intention for the week, followed by a gentle introduction to Bhutanese Buddhist practice at the hotel altar room.",
        meals: "Dinner",
        stay: "Paro hotel",
        location: "Paro · 2,250 m",
        image: "/images/itinerary/paro-arrival.jpg",
      },
      {
        day: 2,
        title: "Dawn Prayers at Kyichu",
        description:
          "Join morning prayers at 7th-century Kyichu Lhakhang, one of 108 temples said to have been built in a single night to pin down a demoness. Learn to light butter lamps and turn prayer wheels the traditional way, then spend the afternoon with a monk discussing the dharma over tea.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Paro hotel",
        location: "Kyichu Lhakhang, Paro",
        image: "/images/itinerary/monks.jpg",
      },
      {
        day: 3,
        title: "Thimphu's Sacred Circuit",
        description:
          "Receive a protection-cord blessing at Changangkha Lhakhang, where Thimphu's newborns are traditionally presented, and visit the monastic school at Dechen Phodrang. A guided evening meditation session closes the day in stillness.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Thimphu hotel",
        location: "Thimphu · 2,320 m",
        image: "/images/packages/spiritual-journey.jpg",
      },
      {
        day: 4,
        title: "Over the Pass, Into the Warm Valley",
        description:
          "Pause among Dochula's 108 chortens for a walking meditation with the Himalaya on the horizon, then descend to Punakha. Walk the paddy fields to Chimi Lhakhang and end with quiet reflection on the banks of the Mo Chhu.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Punakha hotel",
        location: "Punakha · 1,250 m",
        image: "/bhutan-dochula-pass-108-chortens-himalayan-mountain.jpg",
      },
      {
        day: 5,
        title: "Chorten Sunrise & the Nunnery",
        description:
          "Climb through morning mist to the Khamsum Yulley Namgyal chorten as the valley wakes below. In the afternoon, sit with the nuns of Sangchhen Dorji Lhuendrup high above the valley, sharing their chants and their view.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Punakha hotel",
        location: "Punakha Valley",
        image: "/images/itinerary/monks.jpg",
      },
      {
        day: 6,
        title: "Pilgrimage to the Tiger's Nest",
        description:
          "Make the ascent to Taktsang as pilgrims have for centuries — through prayer-flag pines, past the waterfall chapel, to the monastery on the cliff where Guru Rinpoche meditated. Time is kept unhurried for practice in the shrine rooms before the descent.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Paro hotel",
        location: "Taktsang · 3,120 m",
        image: "/images/packages/cultural-heritage.jpg",
      },
      {
        day: 7,
        title: "Departure with a Blessing",
        description:
          "A final butter-lamp offering at breakfast light, a khadar from your guide, and the week's stillness packed carefully for the journey home.",
        meals: "Breakfast",
        stay: "—",
        location: "Paro International Airport",
        image: "/images/packages/custom-journey.jpg",
      },
    ],
    included: ["Guided cultural experiences", "Accommodation"],
    excluded: ["International flights"],
    faqs: [{ question: "Can beginners join?", answer: "Yes, the program is beginner-friendly." }],
    keywords: ["Spiritual", "Meditation", "Bhutan"],
  },
  {
    slug: "western-highlights",
    category: "cultural",
    title: "Western Bhutan Highlights",
    summary: "A balanced journey through Bhutan’s core cultural heartland.",
    description: "Cover Paro, Thimphu, and Punakha with curated experiences and scenic drives.",
    durationLabel: "6 Days / 5 Nights",
    durationDays: 6,
    region: "Western Bhutan",
    difficulty: "Easy",
    bestTime: "Year-round",
    groupSize: "2–15 guests",
    comfortLevel: "Comfort",
    heroImage: "/images/packages/western-highlights.jpg",
    gallery: [
      "/bhutan-dochula-pass-108-chortens-himalayan-mountain.jpg",
      "/tashichho-dzong-thimphu-bhutan-fortress-evening-li.jpg",
      "/bhutan-punakha-dzong-fortress-river-valley-traditi.jpg",
      ...fallbackGallery,
    ],
    highlights: ["Dochula Pass", "Dzongs and monasteries", "Local markets"],
    itinerary: [
      {
        day: 1,
        title: "Arrival & the Road to Thimphu",
        description:
          "Sweep down between Paro's ridgelines and follow the Wang Chhu to the capital. Evening orientation walk along Norzin Lam — the main street where traffic is still directed by white-gloved police, not lights.",
        meals: "Dinner",
        stay: "Thimphu hotel",
        location: "Thimphu · 2,320 m",
        image: "/images/itinerary/paro-arrival.jpg",
      },
      {
        day: 2,
        title: "Thimphu in a Day",
        description:
          "Buddha Dordenma's golden gaze, pilgrims circling the Memorial Chorten, the takin preserve, and the painting studios of Zorig Chusum — the capital distilled. Close at Tashichho Dzong as monks file out for evening prayers.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Thimphu hotel",
        location: "Thimphu · 2,320 m",
        image: "/bhutan-buddha-dordenma-giant-golden-statue-thimphu.jpg",
      },
      {
        day: 3,
        title: "The Pass of 108 Chortens",
        description:
          "Cross Dochula at 3,100 metres — on clear days the whole northern wall of Bhutan's Himalaya stands behind the chortens. Wind down into Punakha's subtropical valley to the kingdom's most storied fortress at the river confluence.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Punakha hotel",
        location: "Punakha · 1,250 m",
        image: "/bhutan-dochula-pass-108-chortens-himalayan-mountain.jpg",
      },
      {
        day: 4,
        title: "Bridges, Terraces & the Divine Madman",
        description:
          "Morning at Punakha Dzong and the prayer-flag-strung suspension bridge over the Po Chhu, then an easy walk through rice terraces to Chimi Lhakhang. Afternoon amble through Lobesa's farm stalls — chillies drying on every roof.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Punakha hotel",
        location: "Punakha Valley",
        image: "/images/packages/punakha-drubchen.jpg",
      },
      {
        day: 5,
        title: "Tiger's Nest & Farmhouse Farewell",
        description:
          "Return west to Paro and take on the classic climb to Taktsang monastery, suspended on its cliff face 900 metres above the valley. Celebrate with a hot-stone bath and a farmhouse dinner of ema datshi, red rice, and ara.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Paro hotel",
        location: "Taktsang · 3,120 m",
        image: "/images/packages/cultural-heritage.jpg",
      },
      {
        day: 6,
        title: "Departure",
        description:
          "Your guide walks you to the gate with a khadar and a standing invitation: western Bhutan is only the beginning.",
        meals: "Breakfast",
        stay: "—",
        location: "Paro International Airport",
        image: "/images/packages/custom-journey.jpg",
      },
    ],
    included: ["Guide", "Transport", "Meals"],
    excluded: ["International flights"],
    faqs: [{ question: "Can this be extended?", answer: "Yes, we can customize duration." }],
    keywords: ["Western Bhutan", "Cultural"],
  },
  {
    slug: "eastern-bhutan",
    category: "cultural",
    title: "Eastern Bhutan Discovery",
    summary: "Explore Bhutan’s remote eastern districts and village life.",
    description: "Discover lesser-visited valleys with authentic cultural encounters.",
    durationLabel: "10 Days / 9 Nights",
    durationDays: 10,
    region: "Eastern Bhutan",
    difficulty: "Moderate",
    bestTime: "Year-round",
    groupSize: "2–10 guests",
    comfortLevel: "Comfort",
    heroImage: "/images/packages/eastern-bhutan.jpg",
    gallery: [
      "/eastern-bhutan-mongar-dzong-mountain-fortress.jpg",
      "/bhutan-eastern-trashigang-traditional-weaving-wome.jpg",
      "/bhutan-thimphu-traditional-farmhouse-mountains.jpg",
      ...fallbackGallery,
    ],
    highlights: ["Trashigang", "Village stays", "Handicraft centers"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Paro",
        description:
          "Land in the western valley and ease in with a riverside walk and an evening briefing on the long road east — one of the Himalaya's great overland journeys.",
        meals: "Dinner",
        stay: "Paro hotel",
        location: "Paro · 2,250 m",
        image: "/images/itinerary/paro-arrival.jpg",
      },
      {
        day: 2,
        title: "Thimphu to Punakha",
        description:
          "A morning taste of the capital — Buddha Dordenma and the Memorial Chorten — then over Dochula's chorten-crowned pass to Punakha's warm valley and its great fortress at the river confluence.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Punakha hotel",
        location: "Punakha · 1,250 m",
        image: "/bhutan-dochula-pass-108-chortens-himalayan-mountain.jpg",
      },
      {
        day: 3,
        title: "Over the Black Mountains",
        description:
          "Climb Pele La into yak country and follow the Mangde gorge to Trongsa, where the kingdom's largest dzong coils along its ridge. Every King of Bhutan has first served as Trongsa Penlop — this fortress is where the monarchy begins.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Trongsa lodge",
        location: "Trongsa · 2,180 m",
        image: "/images/packages/eastern-bhutan.jpg",
      },
      {
        day: 4,
        title: "Bumthang, the Sacred Heartland",
        description:
          "Cross Yotong La to the weaving villages of Chumey and into Bumthang's four valleys. Visit Jambay Lhakhang — 7th century — and Kurjey, where Guru Rinpoche's body-print remains in the rock.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Bumthang lodge",
        location: "Bumthang · 2,600 m",
        image: "/images/packages/jambay-lhakhang.jpg",
      },
      {
        day: 5,
        title: "Valley of Saints & Farmsteads",
        description:
          "Morning at Membartsho, the Burning Lake of treasure-revealer Pema Lingpa, then an afternoon of Bumthang life: buckwheat fields, Swiss-style cheese, honey tasting, and a farmhouse visit under prayer-flag ridgelines.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Bumthang lodge",
        location: "Tang Valley, Bumthang",
        image: "/images/packages/spiritual-journey.jpg",
      },
      {
        day: 6,
        title: "Thrumshing La — Into the East",
        description:
          "Cross the kingdom's great eastern divide at Thrumshing La (3,750 m) and descend three vertical kilometres through fir forest, waterfalls, and cliff-cut switchbacks to Mongar. Few roads on earth pack in this much landscape in a single day.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Mongar lodge",
        location: "Mongar · 1,600 m",
        image: "/images/packages/eastern-bhutan.jpg",
      },
      {
        day: 7,
        title: "Mongar to Trashigang",
        description:
          "Wind over Kori La to Trashigang, the bustling hub of the far east, stopping at Drametse Lhakhang — birthplace of the famous drum dance inscribed by UNESCO. Evening in Trashigang's amphitheatre of hills, where the pace of travel finally slows.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Trashigang lodge",
        location: "Trashigang · 1,150 m",
        image: "/images/packages/eastern-bhutan.jpg",
      },
      {
        day: 8,
        title: "Weavers of the East",
        description:
          "Day trip to Radhi, the 'rice bowl of the east', where women weave raw-silk bura on backstrap looms in nearly every house. Visit sacred Gom Kora, where Guru Rinpoche subdued a demon, and share butter tea in a village home.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Trashigang lodge",
        location: "Radhi Village · Trashigang",
        image: "/images/itinerary/market.jpg",
      },
      {
        day: 9,
        title: "Trashiyangtse & the Great Chorten",
        description:
          "Continue to Trashiyangtse, home of Bhutan's wooden-bowl turners, and stand before Chorten Kora — the great white stupa modelled on Nepal's Boudhanath, ringed by pilgrims from both sides of the border.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Trashigang lodge",
        location: "Trashiyangtse · 1,750 m",
        image: "/images/packages/spiritual-journey.jpg",
      },
      {
        day: 10,
        title: "Departure via the Southern Road",
        description:
          "Descend through tea-warm foothills to Samdrup Jongkhar and the Indian border crossing for onward connections via Guwahati — completing a full traverse of the kingdom, west to east.",
        meals: "Breakfast",
        stay: "—",
        location: "Samdrup Jongkhar border",
        image: "/images/packages/custom-journey.jpg",
      },
    ],
    included: ["Guide", "Transport"],
    excluded: ["International flights"],
    faqs: [{ question: "Is travel time longer?", answer: "Yes, but scenery is rewarding." }],
    keywords: ["Eastern Bhutan", "Culture"],
  },
  {
    slug: "druk-path-trek",
    category: "trekking",
    title: "Druk Path Trek",
    summary: "A classic high-altitude trek between Paro and Thimphu.",
    description: "Traverse alpine lakes, mountain passes, and camping sites with expert guides.",
    durationLabel: "8 Days / 7 Nights",
    durationDays: 8,
    region: "Western Bhutan",
    difficulty: "Moderate",
    bestTime: "April–June, Sep–Oct",
    groupSize: "4–12 guests",
    comfortLevel: "Premium",
    heroImage: "/images/packages/druk-path-trek.jpg",
    gallery: [
      "/bhutan-druk-path-trek-jimilang-lake-pristine-alpin.jpg",
      "/bhutan-druk-path-trek-himalayan-mountains-alpine-l.jpg",
      "/bhutan-high-altitude-trekking-camp-tents-mountain-.jpg",
      ...fallbackGallery,
    ],
    highlights: ["Alpine lakes", "High passes", "Camps under stars"],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Gear Check",
        description:
          "Land in Paro and meet your trekking crew — guide, cook, and horsemen. Afternoon gear check and a leg-stretching walk to Paro's cantilever bridge, with carb-loading done the Bhutanese way: red rice and ema datshi.",
        meals: "Dinner",
        stay: "Paro hotel",
        location: "Paro · 2,250 m",
        image: "/images/itinerary/paro-arrival.jpg",
      },
      {
        day: 2,
        title: "Acclimatisation: Tiger's Nest",
        description:
          "Warm up your lungs on the classic climb to Taktsang monastery at 3,120 metres — the perfect acclimatiser, with a cliff-hung reward at the top and a farmhouse hot-stone bath afterwards.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Paro hotel",
        location: "Taktsang · 3,120 m",
        image: "/images/packages/cultural-heritage.jpg",
      },
      {
        day: 3,
        title: "Trailhead to Jele Dzong",
        description:
          "The trek begins above Paro: a steady climb through blue pine and fir to the tiny ridge-top fortress of Jele Dzong. From camp, Paro valley spreads out below and, weather willing, Jomolhari crowns the horizon.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Camp",
        location: "Jele Dzong · 3,480 m",
        image: "/images/packages/druk-path-trek.jpg",
      },
      {
        day: 4,
        title: "Ridgelines to Jangchulakha",
        description:
          "Walk high ridgelines through rhododendron and juniper, sharing the trail with yak herders moving between pastures. Camp on alpine meadow with the whole western Himalaya for a backdrop.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Camp",
        location: "Jangchulakha · 3,770 m",
        image: "/images/packages/jomolhari-trek.jpg",
      },
      {
        day: 5,
        title: "Jimilang Tsho — the Sacred Lake",
        description:
          "Descend to the shore of Jimilang Tsho, a dark glacial lake famous for giant golden trout and the legends that guard it. An afternoon at the waterline: mist, prayer flags, and absolute quiet.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Lakeside camp",
        location: "Jimilang Tsho · 3,870 m",
        image: "/images/packages/druk-path-trek.jpg",
      },
      {
        day: 6,
        title: "High Point: Simkotra Tsho",
        description:
          "Traverse dwarf rhododendron slopes past a string of alpine lakes to Simkotra Tsho, the trek's highest camp. Sunset here turns the whole sky and lake the colour of hammered copper.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Lakeside camp",
        location: "Simkotra Tsho · 4,110 m",
        image: "/images/packages/dagala-thousand-lakes.jpg",
      },
      {
        day: 7,
        title: "Phajoding & the Descent to Thimphu",
        description:
          "On a clear morning, Gangkar Puensum — the world's highest unclimbed mountain — lines up along the skyline. Descend past the cliffside monastery of Phajoding and down through blue pine to Thimphu, where a hot shower and a celebration dinner await.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Thimphu hotel",
        location: "Thimphu · 2,320 m",
        image: "/images/packages/snowman-trek.jpg",
      },
      {
        day: 8,
        title: "Departure",
        description:
          "Transfer to Paro for your flight out — legs tired, camera full, and the Druk Path's lakes still glinting somewhere behind you.",
        meals: "Breakfast",
        stay: "—",
        location: "Paro International Airport",
        image: "/images/packages/custom-journey.jpg",
      },
    ],
    included: ["Trekking crew", "Camping gear", "Meals"],
    excluded: ["International flights"],
    faqs: [{ question: "Is prior trekking experience required?", answer: "Moderate fitness is recommended." }],
    keywords: ["Trekking", "Druk Path"],
  },
  {
    slug: "jomolhari-trek",
    category: "trekking",
    title: "Jomolhari Base Camp Trek",
    summary: "A challenging trek to the base of sacred Mt. Jomolhari.",
    description: "High-altitude trails with stunning Himalayan panoramas.",
    durationLabel: "11 Days / 10 Nights",
    durationDays: 11,
    region: "Western Bhutan",
    difficulty: "Challenging",
    bestTime: "April–June, Sep–Oct",
    groupSize: "4–10 guests",
    comfortLevel: "Premium",
    heroImage: "/images/packages/jomolhari-trek.jpg",
    gallery: [
      "/jomolhari-mountain-peak-7326m-sacred-snow-summit-b.jpg",
      "/bhutan-high-altitude-trekking-camp-tents-mountain-.jpg",
      "/bhutan-himalayan-mountain-landscape-kingdom-thunde.jpg",
      ...fallbackGallery,
    ],
    highlights: ["Mt. Jomolhari views", "High passes", "Nomadic camps"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Paro",
        description:
          "Meet your expedition crew and run through gear and route briefing. Evening walk through Paro town to loosen travel legs before the mountains begin.",
        meals: "Dinner",
        stay: "Paro hotel",
        location: "Paro · 2,250 m",
        image: "/images/itinerary/paro-arrival.jpg",
      },
      {
        day: 2,
        title: "Acclimatisation: Tiger's Nest",
        description:
          "Climb to Taktsang monastery at 3,120 metres — sacred, spectacular, and the ideal altitude primer for the days ahead.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Paro hotel",
        location: "Taktsang · 3,120 m",
        image: "/images/packages/cultural-heritage.jpg",
      },
      {
        day: 3,
        title: "Trek Start: Up the Paro Chhu",
        description:
          "Drive to the army post at Gunitsawa and walk into the Jigme Dorji National Park, following the Paro river through farmland and forest to your first camp at Shana.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Camp",
        location: "Shana · 2,850 m",
        image: "/images/packages/druk-path-trek.jpg",
      },
      {
        day: 4,
        title: "Deep Forest to Thangthangkha",
        description:
          "A long, wild day up the narrowing valley — mossy oak and birch, riverside boulders, the odd langur troop — climbing steadily to a clearing camp where, on a clear evening, Jomolhari makes its first appearance.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Camp",
        location: "Thangthangkha · 3,610 m",
        image: "/images/packages/jomolhari-trek.jpg",
      },
      {
        day: 5,
        title: "Above the Treeline to Jangothang",
        description:
          "The forest gives way to yak pasture and stone herder huts as you enter the high country. Camp at legendary Jangothang beneath the sheer 2,000-metre face of Jomolhari — one of the great basecamp views of the Himalaya.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Base camp",
        location: "Jangothang · 4,080 m",
        image: "/images/packages/jomolhari-trek.jpg",
      },
      {
        day: 6,
        title: "Rest Day: the Twin Lakes",
        description:
          "Acclimatisation day at Jangothang with an optional hike to the twin lakes of Tsho Phu, where blue sheep graze the slopes and Jichu Drake's ice pyramid fills the skyline. Afternoon tea with a yak-herding family.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Base camp",
        location: "Tsho Phu Lakes · 4,380 m",
        image: "/images/packages/dagala-thousand-lakes.jpg",
      },
      {
        day: 7,
        title: "Nyile La Pass to Lingshi",
        description:
          "Cross your first great pass, Nyile La at 4,870 metres, prayer flags snapping in the wind between Jomolhari and Tserim Kang. Descend to camp below Lingshi Dzong, a lone white fortress standing sentinel over the highlands.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Camp",
        location: "Lingshi · 4,010 m",
        image: "/images/packages/snowman-trek.jpg",
      },
      {
        day: 8,
        title: "Yeli La — the Trek's High Point",
        description:
          "A big day over Yeli La at 4,930 metres — the roof of the route — before dropping to a riverside camp at Shodu, where a chorten marks the halfway blessing home.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Camp",
        location: "Shodu · 4,080 m",
        image: "/images/packages/snowman-trek.jpg",
      },
      {
        day: 9,
        title: "The Thimphu Chhu Gorge",
        description:
          "Follow the young Thimphu river through a dramatic gorge of waterfalls and rock walls, climbing to the ruined dzong at Barshong for your final mountain camp.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Camp",
        location: "Barshong · 3,710 m",
        image: "/images/packages/druk-path-trek.jpg",
      },
      {
        day: 10,
        title: "Trail's End & the Return to Comfort",
        description:
          "Descend through bamboo and rhododendron to the roadhead at Dolam Kencho and drive to Thimphu for the sweetest shower of the trip, a celebration dinner, and a well-earned soft bed.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Thimphu hotel",
        location: "Thimphu · 2,320 m",
        image: "/images/packages/western-highlights.jpg",
      },
      {
        day: 11,
        title: "Departure",
        description:
          "Transfer to Paro for departure. Eleven days, one sacred mountain, and a trail few travelers on earth will ever walk.",
        meals: "Breakfast",
        stay: "—",
        location: "Paro International Airport",
        image: "/images/packages/custom-journey.jpg",
      },
    ],
    included: ["Crew and equipment", "Camping meals"],
    excluded: ["International flights"],
    faqs: [{ question: "Is altitude support provided?", answer: "Yes, acclimatization days are included." }],
    keywords: ["Jomolhari", "Trek"],
  },
  {
    slug: "snowman-trek",
    category: "trekking",
    title: "Snowman Trek",
    summary: "One of the world’s most demanding Himalayan treks.",
    description: "Extreme high-altitude expedition across remote passes.",
    durationLabel: "25 Days / 24 Nights",
    durationDays: 25,
    region: "Northern Bhutan",
    difficulty: "Extreme",
    bestTime: "Sep–Oct",
    groupSize: "4–10 guests",
    comfortLevel: "Luxury",
    heroImage: "/images/packages/snowman-trek.jpg",
    gallery: [
      "/bhutan-snowman-trek-high-pass-5000m-extreme-condit.jpg",
      "/bhutan-lunana-region-remote-village-yak-herders-ex.jpg",
      "/himalayan-trekking-adventure-mountain-landscape-bh.jpg",
      ...fallbackGallery,
    ],
    highlights: ["11 high passes", "Remote valleys", "Cultural wilderness"],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Expedition Briefing",
        description:
          "Meet the full expedition team in Paro — guides, cooks, horsemen — for gear checks and the route briefing for one of the world's hardest treks.",
        meals: "Dinner",
        stay: "Paro hotel",
        location: "Paro · 2,250 m",
        image: "/images/itinerary/paro-arrival.jpg",
      },
      {
        day: 2,
        title: "Acclimatisation: Tiger's Nest",
        description:
          "Prime your lungs on the climb to cliff-hung Taktsang monastery, then rest: the next three weeks belong to the high Himalaya.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Paro hotel",
        location: "Taktsang · 3,120 m",
        image: "/images/packages/cultural-heritage.jpg",
      },
      {
        day: 3,
        title: "Trek Start: Shana",
        description:
          "Enter Jigme Dorji National Park at Gunitsawa and follow the Paro Chhu through farmland and forest to first camp.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Camp",
        location: "Shana · 2,850 m",
        image: "/images/packages/druk-path-trek.jpg",
      },
      {
        day: 4,
        title: "Thangthangkha",
        description:
          "A long forest day up the narrowing river valley, with Jomolhari revealing itself above camp at dusk.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Camp",
        location: "Thangthangkha · 3,610 m",
        image: "/images/packages/jomolhari-trek.jpg",
      },
      {
        day: 5,
        title: "Jangothang Base Camp",
        description:
          "Climb past yak herder settlements into open high country, camping beneath Jomolhari's colossal 2,000-metre face.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Base camp",
        location: "Jangothang · 4,080 m",
        image: "/images/packages/jomolhari-trek.jpg",
      },
      {
        day: 6,
        title: "Acclimatisation at Jangothang",
        description:
          "Rest day with a hike to the Tsho Phu twin lakes — blue sheep on the slopes, Jichu Drake overhead — banking altitude for the passes ahead.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Base camp",
        location: "Tsho Phu Lakes · 4,380 m",
        image: "/images/packages/dagala-thousand-lakes.jpg",
      },
      {
        day: 7,
        title: "Nyile La to Lingshi",
        description:
          "Over Nyile La (4,870 m) between Jomolhari and Tserim Kang, descending to camp below the lonely white fortress of Lingshi Dzong.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Camp",
        location: "Lingshi · 4,010 m",
        image: "/images/packages/snowman-trek.jpg",
      },
      {
        day: 8,
        title: "Chebisa Village",
        description:
          "A gentler day to the storybook village of Chebisa, its stone houses clustered beneath a hidden waterfall — the highland Bhutan few ever see.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Camp",
        location: "Chebisa · 3,880 m",
        image: "/images/packages/eastern-bhutan.jpg",
      },
      {
        day: 9,
        title: "Gobu La to Shomuthang",
        description:
          "Climb through yak pastures over Gobu La (4,440 m), watching for blue sheep and bearded vultures, to a riverside camp at Shomuthang.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Camp",
        location: "Shomuthang · 4,220 m",
        image: "/images/packages/dagala-thousand-lakes.jpg",
      },
      {
        day: 10,
        title: "Jhari La to Robluthang",
        description:
          "Cross Jhari La (4,750 m) into the glacial Tsharijathang valley — summer haunt of the takin herds — and camp at Robluthang.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Camp",
        location: "Robluthang · 4,160 m",
        image: "/images/packages/jomolhari-trek.jpg",
      },
      {
        day: 11,
        title: "Sinche La to Limithang",
        description:
          "The route's first 5,000er: Sinche La at 5,005 metres, prayer-flagged and windswept, then down past moraine lakes to camp under Gangchenta, the Great Tiger Mountain.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Camp",
        location: "Limithang · 4,140 m",
        image: "/images/packages/snowman-trek.jpg",
      },
      {
        day: 12,
        title: "Into Laya",
        description:
          "Descend through mossy forest to Laya, Bhutan's highest village, where women wear conical bamboo hats and turquoise-braided hair found nowhere else in the kingdom.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Camp",
        location: "Laya · 3,840 m",
        image: "/images/packages/eastern-bhutan.jpg",
      },
      {
        day: 13,
        title: "Rest Day in Laya",
        description:
          "A day among the Layap people — butter tea in stone kitchens, yak wool spinning, and the village's easy rhythm at 3,800 metres. Resupply before the remote Lunana leg.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Camp",
        location: "Laya · 3,840 m",
        image: "/images/itinerary/market.jpg",
      },
      {
        day: 14,
        title: "Rodophu",
        description:
          "Leave the last village behind, climbing steadily through rhododendron to a hanging valley camp at Rodophu — the gateway to Lunana.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Camp",
        location: "Rodophu · 4,160 m",
        image: "/images/packages/druk-path-trek.jpg",
      },
      {
        day: 15,
        title: "Narethang",
        description:
          "A short, high day over Tsimo La (4,700 m) to camp on the barren shoulder of Narethang beneath the peak of Gangla Karchung.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "High camp",
        location: "Narethang · 4,900 m",
        image: "/images/packages/snowman-trek.jpg",
      },
      {
        day: 16,
        title: "Gangla Karchung La to Tarina",
        description:
          "Cross Gangla Karchung La (5,120 m) above a chain of turquoise glacial lakes — one of the finest views in the Himalaya — then make the knee-testing descent into the Tarina valley.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Camp",
        location: "Tarina · 3,970 m",
        image: "/images/packages/dagala-thousand-lakes.jpg",
      },
      {
        day: 17,
        title: "Woche — First Village of Lunana",
        description:
          "Follow the Tang Chhu past waterfalls to Woche, a huddle of stone houses and barley fields that marks your arrival in Lunana — the most remote inhabited region in Bhutan.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Camp",
        location: "Woche · 3,910 m",
        image: "/images/packages/eastern-bhutan.jpg",
      },
      {
        day: 18,
        title: "Keche La to Lhedi",
        description:
          "Over Keche La (4,650 m) with glacier snouts hanging above the trail, descending to the riverside settlement of Lhedi under the ramparts of Table Mountain.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Camp",
        location: "Lhedi · 3,700 m",
        image: "/images/packages/jomolhari-trek.jpg",
      },
      {
        day: 19,
        title: "Thanza",
        description:
          "Walk the wide glacial valley to Thanza, Lunana's chief village, backed by the 3,000-metre wall of Zongophu Gang. You are now further from a road than almost anywhere on earth.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Camp",
        location: "Thanza · 4,180 m",
        image: "/images/packages/snowman-trek.jpg",
      },
      {
        day: 20,
        title: "Rest Day in Thanza",
        description:
          "Rest and resupply among the yak herders of Thanza while fresh horses are arranged for the final passes. Optional walk to the glacial lake moraines above the village.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Camp",
        location: "Thanza · 4,180 m",
        image: "/images/packages/dagala-thousand-lakes.jpg",
      },
      {
        day: 21,
        title: "Jaze La to Tshochena",
        description:
          "Begin the southern exit over Jaze La (5,150 m), camping between snow peaks at the turquoise lake of Tshochena.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "High camp",
        location: "Tshochena · 4,970 m",
        image: "/images/packages/snowman-trek.jpg",
      },
      {
        day: 22,
        title: "Loju La to Jichu Dramo",
        description:
          "A rolling high-altitude day across Loju La (5,140 m) to a wild camp at Jichu Dramo, deep in a landscape of rock, ice, and sky.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "High camp",
        location: "Jichu Dramo · 5,050 m",
        image: "/images/packages/snowman-trek.jpg",
      },
      {
        day: 23,
        title: "Rinchen Zoe La — the Final Giant",
        description:
          "Cross Rinchen Zoe La at 5,326 metres, the highest point of the entire trek, with Gangkar Puensum — the world's highest unclimbed mountain — filling the northern horizon. Descend to camp at Chukarpo.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Camp",
        location: "Chukarpo · 4,600 m",
        image: "/images/packages/snowman-trek.jpg",
      },
      {
        day: 24,
        title: "Thampe Tsho",
        description:
          "Drop below the treeline for the first time in ten days, camping at the sacred trout-filled lake of Thampe Tsho beneath the route's last small pass.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Lakeside camp",
        location: "Thampe Tsho · 4,300 m",
        image: "/images/packages/druk-path-trek.jpg",
      },
      {
        day: 25,
        title: "Trek's End at Sephu & Celebration",
        description:
          "Over Thampe La and down through bamboo forest to the roadhead at Sephu on the lateral highway — 25 days, 11 passes, and one of mountaineering's proudest walking achievements complete. Drive to Thimphu for a celebration dinner and transfer onward to Paro.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Thimphu hotel",
        location: "Sephu → Thimphu",
        image: "/images/packages/custom-journey.jpg",
      },
    ],
    included: ["Full expedition support", "Camping logistics"],
    excluded: ["International flights"],
    faqs: [{ question: "Who is this trek for?", answer: "Experienced trekkers only." }],
    keywords: ["Snowman", "Extreme trek"],
  },
  {
    slug: "dagala-thousand-lakes",
    category: "trekking",
    title: "Dagala Thousand Lakes Trek",
    summary: "Moderate trek through alpine lakes and rhododendron forests.",
    description: "A scenic trekking circuit with stunning lake views.",
    durationLabel: "9 Days / 8 Nights",
    durationDays: 9,
    region: "Western Bhutan",
    difficulty: "Moderate",
    bestTime: "April–June, Sep–Oct",
    groupSize: "4–12 guests",
    comfortLevel: "Premium",
    heroImage: "/images/packages/dagala-thousand-lakes.jpg",
    gallery: [
      "/bhutan-himalayan-mountain-landscape-kingdom-thunde.jpg",
      "/bhutan-himalayan-mountains-prayer-flags-temple-scenic.jpg",
      "/bhutan-prayer-flags-mountain-landscape.jpg",
      ...fallbackGallery,
    ],
    highlights: ["Glacial lakes", "Wildlife spotting", "Mountain panoramas"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Paro",
        description:
          "Meet your trekking crew and check gear, then wander Paro's painted main street to shake off the flight.",
        meals: "Dinner",
        stay: "Paro hotel",
        location: "Paro · 2,250 m",
        image: "/images/itinerary/paro-arrival.jpg",
      },
      {
        day: 2,
        title: "Acclimatisation: Tiger's Nest",
        description:
          "Climb to Taktsang monastery — 900 metres of forest switchbacks to the cliff-face shrine — the ideal warm-up at altitude before the trail proper.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Paro hotel",
        location: "Taktsang · 3,120 m",
        image: "/images/packages/cultural-heritage.jpg",
      },
      {
        day: 3,
        title: "Genekha to Gur",
        description:
          "Drive to the trailhead at Genekha village and climb through oak and rhododendron to a meadow camp at Gur, where the herders' fires scent the evening air.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Camp",
        location: "Gur · 3,290 m",
        image: "/images/packages/druk-path-trek.jpg",
      },
      {
        day: 4,
        title: "Pagalabtsa Pass to Labatama",
        description:
          "Crest the ridge at Pagalabtsa La for your first sweep of the Dagala range, then contour into the high basin of Labatama, surrounded by grazing yaks and granite domes.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Camp",
        location: "Labatama · 4,300 m",
        image: "/images/packages/dagala-thousand-lakes.jpg",
      },
      {
        day: 5,
        title: "Day of a Thousand Lakes",
        description:
          "A full day exploring the lake basin — Utsho, Relitsho, and their sister tarns — where golden trout flash in impossibly clear water and, on a windless morning, the Himalaya reflects from Kanchenjunga to Jomolhari.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Camp",
        location: "Utsho Lake · 4,380 m",
        image: "/images/packages/dagala-thousand-lakes.jpg",
      },
      {
        day: 6,
        title: "Lake-Hopping to Panka",
        description:
          "Traverse past a rosary of alpine lakes and over three small saddles to camp at Panka, watching for blood pheasant and Himalayan monal in the scrub.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Camp",
        location: "Panka · 4,000 m",
        image: "/images/packages/druk-path-trek.jpg",
      },
      {
        day: 7,
        title: "Talakha Monastery & the Descent",
        description:
          "Climb the final pass and descend to the little monastery of Talakha, its terrace overlooking the whole Thimphu valley. Continue down to the road and into the capital for a hot shower and celebration dinner.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Thimphu hotel",
        location: "Talakha · 3,080 m",
        image: "/images/packages/spiritual-journey.jpg",
      },
      {
        day: 8,
        title: "Thimphu at Leisure",
        description:
          "A gentle recovery day: Buddha Dordenma, the weekend market, and craft shopping for yathra weaves and incense. Evening drive to Paro for a farewell farmhouse dinner.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Paro hotel",
        location: "Thimphu & Paro",
        image: "/bhutan-buddha-dordenma-giant-golden-statue-thimphu.jpg",
      },
      {
        day: 9,
        title: "Departure",
        description:
          "Fly out over the ridges you walked — the thousand lakes hidden somewhere below the wing.",
        meals: "Breakfast",
        stay: "—",
        location: "Paro International Airport",
        image: "/images/packages/custom-journey.jpg",
      },
    ],
    included: ["Trekking support crew", "Meals"],
    excluded: ["International flights"],
    faqs: [{ question: "Is this trek family-friendly?", answer: "Suitable for fit teens and adults." }],
    keywords: ["Dagala", "Lakes trek"],
  },
  {
    slug: "luxury-bhutan",
    category: "luxury",
    title: "Luxury Bhutan Experience",
    summary: "Five-star stays, private guiding, and curated cultural access.",
    description: "Enjoy Bhutan’s finest lodges with bespoke itineraries and wellness touches.",
    durationLabel: "7 Days / 6 Nights",
    durationDays: 7,
    region: "Western Bhutan",
    difficulty: "Easy",
    bestTime: "Year-round",
    groupSize: "2–8 guests",
    comfortLevel: "Luxury",
    heroImage: "/images/packages/luxury-bhutan.jpg",
    gallery: [
      "/luxury-resort-bhutan-mountains-five-star-hotel-spa.jpg",
      "/bhutan-paro-taktsang-monastery-tiger-nest-mountain.jpg",
      "/bhutan-haa-valley-traditional-stone-house.jpg",
      ...fallbackGallery,
    ],
    highlights: ["Luxury lodges", "Private guide", "Wellness experiences"],
    itinerary: [
      {
        day: 1,
        title: "A Private Welcome",
        description:
          "Expedited arrival formalities, a khadar welcome, and a chauffeured transfer to your five-star lodge above the Paro valley. Settle in with a welcome spa ritual and dinner by the fireplace with the valley lights below.",
        meals: "Dinner",
        stay: "Luxury lodge, Paro",
        location: "Paro · 2,250 m",
        image: "/images/packages/luxury-bhutan.jpg",
      },
      {
        day: 2,
        title: "Thimphu, Privately Curated",
        description:
          "A private day in the capital: a monk-led blessing ceremony arranged just for you, Buddha Dordenma before the crowds, and studio visits with master gold- and silversmiths. Lunch is a chef's table of refined Bhutanese flavours.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Luxury lodge, Thimphu",
        location: "Thimphu · 2,320 m",
        image: "/bhutan-buddha-dordenma-giant-golden-statue-thimphu.jpg",
      },
      {
        day: 3,
        title: "Champagne Sunrise at Dochula",
        description:
          "A private breakfast set among the 108 chortens of Dochula Pass, the high Himalaya for a backdrop. Descend to Punakha's warm valley and your riverside lodge, with an afternoon massage or a gentle rice-terrace stroll.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Luxury lodge, Punakha",
        location: "Dochula Pass · 3,100 m",
        image: "/bhutan-dochula-pass-108-chortens-himalayan-mountain.jpg",
      },
      {
        day: 4,
        title: "The Fortress & a Riverside Picnic",
        description:
          "Tour Punakha Dzong with your private guide before the day-visitors arrive, then cross the prayer-flag suspension bridge to a white-linen picnic on the banks of the Mo Chhu. Evening farmhouse dinner hosted by a local family — their table, your toast.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Luxury lodge, Punakha",
        location: "Punakha · 1,250 m",
        image: "/images/packages/punakha-drubchen.jpg",
      },
      {
        day: 5,
        title: "Return to Paro, Slowly",
        description:
          "A leisurely return west with stops entirely at your pace. Afternoon in the lodge spa — signature hot-stone bath drawn with river stones and artemisia — before a five-course Bhutanese degustation.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Luxury lodge, Paro",
        location: "Paro · 2,250 m",
        image: "/images/packages/luxury-wellness.jpg",
      },
      {
        day: 6,
        title: "Tiger's Nest in Style",
        description:
          "Take the kingdom's most famous trail with your private guide, ponies on standby, and a reserved table at the Taktsang terrace café facing the monastery. Descend to a candlelit farewell dinner at the lodge.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Luxury lodge, Paro",
        location: "Taktsang · 3,120 m",
        image: "/images/packages/cultural-heritage.jpg",
      },
      {
        day: 7,
        title: "Farewell",
        description:
          "A final valley-view breakfast, then a chauffeured transfer and lounge-side farewell at Paro airport. Bhutan, distilled to its most gracious.",
        meals: "Breakfast",
        stay: "—",
        location: "Paro International Airport",
        image: "/images/packages/custom-journey.jpg",
      },
    ],
    included: ["Luxury accommodation", "Private guide"],
    excluded: ["International flights"],
    faqs: [{ question: "Can this be customized?", answer: "Yes, fully bespoke." }],
    keywords: ["Luxury", "Bhutan"],
  },
  {
    slug: "luxury-wellness",
    category: "luxury",
    title: "Wellness & Rejuvenation Retreat",
    summary: "Holistic wellness with yoga, spa treatments, and mindful experiences.",
    description: "Reset in Bhutan’s tranquil valleys with tailored wellness programming.",
    durationLabel: "6 Days / 5 Nights",
    durationDays: 6,
    region: "Western Bhutan",
    difficulty: "Easy",
    bestTime: "Year-round",
    groupSize: "2–8 guests",
    comfortLevel: "Luxury",
    heroImage: "/images/packages/luxury-wellness.jpg",
    gallery: [
      "/gasa-hot-springs-bhutan-natural-thermal-pools.jpg",
      "/phobjikha-valley-glacial-bhutan-black-necked-crane.jpg",
      "/bhutan-haa-valley-traditional-stone-house.jpg",
      ...fallbackGallery,
    ],
    highlights: ["Hot stone baths", "Yoga sessions", "Meditation"],
    itinerary: [
      {
        day: 1,
        title: "Arrive & Exhale",
        description:
          "From the airstrip to stillness in under an hour: check into your valley retreat, meet your wellness host for a personal consultation, and unwind with a herbal steam before an early, nourishing dinner.",
        meals: "Dinner",
        stay: "Wellness lodge, Paro",
        location: "Paro · 2,250 m",
        image: "/images/packages/luxury-wellness.jpg",
      },
      {
        day: 2,
        title: "Morning Yoga, Sacred Afternoon",
        description:
          "Greet the valley with sunrise yoga, then visit Kyichu Lhakhang to turn prayer wheels with morning pilgrims. The afternoon belongs to Bhutan's signature therapy: a hot-stone bath infused with artemisia, river stones cracking and hissing as they heat the water.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Wellness lodge, Paro",
        location: "Paro Valley",
        image: "/images/itinerary/monks.jpg",
      },
      {
        day: 3,
        title: "Forest Bathing & Farmhouse Table",
        description:
          "A slow, guided walk through blue pine forest above the valley — no summit, no schedule, just breath and birdsong. Lunch at a farmhouse table with vegetables pulled from the kitchen garden, and an afternoon massage back at the lodge.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Wellness lodge, Paro",
        location: "Paro Valley pine forests",
        image: "/images/packages/luxury-bhutan.jpg",
      },
      {
        day: 4,
        title: "Meditation at the Pass",
        description:
          "Drive to Dochula Pass for a guided meditation among the 108 chortens with the Himalaya on the skyline, followed by a picnic in the rhododendron forest. Evening restorative yoga and a sound-rest session by candlelight.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Wellness lodge, Paro",
        location: "Dochula Pass · 3,100 m",
        image: "/bhutan-dochula-pass-108-chortens-himalayan-mountain.jpg",
      },
      {
        day: 5,
        title: "The Art of Bhutanese Living",
        description:
          "A hands-on morning: cook ema datshi and momos with the lodge chef, and learn the ritual of a sang smoke offering. One final, lingering hot-stone soak as the sun drops behind the ridgeline.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Wellness lodge, Paro",
        location: "Paro Valley",
        image: "/images/packages/luxury-wellness.jpg",
      },
      {
        day: 6,
        title: "Departure, Restored",
        description:
          "A gentle morning stretch, a slow breakfast, and a short transfer to the airport — leaving with a lighter step than you arrived.",
        meals: "Breakfast",
        stay: "—",
        location: "Paro International Airport",
        image: "/images/packages/custom-journey.jpg",
      },
    ],
    included: ["Wellness sessions", "Accommodation"],
    excluded: ["International flights"],
    faqs: [{ question: "Is it suitable for beginners?", answer: "Yes, sessions are tailored." }],
    keywords: ["Wellness", "Retreat"],
  },
  {
    slug: "photography-tour",
    category: "adventure",
    title: "Photography Expedition",
    summary: "Capture Bhutan’s landscapes with expert guidance.",
    description: "A guided expedition focused on golden-hour and cultural photography.",
    durationLabel: "8 Days / 7 Nights",
    durationDays: 8,
    region: "Multiple Regions",
    difficulty: "Easy",
    bestTime: "Year-round",
    groupSize: "2–10 guests",
    comfortLevel: "Premium",
    heroImage: "/images/packages/photography-tour.jpg",
    gallery: [
      "/bhutan-prayer-flags-mountain-landscape.jpg",
      "/bhutan-himalayan-mountains-prayer-flags-temple-scenic.jpg",
      "/bhutan-traditional-colorful-dzong-architecture.jpg",
      ...fallbackGallery,
    ],
    highlights: ["Sunrise sessions", "Festival photography", "Pro tips"],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Golden Hour Warm-Up",
        description:
          "Land in Paro and go straight to work: an evening shoot as low light rakes across the valley's farmhouses and the Paro Chhu turns to silver. Gear review and shot-list planning over dinner with your photo mentor.",
        meals: "Dinner",
        stay: "Paro hotel",
        location: "Paro · 2,250 m",
        image: "/images/packages/photography-tour.jpg",
      },
      {
        day: 2,
        title: "Dzong Light & Village Frames",
        description:
          "Dawn at Rinpung Dzong for reflections in the river and monks crossing the cantilever bridge. Afternoon among willow-lined farm lanes shooting rural life, with an ethics-first briefing on photographing people respectfully.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Paro hotel",
        location: "Paro Dzong & valley",
        image: "/images/packages/cultural-heritage.jpg",
      },
      {
        day: 3,
        title: "The Tiger's Nest Frame",
        description:
          "Hike to the classic Taktsang viewpoints, working angles from the prayer-flag ridge and the cafeteria terrace as clouds stream past the cliff face. Long-lens compression, bracketing, and patience — today has all three.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Paro hotel",
        location: "Taktsang · 3,120 m",
        image: "/images/packages/cultural-heritage.jpg",
      },
      {
        day: 4,
        title: "Thimphu: Portraits & Statues",
        description:
          "Buddha Dordenma's gold against monsoon-washed skies, pilgrims and prayer wheels at the Memorial Chorten, and the colour chaos of the weekend market. Evening street shoot along Norzin Lam as shop lights come on.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Thimphu hotel",
        location: "Thimphu · 2,320 m",
        image: "/bhutan-buddha-dordenma-giant-golden-statue-thimphu.jpg",
      },
      {
        day: 5,
        title: "Dochula Sunrise Panorama",
        description:
          "Pre-dawn at Dochula for the frame every photographer comes for: 108 chortens in foreground, a 300-kilometre Himalayan wall behind. Then down to Punakha for blue hour at the dzong, lit like a lantern between two rivers.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Punakha hotel",
        location: "Dochula Pass · 3,100 m",
        image: "/bhutan-dochula-pass-108-chortens-himalayan-mountain.jpg",
      },
      {
        day: 6,
        title: "Rivers, Bridges & Rice Terraces",
        description:
          "Prayer flags streaming off the great suspension bridge, farmers in the terraces, and detail studies inside Punakha Dzong's jacaranda courtyards. Golden-hour finale from the Khamsum chorten ridge.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Punakha hotel",
        location: "Punakha Valley",
        image: "/images/packages/punakha-drubchen.jpg",
      },
      {
        day: 7,
        title: "Phobjikha — the Valley of Mist",
        description:
          "Drive into the glacial bowl of Phobjikha for Bhutan's moodiest landscapes: mist burning off the marshes, Gangtey monastery on its ridge, and — in winter — endangered black-necked cranes wheeling overhead.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Phobjikha lodge",
        location: "Phobjikha Valley · 3,000 m",
        image: "/phobjikha-valley-glacial-bhutan-black-necked-crane.jpg",
      },
      {
        day: 8,
        title: "Final Frames & Departure",
        description:
          "Return west for a farewell portfolio review with your mentor over lunch in Paro, then depart with a memory card full of the Himalaya at its most photogenic.",
        meals: "Breakfast, Lunch",
        stay: "—",
        location: "Paro International Airport",
        image: "/images/packages/custom-journey.jpg",
      },
    ],
    included: ["Photo mentor", "Transport"],
    excluded: ["International flights"],
    faqs: [{ question: "Do I need pro gear?", answer: "No, any camera is welcome." }],
    keywords: ["Photography", "Adventure"],
  },
  {
    slug: "birdwatching",
    category: "adventure",
    title: "Birdwatching Paradise",
    summary: "Explore Bhutan’s birdlife with specialist guides.",
    description: "Spot rare Himalayan birds across forested valleys and wetlands.",
    durationLabel: "9 Days / 8 Nights",
    durationDays: 9,
    region: "Central Bhutan",
    difficulty: "Easy",
    bestTime: "Winter & Spring",
    groupSize: "2–10 guests",
    comfortLevel: "Comfort",
    heroImage: "/images/packages/birdwatching.jpg",
    gallery: [
      "/phobjikha-valley-glacial-bhutan-black-necked-crane.jpg",
      "/traditional-bhutanese-village-houses-farmland-auth.jpg",
      "/bhutan-himalayan-mountain-landscape-kingdom-thunde.jpg",
      ...fallbackGallery,
    ],
    highlights: ["Black-necked cranes", "Forest trails", "Expert birding guide"],
    itinerary: [
      {
        day: 1,
        title: "Arrival & River Birding",
        description:
          "Straight from the airstrip to the Paro Chhu's shingle banks, where ibisbill work the stones and white-capped redstarts flit along the current. An easy first list over dinner with your specialist birding guide.",
        meals: "Dinner",
        stay: "Paro hotel",
        location: "Paro Chhu · 2,250 m",
        image: "/images/packages/birdwatching.jpg",
      },
      {
        day: 2,
        title: "Chele La Dawn Chorus",
        description:
          "Pre-dawn drive to Chele La, Bhutan's highest road pass, for himalayan monal glinting in first light, blood pheasant in the scrub, and rosefinches among the firs. Afternoon at Kyichu Lhakhang's willow groves.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Paro hotel",
        location: "Chele La · 3,990 m",
        image: "/images/packages/dagala-thousand-lakes.jpg",
      },
      {
        day: 3,
        title: "Dochula's Cloud Forest",
        description:
          "Bird the mossy oak forest around Dochula Pass and the Lampelri botanical park: laughingthrushes, yuhinas, fire-tailed sunbirds, and — with luck — the elusive satyr tragopan.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Punakha hotel",
        location: "Dochula Pass · 3,100 m",
        image: "/bhutan-dochula-pass-108-chortens-himalayan-mountain.jpg",
      },
      {
        day: 4,
        title: "The White-Bellied Heron",
        description:
          "A pilgrimage of a different kind: the Po Chhu's braided channels are one of the last strongholds of the critically endangered white-bellied heron, with fewer than 60 left on earth. Pallas's fish eagle and crested kingfisher keep the wait lively.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Punakha hotel",
        location: "Po Chhu Valley · 1,250 m",
        image: "/images/packages/birdwatching.jpg",
      },
      {
        day: 5,
        title: "Into the Crane Valley",
        description:
          "Cross Lawa La into the glacial bowl of Phobjikha, winter home of the black-necked cranes that migrate over the Himalaya from Tibet. Evening at the crane information centre and a first scan of the marshes.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Phobjikha lodge",
        location: "Phobjikha Valley · 3,000 m",
        image: "/phobjikha-valley-glacial-bhutan-black-necked-crane.jpg",
      },
      {
        day: 6,
        title: "A Full Day with the Cranes",
        description:
          "Dawn flights, feeding flocks, and the cranes' strange, beautiful duets across the frost-silvered marsh. Between sessions, visit Gangtey monastery on its ridge and walk the valley's nature trail.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Phobjikha lodge",
        location: "Phobjikha Valley · 3,000 m",
        image: "/phobjikha-valley-glacial-bhutan-black-necked-crane.jpg",
      },
      {
        day: 7,
        title: "Forest Trails of the Black Mountains",
        description:
          "Bird the temperate forests along the Pele La road — parrotbills in the bamboo, cutias and sibias in the moss forest — before returning to Punakha's warmth for riverside listing at dusk.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Punakha hotel",
        location: "Pele La forests · 3,420 m",
        image: "/images/packages/birdwatching.jpg",
      },
      {
        day: 8,
        title: "Return West, List in Hand",
        description:
          "A final Dochula dawn chorus on the way back to Paro, then a celebratory dinner to tally the trip list — 150+ species is a common result on this route.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Paro hotel",
        location: "Paro · 2,250 m",
        image: "/images/packages/western-highlights.jpg",
      },
      {
        day: 9,
        title: "Departure",
        description:
          "One last riverside scan for ibisbill before your flight — because a birder never really stops birding.",
        meals: "Breakfast",
        stay: "—",
        location: "Paro International Airport",
        image: "/images/packages/custom-journey.jpg",
      },
    ],
    included: ["Guide", "Transport"],
    excluded: ["International flights"],
    faqs: [{ question: "Is this beginner-friendly?", answer: "Yes, all levels welcome." }],
    keywords: ["Birdwatching", "Bhutan"],
  },
  {
    slug: "custom-journey",
    category: "custom",
    title: "Custom Journey Design",
    summary: "A fully tailored Bhutan journey crafted around your interests and pace.",
    description: "Work with our Bhutan experts to design a bespoke itinerary with flexible timing.",
    durationLabel: "Flexible",
    durationDays: 0,
    region: "All Regions",
    difficulty: "Easy",
    bestTime: "Year-round",
    groupSize: "Flexible",
    comfortLevel: "Premium",
    heroImage: "/images/packages/custom-journey.jpg",
    gallery: [
      "/bhutan-paro-taktsang-monastery-tiger-nest-mountain.jpg",
      "/bhutan-traditional-colorful-dzong-architecture.jpg",
      "/bhutan-prayer-flags-mountain-landscape.jpg",
      ...fallbackGallery,
    ],
    highlights: ["Bespoke itinerary", "Dedicated trip designer", "Flexible schedule"],
    // Deliberately empty — a bespoke journey has no fixed days; the itinerary
    // component shows a "designed after your inquiry" message instead.
    itinerary: [],
    included: ["Dedicated planning support"],
    excluded: [],
    faqs: [{ question: "How do we start?", answer: "Send an inquiry and we’ll follow up within 24 hours." }],
    keywords: ["Custom", "Bespoke", "Bhutan"],
  },
]

export const getAllPackages = () => packages

export const getPackageByCategory = (category: PackageCategory) =>
  packages.filter((pkg) => pkg.category === category)

export const getPackageBySlug = (slug: string) => packages.find((pkg) => pkg.slug === slug)

export const getPackageByCategoryAndSlug = (category: string, slug: string) =>
  packages.find((pkg) => pkg.category === category && pkg.slug === slug)

export const getPackagePath = (pkg: TourPackage) => `/packages/${pkg.category}/${pkg.slug}`
