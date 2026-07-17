"use client"

import type React from "react"
import { createContext, useContext } from "react"

interface LanguageContextType {
  t: (key: string) => string
}

const translations: Record<string, string> = {
    hero_title: "Discover the Land of",
    thunder_dragon: "Thunder Dragon",
    hero_description:
      "Experience authentic Bhutanese culture, breathtaking festivals, and spiritual journeys in the heart of the Himalayas",
    explore_packages: "Explore Packages",
    festival_calendar: "Festival Calendar",
    licensed_tour_operator: "Licensed Tour Operator",
    why_choose_drukvista: "Why Choose Bhutan Aravia Peaks?",
    why_choose_description: "We bring you closer to Bhutan's soul with personalized experiences and expert guidance",
    licensed_trusted: "Licensed & Trusted",
    licensed_trusted_description: "Official government-authorized tour operator with years of experience",
    authentic_experiences: "Authentic Experiences",
    authentic_experiences_description: "Immerse yourself in genuine Bhutanese traditions and local communities",
    expert_guides: "Expert Guides",
    expert_guides_description: "Highly trained guides who know every corner of Bhutan",
    tailored_itineraries: "Tailored Itineraries",
    tailored_itineraries_description: "Customized packages designed for your preferences and travel style",
    festival_access: "Festival Access",
    festival_access_description: "Guaranteed access to Bhutan's most vibrant cultural festivals",
    sustainable_tourism: "Sustainable Tourism",
    sustainable_tourism_description: "Committed to preserving Bhutan's environment and culture",
    featured_packages: "Featured Packages",
    featured_packages_description: "Curated journeys for every type of traveler",
    view_all: "View All",
    popular: "Popular",
    adventure: "Adventure",
    paro_tshechu_title: "Paro Tshechu Festival",
    paro_tshechu_description:
      "Experience one of Bhutan's most colorful and sacred festivals with mask dances and rituals",
    cultural_heritage_title: "Cultural Heritage Trail",
    cultural_heritage_description: "Visit iconic monasteries, temples, and historic sites",
    trekking_title: "Himalayan Adventure Trek",
    trekking_description: "Challenge yourself with breathtaking mountain trails and pristine landscapes",
    from: "From",
    view_details: "View Details",
    experience_kingdom: "Experience the Kingdom",
    about_bhutan_para1:
      "Nestled in the eastern Himalayas, Bhutan is a land of mystique and untouched beauty. With towering mountains, ancient monasteries, and vibrant festivals, it offers an escape from the modern world.",
    about_bhutan_para2:
      "The country measures progress not by GDP, but by Gross National Happiness—a philosophy that reflects its commitment to sustainable development and preserving its culture.",
    about_bhutan_para3: "Let us guide you through this magical kingdom and create memories that last a lifetime.",
    learn_more: "Learn More",
    plan_journey: "Plan Your Journey",
    ready_adventure: "Ready for Your Adventure?",
    ready_adventure_description:
      "Start planning your unforgettable journey to Bhutan today. Our team is ready to craft the perfect experience for you.",
    get_consultation: "Customize Your Trip Now",
    contact_us: "Contact Us",
    all_prices_usd: "All itineraries are custom-crafted",
    explore_packages_title: "Explore Our Tour Packages",
    explore_packages_description:
      "From cultural festivals to Himalayan treks, discover curated experiences that showcase the best of Bhutan. All packages are fully customizable to match your preferences.",
    all_tours: "All Tours",
    festivals: "Festivals",
    cultural: "Cultural",
    trekking: "Trekking",
    luxury: "Luxury",
    special: "Special",
    per_person: "per person",
    gallery: "Gallery",
    detailed_itinerary: "Detailed Itinerary",
    day: "Day",
    meals: "Meals",
    stay: "Stay",
    highlights: "Highlights",
    package_overview: "Package Overview",
    package_details: "Package Details",
    book_now: "BOOK NOW",
    price_excludes_sdf: "Itinerary details and inclusions are confirmed after consultation.",
    ratings_reviews: "Ratings & Reviews",
    based_on: "Based on",
    reviews: "reviews",
    whats_included: "What's Included",
    whats_excluded: "What's Excluded",
    what_to_bring: "What to Bring",
    cant_find_package: "Can't Find What You're Looking For?",
    custom_package_description:
      "We specialize in creating custom itineraries tailored to your interests, preferences, and travel style",
    request_custom_package: "Request Custom Package",
    about_welcome:
      "Welcome to Bhutan Aravia Peaks, your window into the heart of Bhutan—the Land of the Thunder Dragon.",
    about_intro:
      "Founded and operated locally, Bhutan Aravia Peaks was created from a simple belief: travel should be more than a journey; it should be a meaningful experience that transforms, inspires, and stays with you forever.",
    who_we_are: "Who We Are",
    who_we_are_text:
      "As Bhutanese natives, we grew up surrounded by towering Himalayan peaks, ancient monasteries clinging to cliffs, lush valleys, and the gentle spirit of our people. Bhutan Aravia Peaks was born from a desire to share this timeless beauty with travelers from around the world—authentically, respectfully, and with genuine Bhutanese warmth.",
    who_we_are_tagline: "We don't just show you Bhutan—we help you feel it.",
    our_mission: "Our Mission",
    our_mission_text:
      "To offer travelers an immersive and seamless experience in Bhutan—one that blends adventure, culture, nature, and spirituality—while remaining true to the values that make our kingdom unique.",
    what_makes_different: "What Makes Us Different",
    what_makes_different_subtitle: "Experience Bhutan through the eyes of those who call it home",
    locally_owned: "Locally Owned & Deeply Rooted",
    locally_owned_text: "Our team is Bhutanese, raised among the landscapes and traditions we help you explore.",
    about_authentic_text:
      "From hidden trails and village immersions to sacred cultural ceremonies, we craft journeys that go beyond typical tour itineraries.",
    personalized_journeys: "Personalized Journeys",
    personalized_journeys_text:
      "Whether you seek adventure, wellness, cultural discovery, or photography, we tailor each itinerary to your passions and pace.",
    about_trusted_text:
      "We prioritize comfort, safety, and responsible travel, ensuring your Bhutan experience is worry-free from the moment you arrive.",
    discover_with_heart: "Discover Bhutan With Heart",
    discover_with_heart_text:
      "Traveling with Bhutan Aravia Peaks is not just visiting a destination—it's entering a living culture where tradition meets untouched nature, where happiness is a national value, and where each moment unfolds with grace and wonder.",
    discover_tagline: "Bhutan Aravia Peaks—Your journey to Bhutan begins here.",
    discover_subtitle: "Step into a world where every path leads to discovery.",
    contact_get_in_touch: "Get in Touch",
    contact_title: "Contact Bhutan Aravia Peaks",
    contact_description:
      "Have questions about visiting Bhutan? Our friendly travel specialists are here to help plan your perfect journey",
    contact_us_title: "Get in Touch With Us",
    contact_us_subtitle: "Have questions about your Bhutan journey? We're here to help you plan the perfect adventure.",
    get_in_touch: "Get in Touch",
    message_sent_success: "Message sent successfully! We'll get back to you within 24 hours.",
    your_message: "Your Message",
    message_placeholder: "Tell us about your travel plans, questions, or any special requests...",
    sending: "Sending",
    send_message: "Send Message",
    contact_email_us: "Email Us",
    contact_email_description: "Send us your questions anytime",
    contact_call_us: "Call Us",
    contact_call_description: "Speak with our travel experts",
    contact_whatsapp: "WhatsApp",
    contact_whatsapp_description: "Chat with us instantly",
    contact_whatsapp_chat: "Chat on WhatsApp",
    contact_send_message: "Send Us a Message",
    contact_form_description: "Fill out the form below and we'll get back to you within 24 hours.",
    contact_goto_inquiry: "Go to Inquiry Form",
    contact_our_office: "Our Office",
    contact_office_address: "Thimphu, Bhutan\nKingdom of Bhutan",
    contact_business_hours: "Business Hours",
    contact_hours_weekday: "Monday - Friday: 9:00 AM - 6:00 PM (Bhutan Time)",
    contact_hours_saturday: "Saturday: 9:00 AM - 1:00 PM",
    contact_hours_sunday: "Sunday: Closed",
    contact_why_contact: "Why Contact Us?",
    contact_reason_1: "Free consultation on trip planning",
    contact_reason_2: "Expert advice on festivals and best times to visit",
    contact_reason_3: "Custom itinerary creation",
    contact_reason_4: "Visa assistance and travel tips",
    contact_reason_5: "Answers to all your Bhutan questions",
    contact_ready_planning: "Ready to Start Planning?",
    contact_ready_description:
      "Our team is ready to create your perfect Bhutan adventure. Get in touch today for a free consultation.",
    festivals_badge: "Annual Celebrations",
    festivals_title: "Bhutan Festival Calendar",
    festivals_description:
      "Experience the vibrant colors, sacred dances, and spiritual energy of Bhutan's most spectacular tshechus and cultural festivals",
    festivals_what_are: "What are Tshechus?",
    festivals_explanation:
      "Tshechus are annual religious Bhutanese festivals held in each district on the tenth day of a month of the lunar Tibetan calendar. They honor Guru Rinpoche, the saint who brought Buddhism to Bhutan in the 8th century.",
    festivals_view_package: "View Festival Package",
    festivals_cta_title: "Want to Experience a Festival?",
    festivals_cta_description:
      "Contact us to plan your festival tour. We'll handle all arrangements including festival tickets, best viewing spots, and cultural insights.",
    festivals_cta_button: "Plan Your Festival Tour",
    festivals_most_popular: "Most Popular",
    festivals_highlights: "Highlights",
    festivals_important_notes_title: "Important Notes",
    festivals_dates_vary: "Festival Dates Vary",
    festivals_dates_vary_description:
      "Tshechu dates follow the Bhutanese lunar calendar and change each year. We recommend booking 6-12 months in advance to secure your preferred dates.",
    festivals_book_early: "Book Early",
    festivals_book_early_description:
      "Festivals are the peak tourist season in Bhutan. Hotels and guides fill up quickly, so advance booking is essential for the best experience.",
    festivals_what_to_wear: "What to Wear",
    festivals_what_to_wear_description:
      "Respectful attire is required. We recommend long pants or skirts and covered shoulders. For special viewing areas, traditional Bhutanese dress is preferred.",
    festivals_photography_etiquette: "Photography Etiquette",
    festivals_photography_etiquette_description:
      "Photography is generally allowed, but flash is prohibited inside temples and during sacred dances. Always ask permission before photographing monks or locals.",
    guide_badge: "Essential Information",
    guide_title: "Complete Guide to Planning Your Bhutan Trip",
    guide_subtitle: "Everything you need to know about visiting the Land of the Thunder Dragon",
    guide_visa_title: "Visa Requirements",
    guide_visa_description:
      "All visitors except Indian nationals require a visa. Visas are arranged through a licensed tour operator as part of your travel planning.",
    guide_visa_processing: "Processing Time:",
    guide_visa_time: "7-10 business days",
    guide_visa_guarantee: "100% Visa Issuance Guaranteed",
    guide_visa_guarantee_desc:
      "We handle your Bhutan visa from start to finish — approval is guaranteed for every traveler booking with us.",
    guide_visa_fact_indian: "Visitors from India need a permit instead of a visa.",
    guide_visa_fact_fee: "The visa fee is USD $40 per person and is non-refundable.",
    guide_visa_fact_validity:
      "Your visa or permit is valid for the number of days your Sustainable Development Fee (SDF) has been paid for.",
    guide_visa_requirements_title: "What You'll Need to Apply",
    guide_visa_req_1:
      "A copy of your passport, valid for at least 6 months beyond your departure from Bhutan (Indian nationals may use a passport or voter ID card)",
    guide_visa_req_2: "Valid travel insurance covering the entire duration of your trip",
    guide_visa_req_3: "A recent passport-size photograph",
    guide_visa_process_title: "How Visa Processing Works",
    guide_visa_step_1_title: "Confirm & Pay",
    guide_visa_step_1_desc:
      "Complete full payment for your Bhutan journey with us, and we transfer your Sustainable Development Fee (SDF) to the government on your behalf.",
    guide_visa_step_2_title: "We Apply for Your e-Visa",
    guide_visa_step_2_desc:
      "With your SDF payment receipt in hand, we submit your e-visa application — processing takes just 3 working days.",
    guide_visa_step_3_title: "Receive Your e-Visa",
    guide_visa_step_3_desc:
      "Once approved — guaranteed for every traveler with us — we email your e-visa directly to you.",
    guide_visa_step_4_title: "Arrive in Bhutan",
    guide_visa_step_4_desc:
      "Bring a printed copy of your e-visa when entering Bhutan. Your passport is stamped at the port of entry.",
    guide_sdf_title: "Sustainable Development Contribution (SDF)",
    guide_sdf_description:
      "All international visitors contribute to Bhutan's sustainable tourism model, which supports the environment and cultural preservation.",
    guide_sdf_included: "Included in Package:",
    guide_sdf_packages: "Handled through your licensed tour operator",
    guide_best_time_title: "Best Time to Visit",
    guide_best_time_description:
      "Bhutan offers unique experiences year-round. Spring (March-May) and autumn (September-November) feature pleasant weather and clear mountain views.",
    guide_peak_season: "Peak Season:",
    guide_peak_months: "March-May, September-November",
    guide_getting_there_title: "Getting There",
    guide_getting_there_description:
      "Paro International Airport is Bhutan's only international airport. Flights are available from Bangkok, Delhi, Kathmandu, and other major Asian cities.",
    guide_flight_duration: "Flight Duration:",
    guide_flight_time: "2-3 hours from major hubs",
    guide_included_title: "What's Included",
    guide_included_description:
      "All Bhutan tour packages are comprehensive, covering accommodation, meals, transport, licensed guide, and entry access.",
    guide_tour_operator_required: "Tour Operator:",
    guide_tour_operator_mandatory: "Required for all visitors",
    guide_altitude_climate_title: "Altitude & Climate",
    guide_altitude_climate_description:
      "Bhutan's altitude ranges from 200m to 7,500m. Thimphu (2,400m) and Paro (2,250m) have mild climates. Pack layers for varying temperatures.",
    guide_pack: "Pack:",
    guide_layers: "Warm layers and rain gear",
    guide_sdf_amount_label: "Daily Fee:",
    guide_sdf_amount: "USD $100 per person, per day",
    guide_getting_there_land_label: "Entry Points:",
    guide_getting_there_land: "Paro Airport, or 3 land borders from India",
    guide_currency_title: "Currency & Money",
    guide_currency_description:
      "Bhutan's currency is the Ngultrum (Nu), pegged 1:1 to the Indian Rupee — both currencies are accepted everywhere in the country.",
    guide_currency_tip_title: "Good to know:",
    guide_currency_tip:
      "Cards are accepted at hotels and larger shops in Thimphu and Paro, but carry cash for rural areas, markets, and temple donations. Indian ₹500 and ₹2,000 notes are not accepted.",
    guide_currency_rate_label: "Exchange Rate:",
    guide_currency_rate: "1 USD ≈ Nu 82 (check current rates at xe.com)",
    guide_currency_notes_title: "Indian Rupee Notes",
    guide_currency_notes_desc:
      "INR 50 and 100 notes are accepted. INR 1,000 and 2,000 notes are not accepted in Bhutan.",
    guide_currency_exchange_title: "Where to Exchange",
    guide_currency_exchange_desc:
      "Foreign exchange desks at Paro Airport, bank branches, and select hotels in Paro and Thimphu.",
    guide_currency_cards_title: "Cards & ATMs",
    guide_currency_cards_desc: "Visa and Mastercard credit/debit cards are accepted at local ATMs.",
    guide_currency_accepted_title: "Currencies Accepted",
    guide_currency_accepted_desc:
      "US Dollar, Pound Sterling, Euro, Japanese Yen, Swiss Franc, Hong Kong Dollar, Canadian Dollar, Danish Krone, and more.",
    guide_season_spring_title: "Spring",
    guide_season_spring_months: "March – May",
    guide_season_spring_desc:
      "Bhutan's high season. Rhododendrons and magnolias bloom across the valleys, skies are mostly clear, and it's peak season for festivals — including the famous Paro Tshechu.",
    guide_season_summer_title: "Summer",
    guide_season_summer_months: "June – August",
    guide_season_summer_desc:
      "The quietest, most affordable months. Monsoon rains bring vivid greenery to the valleys — ideal for travelers who don't mind occasional showers.",
    guide_season_autumn_title: "Autumn",
    guide_season_autumn_months: "September – November",
    guide_season_autumn_desc:
      "The clearest skies of the year, especially in October, with dramatic Himalayan views. High season alongside spring, and home to many of the year's biggest tshechus.",
    guide_season_winter_title: "Winter",
    guide_season_winter_months: "December – February",
    guide_season_winter_desc:
      "Cold but crisp and clear, with the lowest crowds and rates. High-altitude trekking isn't possible, but valley touring and cultural sightseeing remain excellent.",
    guide_dos_donts: "DOs and DON'Ts in Bhutan",
    guide_dos: "DO's",
    guide_donts: "DON'Ts",
    guide_do_1: "Dress modestly when visiting religious sites (cover shoulders and legs)",
    guide_do_2: "Remove shoes and hats before entering temples and monasteries",
    guide_do_3: "Walk clockwise around religious monuments (chortens and<bos>)",
    guide_do_4: "Ask permission before taking photos of people or inside temples",
    guide_do_5: "Try the local cuisine including ema datshi (chili and cheese)",
    guide_do_6: "Respect prayer flags, wheels, and religious symbols",
    guide_dont_1: "Don't smoke in public (Bhutan has strict tobacco laws)",
    guide_dont_2: "Don't point your feet at religious objects or people",
    guide_dont_3: "Don't touch or climb on sacred objects like chortens",
    guide_dont_4: "Don't wear revealing clothing in religious or public places",
    guide_dont_5: "Don't litter or damage the environment (Bhutan is carbon-negative)",
    guide_dont_6: "Don't buy or sell tobacco products",
    guide_attractions_title: "Must-Visit Attractions in Bhutan",
    guide_attractions_subtitle: "From sacred monasteries to pristine valleys, explore the most iconic destinations",
    farmhouse_badge: "Authentic Experiences",
    farmhouse_title: "Farmhouses & Homestays in",
    farmhouse_description:
      "Stay with local Bhutanese families and experience the authentic warmth, traditions, and daily life of the Thunder Dragon Kingdom.",
    farmhouse_why_choose: "Why Choose a Bhutanese Farmhouse or Homestay?",
    farmhouse_benefit_1_title: "Authentic Cultural Experience",
    farmhouse_benefit_1_text:
      "Live like a local, engaging in farming activities, cooking traditional meals, and learning about age-old customs.",
    farmhouse_benefit_2_title: "Heritage Architecture",
    farmhouse_benefit_2_text:
      "Stay in centuries-old farmhouses built with traditional Bhutanese craftsmanship and sacred family spaces.",
    farmhouse_benefit_3_title: "Warm Host Families",
    farmhouse_benefit_3_text:
      "Enjoy heartfelt hospitality, storytelling, and a deeper connection with Bhutanese family life.",
    farmhouse_benefit_4_title: "Farm-to-Table Cuisine",
    farmhouse_benefit_4_text:
      "Savor fresh, seasonal dishes made from organic ingredients grown right on the farm.",
    farmhouse_benefit_5_title: "Scenic Valley Views",
    farmhouse_benefit_5_text:
      "Wake up to peaceful mountain landscapes, rice terraces, and tranquil village surroundings.",
    farmhouse_benefit_6_title: "Restorative Slow Travel",
    farmhouse_benefit_6_text:
      "Experience Bhutan at an unhurried pace with mindful activities and rural tranquility.",
    farmhouse_featured_title: "Featured Farmhouses & Homestays",
    farmhouse_highlights: "Highlights",
    farmhouse_book_now: "Book now",
    farmhouse_learn_more: "Learn more",
    farmhouse_cta_title: "Ready to Experience Authentic Bhutanese Hospitality?",
    farmhouse_cta_description:
      "Connect with local families and create unforgettable memories in the heart of the Thunder Dragon Kingdom.",
    farmhouse_cta_button_plan: "Plan Your Stay",
    inquiry_plan_journey: "Plan Your Journey",
    inquiry_start_adventure: "Start Your",
    inquiry_bhutan_adventure: "Bhutan Adventure",
    inquiry_share_dreams: "Share your travel dreams with us and let our expert team create a personalized itinerary",
    inquiry_form_title: "Travel Inquiry Form",
    inquiry_form_description: "Fill in your details and we'll craft your perfect itinerary",
    inquiry_personal_info: "Personal Information",
    inquiry_full_name: "Full Name",
    inquiry_full_name_placeholder: "Enter your full name",
    inquiry_email: "Email",
    inquiry_email_placeholder: "your.email@example.com",
    inquiry_phone: "Phone",
    inquiry_phone_placeholder: "+1 234 567 8900",
    inquiry_country: "Country",
    inquiry_country_placeholder: "Your country of residence",
    inquiry_trip_details: "Trip Details",
    inquiry_package_type: "Package Type",
    inquiry_select_package: "Select a package type",
    inquiry_cultural_tour: "Cultural Tour",
    inquiry_festival_tour: "Festival Tour",
    inquiry_trekking: "Trekking Adventure",
    inquiry_luxury: "Luxury Experience",
    inquiry_custom: "Custom Itinerary",
    inquiry_travel_month: "Travel Month",
    inquiry_select_month: "Select travel month",
    inquiry_group_size: "Group Size",
    inquiry_select_group_size: "Select group size",
    inquiry_person: "Person",
    inquiry_people: "People",
    inquiry_duration: "Trip Duration",
    inquiry_select_duration: "Select trip duration",
    inquiry_days: "Days",
    inquiry_trip_duration: "Trip Duration",
    inquiry_additional_info: "Additional Information",
    inquiry_message: "Message",
    inquiry_budget_preferences: "Travel Preferences",
    inquiry_budget_per_person: "Preferred Comfort Level",
    inquiry_submit: "Submit Inquiry",
    inquiry_sending: "Sending...",
    inquiry_reference_number: "YOUR REFERENCE NUMBER",
    inquiry_save_number: "Save this number for your records and correspondence",
    inquiry_what_next: "What Happens Next?",
    inquiry_step1: "We've received your inquiry and sent a confirmation to your email",
    inquiry_explore_packages: "Explore Packages",
    inquiry_contact_info: "Contact Information",
    inquiry_office_location: "Office Location",
    inquiry_why_drukvista: "Why Bhutan Aravia Peaks?",
    inquiry_reason5: "Additional support services",
    inquiry_licensed_operator: "Licensed Tour Operator",
    inquiry_personalized_itineraries: "Personalized Itineraries",
    inquiry_package_trekking: "Trekking Adventure",
    inquiry_package_luxury: "Luxury Experience",
    inquiry_package_custom: "Custom Itinerary",
    inquiry_select_group: "Select group size",
    inquiry_solo: "Solo Traveler",
    inquiry_people2: "2 People",
    inquiry_people3_4: "3-4 People",
    inquiry_people5_10: "5-10 People",
    inquiry_people10plus: "10+ People (Group)",
    inquiry_days3_5: "3-5 Days",
    inquiry_days6_8: "6-8 Days",
    inquiry_days9_12: "9-12 Days",
    inquiry_days13_15: "13-15 Days",
    inquiry_days15plus: "15+ Days",
    inquiry_days13plus: "13+ Days",
    request_quote: "Request Consultation",
    sending_message: "Sending message...",
    package_not_found: "Package Not Found",
    package_not_found_description: "The package you are looking for could not be found.",
    best_time: "Best Time",
    group_size: "Group Size",
    duration: "Duration",
    difficulty: "Difficulty",
    contact_travel_agents: "Contact our licensed travel agent partners for tailored planning and bookings",
    // ADDED FAQ SECTIONS
    faq_title: "Frequently Asked Questions",
    faq_description: "Find answers to common questions about traveling to Bhutan",
    faq_question_1: "Do I need a visa to visit Bhutan?",
    faq_answer_1:
      "Yes, all visitors except Indian, Bangladeshi, and Maldivian nationals require a visa. We can assist with the visa application process as part of your tour package.",
    faq_question_2: "What is the best time to visit Bhutan?",
    faq_answer_2:
      "The best times are spring (March-May) and autumn (September-November) when the weather is pleasant and skies are clear. However, Bhutan is beautiful year-round.",
    faq_question_3: "How do I plan a trip to Bhutan?",
    faq_answer_3:
      "Bhutan requires pre-arranged travel through a licensed operator and specific entry processes. We manage permits, logistics, and recommendations based on your travel dates and interests.",
    faq_question_4: "Is Bhutan safe for travelers?",
    faq_answer_4:
      "Yes, Bhutan is one of the safest countries in the world for travelers. The crime rate is very low and locals are friendly and welcoming to visitors.",
    faq_more_questions: "Have more questions about traveling to Bhutan?",
    faq_view_travel_guide: "View Travel Guide",
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const t = (key: string): string => {
    const value = translations[key]
    if (!value) {
      if (process.env.NODE_ENV !== "production") {
        console.error(`[i18n] Missing translation key: ${key}`)
      }
      return key
    }
    return value
  }

  return <LanguageContext.Provider value={{ t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
