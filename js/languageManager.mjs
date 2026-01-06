const switchLanguageButtons = document.querySelectorAll(
  ".switch-language-button"
);

const renderPageInPreferredLanguage = () => {
  const preferredLanguage =
    localStorage.getItem("preferredLanguage") ?? "english";
  const variableLanguageElements = {
    english: document.querySelectorAll("body [lang='en']"),
    simplifiedChinese: document.querySelectorAll("body [lang='zh']"),
  };
  const currentPageName = window.location.pathname.replace(".html", "");
  const PAGE_TITLES = {
    "/": {
      english: "Intellex | Join our waitlist to get matched to a career mentor",
      simplifiedChinese: "Intellex | 职业导师配对",
    },
    "/privacy-policy": {
      english: "Intellex | Privacy Policy",
      simplifiedChinese: "Intellex | 隐私政策",
    },
    "/terms-and-conditions": {
      english: "Intellex | Terms and Conditions",
      simplifiedChinese: "Intellex | 条款与条件",
    },
  };

  if (
    !(preferredLanguage in variableLanguageElements) ||
    !(currentPageName in PAGE_TITLES)
  )
    return;

  const updatePageTitle = () =>
    (document.title = PAGE_TITLES[currentPageName][preferredLanguage]);

  const updateLanguageButton = () =>
    switchLanguageButtons.forEach((button) => {
      if (button.dataset.language === preferredLanguage)
        button.classList.add("selected");
      else button.classList.remove("selected");
    });

  const displayElements = () => {
    for (const [language, elements] of Object.entries(
      variableLanguageElements
    )) {
      if (language === preferredLanguage)
        elements.forEach((element) => (element.style.display = "block"));
      else elements.forEach((element) => (element.style.display = "none"));
    }
  };

  // run
  updatePageTitle();
  updateLanguageButton();
  displayElements();
};

const handleLanguageSwitch = (e) => {
  const preferredLanguage = e.target.dataset.language;
  localStorage.setItem("preferredLanguage", preferredLanguage);

  renderPageInPreferredLanguage();
};

const enableLanguageSwitch = () =>
  switchLanguageButtons.forEach((button) =>
    button.addEventListener("click", handleLanguageSwitch)
  );

export { enableLanguageSwitch, renderPageInPreferredLanguage };
