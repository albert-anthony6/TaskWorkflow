import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { router } from '../routes/router';
import { useAppSelector } from '../store/configureStore';
import Carousel from 'react-multi-carousel';
import './LandingPage.scss';
import 'react-multi-carousel/lib/styles.css';
import IconLogo from '../assets/icons/icon_logo.svg?react';
import IconCheckbox from '../assets/icons/icon_checkbox.svg?react';
import IconArrowRight from '../assets/icons/icon_arrow_right.svg?react';
import IconStars from '../assets/icons/icon_stars.svg?react';

export default function LandingPage() {
  const { currentUser } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (currentUser?.token) {
      router.navigate(`/user/${currentUser?.id}`);
    }
  }, [currentUser]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const slides = [
    {
      review:
        "I've tried several task management apps, but TaskWorkflow stands out with its simplicity and powerful features. It helps me stay focused and productive every day.",
      caption: 'William Parker | Strategist at Serenity',
      image: 'william_parker.png'
    },
    {
      review:
        'As a team leader, TaskWorkflow has been a game-changer. The ability to assign tasks and track progress within the app has significantly improved our project efficiency.',
      caption: 'Susan Smith | CEO at Enterprise',
      image: 'susan_smith.png'
    },
    {
      review:
        "TaskWorkflow has made my work life so much easier. I can prioritize tasks, set deadlines, and collaborate with my team seamlessly. It's a must-have tool for anyone serious about productivity!",
      caption: 'Emilia Carter | Account Manager at Moonlit',
      image: 'emilia_carter.png'
    },
    {
      review:
        "I've been using TaskWorkflow for months now, and it's become indispensable. From managing personal tasks to coordinating team projects, it's intuitive, efficient, and keeps everything organized beautifully.",
      caption: 'Jose Valentino | Developer at Hooli',
      image: 'jose_valentino.png'
    }
  ];

  return (
    <main className="landing-page">
      <nav className="header">
        <IconLogo className="header--logo" />
        <ul className="header--links">
          <li>
            <Link to="/register">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
      <section className="hero-section">
        <div className="hero-section--text">
          <h1>
            Instantly <span className="highlight">manage</span> your daily{' '}
            <span className="highlight">tasks.</span>
          </h1>
          <p>
            A great place for your remote team to construct, track, manage, and release your work in
            an organized way.
          </p>
          <Link to="/register">
            <button className="button__primary">Get Started</button>
          </Link>
        </div>
        <img
          className="hero-image"
          src="/assets/images/hero_image.png"
          alt="Task Workflow home page."
        />
      </section>
      <section className="free-section">
        <h2>Forever Free!</h2>
        <ul className="free-section--benefits">
          <li>
            <IconCheckbox /> No Payments
          </li>
          <li>
            <IconCheckbox /> Intuitive
          </li>
          <li>
            <IconCheckbox /> User-Friendly
          </li>
        </ul>
      </section>
      <section className="about-section">
        <div className="about-section--group">
          <img src="/assets/images/simple_task_management.jpg" />
          <div className="about-section--group--text">
            <h2>Simple task management</h2>
            <p>
              Task management with Team is as simple as it gets. No complicated layout and need for
              user training. Your team members will intuitively know how to navigate the platform.
              It’s so simple!
            </p>
            <Link to="/login">
              Learn More <IconArrowRight />
            </Link>
          </div>
        </div>
        <div className="about-section--group">
          <img src="/assets/images/collaboration.jpg" />
          <div className="about-section--group--text">
            <h2>Collaborate with ease</h2>
            <p>
              TaskWorkflow strives to make collaboration between team members a breeze. Anyone can
              see who is in a certain project and who has been assigned a task. You can even lookup
              user profiles with our search feature!
            </p>
            <Link to="/login">
              Learn More <IconArrowRight />
            </Link>
          </div>
        </div>
        <div className="about-section--group">
          <img src="/assets/images/more_coming.jpg" />
          <div className="about-section--group--text">
            <h2>We're not done yet</h2>
            <p>
              Soon, TaskWorkflow will release even more features. These features would make it so
              much simpler for work to get done on time. We'll be including the ability for users to
              chat in real-time, mention other users in comments, and even assigned teams within a
              project!
            </p>
            <Link to="/login">
              Learn More <IconArrowRight />
            </Link>
          </div>
        </div>
      </section>
      <section className="review-section">
        <h2 className="review-section--title">Take it From Our Existing Customers</h2>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={['tablet', 'mobile']}
          dotListClass="carousel-dots"
        >
          {slides.map((slide) => (
            <div className="carousel-slide" key={slide.caption}>
              <div className="review-section__left">
                <IconLogo className="logo__white" />
                <p>{slide.review}</p>
                <div className="caption">{slide.caption}</div>
                <IconStars />
              </div>
              <div className="review-section__right">
                <img src={`/assets/images/${slide.image}`} alt={slide.caption} />
              </div>
            </div>
          ))}
        </Carousel>
      </section>
      <section className="overview-section">
        <h2 className="overview-section--title">Everything at Your Finger Tips</h2>
        <img src="/assets/images/celebration.jpg" />
      </section>
      <section className="join-section">
        <h2 className="join-section--title">Join the Collaboration</h2>
        <Link to="/register">
          <button className="button__secondary">Get Started</button>
        </Link>
      </section>
    </main>
  );
}
