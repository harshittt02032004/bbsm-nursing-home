import Hero from "@/components/home/Hero";
import Statement from "@/components/home/Statement";
import Story from "@/components/home/Story";
import LineTransition from "@/components/home/LineTransition";
import Expertise from "@/components/home/Expertise";
import DoctorsPreview from "@/components/home/DoctorsPreview";
import PatientExperience from "@/components/home/PatientExperience";
import Facilities from "@/components/home/Facilities";
import Why from "@/components/home/Why";
import Voices from "@/components/home/Voices";
import Journal from "@/components/home/Journal";

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <Story />
      <LineTransition />
      <Expertise />
      <DoctorsPreview />
      <PatientExperience />
      <Facilities />
      <Why />
      <Voices />
      <Journal />
    </>
  );
}
