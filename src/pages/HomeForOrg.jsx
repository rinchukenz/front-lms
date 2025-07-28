import React from "react";
 import HomeNavbarR from "../components/OrgHome-components/HomeNavbarR";
import HomeHeroR from "../components/OrgHome-components/HomeHeroR";
import DashboardDemo from "../components/OrgHome-components/DashboardDemo";
import WhyChooseLMS from "../components/OrgHome-components/WhyChooseLMS";
import EverythingYouNeed from "../components/OrgHome-components/EverythingYouNeed";
import EveryKindOfEducator from "../components/OrgHome-components/EveryKindOfEducator";
import EducatorsSaying from "../components/OrgHome-components/EducatorsSaying";
import LaunchLMS from "../components/OrgHome-components/LaunchLMS";
import FaqSection from "../components/OrgHome-components/FaqSection";

function HomeForOrg() {
  return (
    <div>
      <HomeNavbarR />
      <HomeHeroR />
      <DashboardDemo />
      <WhyChooseLMS />
      <EverythingYouNeed />
      <EveryKindOfEducator />
      <EducatorsSaying />
      <LaunchLMS />
      <FaqSection />
    </div>
  );
}

export default HomeForOrg;
