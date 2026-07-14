import React from 'react';
import { Reveal } from '../ui/Reveal';
import Hero from '../components/sections/Hero';

const HeroBanner = React.lazy(() => import('../components/sections/HeroBanner'));
const FeaturedCollections = React.lazy(() => import('../components/sections/FeaturedCollections'));
const IntroSection = React.lazy(() => import('../components/sections/IntroSection'));
const NewPlants = React.lazy(() => import('../components/sections/NewPlants'));
const IndoorCollectionGrid = React.lazy(() => import('../components/sections/IndoorCollectionGrid'));
const MonthlyContest = React.lazy(() => import('../components/sections/MonthlyContest'));
const CuratedGoods = React.lazy(() => import('../components/sections/CuratedGoods'));
const FaqSection = React.lazy(() => import('../components/sections/FaqSection'));

export default function HomeView() {
  return (
    <>
      <Reveal><Hero /></Reveal>
      <React.Suspense fallback={<div className="h-screen bg-transparent" />}>
        <Reveal><HeroBanner /></Reveal>
        <Reveal><FeaturedCollections /></Reveal>
        <Reveal><IntroSection /></Reveal>
        <Reveal><NewPlants /></Reveal>
        <Reveal><MonthlyContest /></Reveal>
        <Reveal><IndoorCollectionGrid /></Reveal>
        <Reveal><CuratedGoods /></Reveal>
        <Reveal><FaqSection /></Reveal>
      </React.Suspense>
    </>
  );
}
