import "../../index.css";
import TrainersSection from "./TrainersSection";
import PackagesSection from "./PackagesSection";
import HomeIntro from "./HomeIntro";
import ExplainSection from "./ExplainSection";
import WhyEliteSyncSection from "./WhyEliteSyncSection";
import FeedbackSection from "./FeedbackSection";
import FooterSection from "./FooterSection";

function Home() {
  return (
    <div>
      <HomeIntro />
      <ExplainSection />
      <TrainersSection />
      <PackagesSection />
      <WhyEliteSyncSection />
      <FeedbackSection />
      <FooterSection />
    </div>
  );
}

export default Home;
