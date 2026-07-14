import React from 'react';
import { Reveal } from '../ui/Reveal';
import Hero from '../components/sections/Hero';
import HeroBanner from '../components/sections/HeroBanner';
import FeaturedCollections from '../components/sections/FeaturedCollections';
import IntroSection from '../components/sections/IntroSection';
import NewPlants from '../components/sections/NewPlants';
import IndoorCollectionGrid from '../components/sections/IndoorCollectionGrid';
import MonthlyContest from '../components/sections/MonthlyContest';
import CuratedGoods from '../components/sections/CuratedGoods';
import FaqSection from '../components/sections/FaqSection';

export default function HomeView() {
  return (
    <>
      <Reveal><Hero /></Reveal>
      <Reveal><HeroBanner /></Reveal>
      <Reveal><FeaturedCollections /></Reveal>
      <Reveal><IntroSection /></Reveal>
      <Reveal><NewPlants /></Reveal>
      <Reveal><MonthlyContest /></Reveal>
      <Reveal><IndoorCollectionGrid /></Reveal>
      <Reveal><CuratedGoods /></Reveal>
      <Reveal><FaqSection /></Reveal>
    </>
  );
}
