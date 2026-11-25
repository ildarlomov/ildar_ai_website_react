import Landing from "@/components/Landing";
import JsonLd from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd lang="en" page="home" />
      <Landing lang="en" />
    </>
  );
}
