import { NextPage } from 'next';
import { Metadata } from 'next';
import HomeComponent from '@/components/homeComponent/HomeComponent';

export const metadata: Metadata = {
  title: "Login",
  description: "Login page",
};

const Home: NextPage = () => {
  return (
    <HomeComponent/>
  );
};

export default Home;