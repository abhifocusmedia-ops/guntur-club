import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Trophy,
  Utensils,
  BedDouble,
  Check,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useContact } from "./club-shell";
import { ContactForm } from "./contact-form";
import { photos, amenities, address } from "@/lib/club";
import { ServicesSection } from "./club-services";
import { CommitteeSection, TestimonialsSection } from "./club-community";
import { SectionLineArt } from "./section-line-art";

const homeHeroSlides = [
  {
    id: "legacy",
    image: photos.gardensHero,
    alt: "Guntur Club's handcrafted metal bull sculpture in the gardens",
    eyebrow: "97 YEARS OF PRESTIGE. ONE EXTRAORDINARY LEGACY.",
    title: "Guntur Club",
    tagline: <>A legacy of prestige.<br /><em>A life of distinction.</em></>,
    description: <>Where heritage meets hospitality, and every<br className="desktop-break" /> generation finds a place to belong.</>,
    primary: "Discover the club",
    primaryTo: "/amenities",
  },
  {
    id: "campus",
    image: photos.aerial,
    alt: "Aerial view of the Guntur Club campus",
    eyebrow: "A PLACE TO BREATHE. A COMMUNITY TO BELONG TO.",
    title: "Room to gather.",
    tagline: <>A campus with <em>character.</em></>,
    description: <>Green spaces, gracious corners and a warm welcome<br className="desktop-break" /> for every generation of the club.</>,
    primary: "Explore the club",
    primaryTo: "/heritage",
  },
  {
    id: "hospitality",
    image: photos.dining,
    alt: "Dining at Guntur Club",
    eyebrow: "HOSPITALITY WITH A SENSE OF OCCASION.",
    title: "Gather beautifully.",
    tagline: <>Good food. <em>Even better company.</em></>,
    description: <>From everyday lunches to evenings worth remembering,<br className="desktop-break" /> every table has a story to tell.</>,
    primary: "Discover dining",
    primaryTo: "/amenities",
  },
  {
    id: "pavilion",
    image: photos.pavilion,
    alt: "GC Pavilion sports complex",
    eyebrow: "A NEW CHAPTER IN OUR LEGACY.",
    title: "Play with passion.",
    tagline: <>The GC Pavilion. <em>Made for more.</em></>,
    description: <>World-class sport, recreation and shared pursuits<br className="desktop-break" /> in a contemporary club setting.</>,
    primary: "Explore the facilities",
    primaryTo: "/amenities",
  },
] as const;

export function HomePage() {
  const contact = useContact();
  const heroRef = useRef<HTMLElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const updateParallax = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const hero = heroRef.current;
        if (!hero) return;
        const offset = Math.max(-18, Math.min(34, hero.getBoundingClientRect().top * -0.08));
        hero.style.setProperty("--hero-parallax", `${offset}px`);
      });
    };

    updateParallax();
    window.addEventListener("scroll", updateParallax, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateParallax);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % homeHeroSlides.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setActiveSlide((index + homeHeroSlides.length) % homeHeroSlides.length);
  };

  const slide = homeHeroSlides[activeSlide];

  return (
    <>
      <section className="home-hero" ref={heroRef}>
        <div className="hero-slides" aria-live="polite">
          {homeHeroSlides.map((item, index) => (
            <img
              className={`hero-image hero-slide-image ${index === activeSlide ? "is-active" : ""}`}
              key={item.id}
              src={item.image}
              alt={index === activeSlide ? item.alt : ""}
              aria-hidden={index !== activeSlide}
            />
          ))}
        </div>
        <div className="hero-shade" />
        <div className="hero-content" key={slide.id}>
          <p className="eyebrow">{slide.eyebrow}</p>
          <h1>{slide.title}</h1>
          <p className="hero-tagline">{slide.tagline}</p>
          <p className="hero-description">{slide.description}</p>
          <div className="hero-actions">
            <Button asChild variant="hero" size="lg">
              <Link to={slide.primaryTo}>
                {slide.primary}
                <ArrowUpRight />
              </Link>
            </Button>
            <Button onClick={contact} variant="heroOutline" size="lg">
              Membership enquiry
              <ArrowUpRight />
            </Button>
          </div>
        </div>
        <div className="hero-bottom">
          <span>HERITAGE · LEISURE · FELLOWSHIP</span>
          <a href="#welcome" className="hero-scroll-indicator" aria-label="Scroll to welcome">
            <ArrowDown size={18} />
          </a>
          <span>GUNTUR, ANDHRA PRADESH</span>
        </div>
        <div className="hero-carousel-controls" aria-label="Homepage slides">
          <button type="button" onClick={() => goToSlide(activeSlide - 1)} aria-label="Previous slide">
            <ArrowLeft size={16} />
          </button>
          <span>{String(activeSlide + 1).padStart(2, "0")} / {String(homeHeroSlides.length).padStart(2, "0")}</span>
          <button type="button" onClick={() => goToSlide(activeSlide + 1)} aria-label="Next slide">
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
      <ClubStats variant="home" />
      <section className="welcome-section page-width" id="welcome" data-scroll-reveal>
        <SectionLineArt />
        <div className="welcome-heading">
          <p className="eyebrow">THE HEART OF GUNTUR'S SOCIAL COMMUNITY</p>
          <h2>
            More than a club.
            <br />
            <em>A place to belong.</em>
          </h2>
        </div>
        <div className="welcome-copy">
          <p>
            For nearly a century, Guntur Club has brought people together through a shared
            appreciation for tradition, recreation and the finer things in life.
          </p>
          <p>
            From our beginnings as the famed English Club to a vibrant community of over 1,700
            members, our legacy lives on in every connection.
          </p>
          <Link to="/heritage" className="text-link">
            Explore our heritage
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <section className="experiences-section" data-scroll-reveal>
        <SectionLineArt />
        <div className="page-width amenities-editorial">
          <div className="amenities-editorial-copy" data-scroll-reveal>
            <p className="eyebrow">EXCEPTIONAL, EVERY DAY</p>
            <h2>The art of<br /><em>club living.</em></h2>
            <p className="amenities-editorial-description">
              From sport and wellness to dining, family time and memorable celebrations, discover
              the spaces that make Guntur Club feel like your own.
            </p>
            <div className="amenities-icon-rail" aria-label="Club amenity categories">
              <span title="Sports & leisure"><Trophy size={21} /></span>
              <span title="Dining & togetherness"><Utensils size={21} /></span>
              <span title="Stay & celebrate"><BedDouble size={21} /></span>
              <span title="Family & fellowship"><Sparkles size={21} /></span>
            </div>
            <Link to="/amenities" className="amenities-editorial-link">
              Explore all amenities
              <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="amenities-mosaic" aria-label="Guntur Club amenities">
            <Link to="/amenities" className="amenity-mosaic-tile amenity-mosaic-image">
              <img src={photos.pool} alt="Swimming pool at Guntur Club" loading="lazy" />
              <span>Wellness & leisure</span>
            </Link>
            <Link to="/amenities" className="amenity-mosaic-tile amenity-mosaic-gold">Sports &<br />recreation</Link>
            <Link to="/amenities" className="amenity-mosaic-tile amenity-mosaic-image">
              <img src={photos.dining} alt="Dining at Guntur Club" loading="lazy" />
              <span>Dining & hospitality</span>
            </Link>
            <Link to="/amenities" className="amenity-mosaic-tile amenity-mosaic-olive">GC Pavilion</Link>
            <Link to="/stay-celebrate" className="amenity-mosaic-tile amenity-mosaic-image">
              <img src={photos.hall} alt="Function hall at Guntur Club" loading="lazy" />
              <span>Stay & celebrate</span>
            </Link>
            <Link to="/amenities" className="amenity-mosaic-tile amenity-mosaic-olive">Family &<br />fellowship</Link>
          </div>
        </div>
      </section>
      <ServicesSection />
      <section className="pavilion-feature" data-scroll-reveal>
        <SectionLineArt />
        <img
          src={photos.pavilion}
          alt="GC Pavilion sports complex"
          loading="lazy"
          data-scroll-image
        />
        <div className="pavilion-copy">
          <p className="eyebrow">A NEW CHAPTER IN OUR LEGACY</p>
          <h2>
            Introducing
            <br />
            <em>GC Pavilion.</em>
          </h2>
          <p>
            A contemporary home for world-class sports and recreation. Discover professional
            pickleball, billiards, snooker and precision shooting.
          </p>
          <Button asChild size="lg">
            <Link to="/amenities">
              Explore the facilities
              <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </section>
      <CommitteeSection variant="featured" />
      <TestimonialsSection />
    </>
  );
}
export function PageIntro({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
}) {
  return (
    <section className="inner-hero">
      <SectionLineArt />
      <img src={image} alt={title} />
      <div className="hero-shade" />
      <div className="page-width">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}

function ClubStats({ variant = "home" }: { variant?: "home" | "about" }) {
  const isAbout = variant === "about";

  const stats = isAbout
    ? [
        { value: 1700, suffix: "+", label: "Members" },
        { value: 16, suffix: "+", label: "Affiliations" },
        { value: 20, suffix: "+", label: "Rooms" },
        { value: 11, suffix: "+", label: "Facilities" },
      ]
    : [
        { value: 1929, suffix: "", label: "A distinguished beginning" },
        { value: 97, suffix: " years", label: "Of heritage & fellowship" },
        { value: 1700, suffix: "+", label: "Distinguished members" },
        { value: 3, suffix: " acres", label: "Of exceptional experiences" },
      ];

  return (
    <div className="legacy-stats" aria-label="Guntur Club at a glance" data-scroll-reveal>
      {stats.map((stat) => (
        <AnimatedStat key={stat.label} {...stat} />
      ))}
    </div>
  );
}

function AnimatedStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [current, setCurrent] = useState(0);
  const statRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stat = statRef.current;
    if (!stat) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrent(value);
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const startedAt = performance.now();
        const duration = 1400;

        const tick = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCurrent(Math.round(value * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(stat);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [value]);

  return (
    <div ref={statRef} data-scroll-reveal>
      <strong>
        {current.toLocaleString()}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  );
}

export function HeritagePage() {
  const contact = useContact();
  return (
    <>
      <PageIntro
        eyebrow="ESTABLISHED 1929"
        title="About Guntur Club"
        description="97 years of prestige. One enduring legacy."
        image={photos.club}
      />
      <ClubStats variant="about" />
      <section className="welcome-section page-width" aria-labelledby="about-heading">
        <div className="welcome-heading">
          <p className="eyebrow">ABOUT US</p>
          <h2 id="about-heading">
            More than a club.
            <br />
            <em>A place to belong.</em>
          </h2>
        </div>
        <div className="welcome-copy">
          <p>
            Guntur Club is a community built around fellowship, recreation and warm hospitality. Set
            across a three-acre campus, the club brings together over 1,700 distinguished members.
          </p>
          <p>
            From sports and fitness to dining, family gatherings and celebrations, our spaces bring
            generations together through shared interests and lasting connections.
          </p>
        </div>
      </section>
      <section className="heritage-history" aria-labelledby="history-heading">
        <SectionLineArt />
        <div className="page-width">
          <p className="eyebrow">MILESTONES IN OUR JOURNEY</p>
          <h2 id="history-heading">
            Time moves on. <em>Our spirit endures.</em>
          </h2>
          <div className="history-milestones">
            <article className="history-milestone">
              <p className="history-year">1929</p>
              <h3>A formal beginning</h3>
              <p>
                Registered under the Companies Act, establishing the foundations of a lasting
                institution.
              </p>
            </article>
            <article className="history-milestone">
              <p className="history-year">1977</p>
              <h3>A community comes together</h3>
              <p>
                After a devastating cyclone, members’ donations and contributions helped restore the
                club.
              </p>
            </article>
            <article className="history-milestone">
              <p className="history-year">1998</p>
              <h3>A new home, the same heart</h3>
              <p>
                The club moved to its present 2.75-acre property, opening a new chapter in its
                story.
              </p>
            </article>
          </div>
          <div className="history-cta">
            <div>
              <p className="eyebrow">YOUR NEXT CHAPTER</p>
              <h3>There’s a place for you here.</h3>
            </div>
            <Button onClick={contact} size="lg">
              Enquire about membership
              <ArrowUpRight />
            </Button>
          </div>
        </div>
      </section>
      <CommitteeSection title="Managing Committee" />
    </>
  );
}
export function AmenitiesPage() {
  const [filter, setFilter] = useState("All");
  const contact = useContact();
  return (
    <>
      <PageIntro
        eyebrow="EVERYTHING YOU NEED, ALL IN ONE PLACE"
        title="An exceptional everyday."
        description="Sports, wellness, dining and spaces for the whole family."
        image={photos.pool}
      />
      <section className="page-width amenities-section">
        <SectionLineArt />
        <div className="section-heading">
          <div>
            <p className="eyebrow">CLUB AMENITIES</p>
            <h2>Find your favourite pursuit.</h2>
          </div>
        </div>
        <div className="filter-row">
          {["All", "Sports", "Wellness", "Dining", "Family"].map((x) => (
            <Button
              key={x}
              variant={filter === x ? "default" : "outline"}
              onClick={() => setFilter(x)}
              aria-pressed={filter === x}
            >
              {x}
            </Button>
          ))}
        </div>
        <div className="amenities-grid">
          {amenities
            .filter(
              (x) => filter === "All" || x.category.toLowerCase().includes(filter.toLowerCase()),
            )
            .map((x) => (
              <article className="amenity-item" key={x.name}>
                <img src={x.image} alt={x.name} loading="lazy" />
                <p className="eyebrow">{x.category}</p>
                <h3>{x.name}</h3>
                <p>{x.copy}</p>
                <Button variant="link" onClick={contact}>
                  Enquire about this facility
                  <ArrowUpRight />
                </Button>
              </article>
            ))}
        </div>
        <div className="wifi-note">
          <Sparkles size={20} />
          <p>Complimentary high-speed Wi-Fi throughout the club.</p>
        </div>
      </section>
    </>
  );
}
export function StayPage() {
  const contact = useContact();
  return (
    <>
      <PageIntro
        eyebrow="STAY IN COMFORT. CELEBRATE IN STYLE."
        title="Stay & Celebrate"
        description="Welcoming spaces for quiet escapes and unforgettable occasions."
        image={photos.hall}
      />
      <section className="page-width stay-section">
        <SectionLineArt />
        {[
          {
            title: "A stay that feels like home.",
            eyebrow: "GUEST ROOMS",
            image: photos.rooms,
            copy: "Our well-appointed guest rooms offer modern amenities, complimentary Wi-Fi and a peaceful atmosphere, designed for comfort and convenience.",
            features: ["Well-appointed accommodations", "Modern amenities", "Complimentary Wi-Fi"],
          },
          {
            title: "For life’s memorable moments.",
            eyebrow: "FUNCTION HALLS & CONFERENCES",
            image: photos.hall,
            copy: "From weddings and receptions to conferences, seminars and family gatherings, our spacious halls provide an elegant setting to meet, connect and celebrate.",
            features: [
              "Air-conditioned venues",
              "Modern presentation facilities",
              "Flexible seating arrangements",
            ],
          },
          {
            title: "Come together. Unwind.",
            eyebrow: "LOUNGE & LANDSCAPED GARDENS",
            image: photos.gardens,
            copy: "Enjoy elegant corridors, scenic landscaped gardens and welcoming social spaces for conversations and community.",
            features: [
              "Scenic landscaped gardens",
              "Elegant social spaces",
              "Grand open-air amphitheatre",
            ],
          },
        ].map((x) => (
          <article className="stay-row" key={x.eyebrow}>
            <img src={x.image} alt={x.eyebrow} loading="lazy" />
            <div>
              <p className="eyebrow">{x.eyebrow}</p>
              <h2>{x.title}</h2>
              <p>{x.copy}</p>
              <ul>
                {x.features.map((f) => (
                  <li key={f}>
                    <Check size={15} />
                    {f}
                  </li>
                ))}
              </ul>
              <Button onClick={contact} size="lg">
                Enquire with the club
                <ArrowUpRight />
              </Button>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
const affiliates = {
  "Andhra Pradesh": ["Vijayawada Club, Vijayawada", "IBP Century Club, Visakhapatnam"],
  Telangana: ["The Hyderabad Gymkhana Club, Hyderabad", "Filmnagar Cultural Center, Hyderabad"],
  "Tamil Nadu": [
    "Chennai Corporate Club, Chennai",
    "Andhra Social & Cultural Association, Chennai",
    "The Kerala Club, Coimbatore",
  ],
  Karnataka: [
    "Cosmopolitan Club, Bengaluru",
    "Domlur Club, Bengaluru",
    "Indiranagar Club, Bengaluru",
  ],
  "Across India": [
    "Golden Swan Country Club, Thane, Maharashtra",
    "Nashik Club, Nashik, Maharashtra",
    "Bhubaneshwar Club, Bhubaneswar, Odisha",
    "Jaisal Club, Jaisalmer, Rajasthan",
    "Umed Club, Jodhpur, Rajasthan",
    "Shree Madhav Club, Ujjain, Madhya Pradesh",
  ],
};
export function AffiliationsPage() {
  return (
    <>
      <PageIntro
        eyebrow="CONNECTIONS BEYOND OUR CAMPUS"
        title="A wider world of privileges."
        description="A distinguished network of affiliated clubs across India."
        image={photos.gardens}
      />
      <section className="page-width affiliations-section">
        <SectionLineArt />
        <p className="eyebrow">A NETWORK OF PRIVILEGED AFFILIATIONS</p>
        <h2>Fellowship without boundaries.</h2>
        <p className="section-description">
          Enjoy privileged access to our affiliated clubs. Contact our team for current access
          arrangements before your visit.
        </p>
        <div className="affiliations-grid">
          {Object.entries(affiliates).map(([state, clubs]) => (
            <article key={state}>
              <h3>{state}</h3>
              <ul>
                {clubs.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
export function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="OUR TEAM IS READY TO SUPPORT YOU"
        title="Get in touch."
        description="A question, a visit or a new connection. It starts here."
        image={photos.club}
      />
      <section className="page-width contact-page">
        <SectionLineArt />
        <div>
          <p className="eyebrow">GUNTUR CLUB</p>
          <h2>A warm welcome awaits.</h2>
          <p>
            Whether you need information, assistance or wish to share feedback, we'd be happy to
            hear from you.
          </p>
          <div className="contact-details">
            <h4>Visit the club</h4>
            <p>{address}</p>
            <a
              className="text-link"
              href="https://www.google.com/maps/search/?api=1&query=Guntur+Club+Palakaluru+Road"
              target="_blank"
              rel="noreferrer"
            >
              Get directions
              <ArrowUpRight size={16} />
            </a>
            <h4>Call us</h4>
            <a href="tel:08632233703">0863 2233 703</a>
            <a href="tel:08632355241">0863 2355 241</a>
            <h4>Email us</h4>
            <a href="mailto:info@gunturclub.com">info@gunturclub.com</a>
          </div>
        </div>
        <div>
          <h3>Send an enquiry</h3>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
