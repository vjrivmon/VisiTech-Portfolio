import Hero from '@/components/home/Hero';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import TechStack from '@/components/home/TechStack';
import Timeline from '@/components/home/Timeline';
import CallToAction from '@/components/home/CallToAction';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <TechStack />
      <Timeline />
      <CallToAction />
    </>
  );
}