import React from "react";
import ThemeItem from "./ThemeItem";

const THEMES = [
  { primaryColor: "deepskyblue", secondaryColor: "coral" },
  { primaryColor: "orchid", secondaryColor: "mediumseagreen" },
];

// 'theme' & 'setTheme' are passed in from use state hook declared in App.js
export default function ChangeTheme({ theme, setTheme }) {
  function isActive(t) {
    return (
      t.primaryColor === theme.primaryColor &&
      t.secondaryColor === theme.secondaryColor
    );
  }

  // render a link that is going to diplay both themes in the link; when onClick is called, it will use 'setTheme' to toggle between themes from THEMES[]
  return (
    <div>
      Change theme:
      {THEMES.map((t, i) => (
        <ThemeItem
          key={"theme-" + i}
          theme={t}
          active={isActive(t)}
          onClick={() => setTheme(t)}
        />
      ))}{" "}
    </div>
  );
}
