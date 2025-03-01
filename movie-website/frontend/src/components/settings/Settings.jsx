import React from "react";
import { MdLanguage, MdOutlineCategory } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { MOVIE_CATEGORY, TV_CATEGORY } from "../../appCategory";
import { setCategory } from "../../app/features/appCategory/appCategorySlice";
import { useTranslation } from "react-i18next";

function Settings() {
  const { i18n, t } = useTranslation();
  const languages = [
    { code: "en", lang: "English" },
    { code: "es", lang: "Spanish" },
    { code: "fr", lang: "French" },
  ];
  const appCategory = useSelector((state) => state.appCategory);
  const dispatch = useDispatch();
  const categoryHandler = (category) => {
    dispatch(setCategory(category));
  };

  const changeLanguageHandler = (langCode) => {
    i18n.changeLanguage(langCode);
  };
  return (
    <div className="flex flex-col bg-neutral-200 dark:bg-neutral-900 py-2 px-2 sm:px-6 text-sm sm:text-base rounded-2xl gap-4">
      <div className="choose-category flex items-center justify-between">
        <div className="feature flex gap-2 items-center">
          <MdOutlineCategory className="text-2xl" />
          <div className="title">{t("chooseCategory")}</div>
        </div>
        <div className="options flex gap-2 flex-wrap">
          <div
            onClick={() => categoryHandler(MOVIE_CATEGORY)}
            className={`px-2 py-1 ${
              appCategory === MOVIE_CATEGORY
                ? "bg-neutral-400 dark:bg-neutral-600"
                : "bg-neutral-300 dark:bg-neutral-800"
            }   flex items-center justify-center rounded-full border border-neutral-400 dark:border-neutral-700 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-600`}
          >
            Movies
          </div>
          <div
            onClick={() => categoryHandler(TV_CATEGORY)}
            className={`px-2 py-1 ${
              appCategory === TV_CATEGORY
                ? "bg-neutral-400 dark:bg-neutral-600"
                : "bg-neutral-300 dark:bg-neutral-800"
            }   flex items-center justify-center rounded-full border border-neutral-400 dark:border-neutral-700 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-600`}
          >
            TV Shows
          </div>
        </div>
      </div>
      <div className="choose-language flex items-center justify-between">
        <div className="feature flex gap-2 items-center">
          <MdLanguage className="text-2xl" />
          <div className="title">{t("chooseLanguage")}</div>
        </div>
        <div className="options flex gap-2 flex-wrap">
          {languages.map((language) => (
            <button
              onClick={() => changeLanguageHandler(language.code)}
              key={language.code}
              className={`px-2 py-1 ${
                i18n.language === language.code
                  ? "bg-neutral-400 dark:bg-neutral-600"
                  : "bg-neutral-300 dark:bg-neutral-800"
              } flex items-center justify-center rounded-full border border-neutral-400 dark:border-neutral-700 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-600`}
            >
              {language.lang}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Settings;
