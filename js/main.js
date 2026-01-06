import enableCTAs from "./enableCTAs.mjs";

const isHomepage = () => window.location.pathname === "/";

if (isHomepage()) enableCTAs();
