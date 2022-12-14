import React, { useEffect } from "react";
import ThemeItem from "./ThemeItem";
import { useResource } from "react-request-hook";

// const THEMES = [
//   { primaryColor: "deepskyblue", secondaryColor: "coral" },
//   { primaryColor: "orchid", secondaryColor: "mediumseagreen" },
// ];

// 'theme' & 'setTheme' are passed in from use state hook declared in App.js
export default function ChangeTheme({ theme, setTheme }) {
  // replace hardcoded themes list with a Resource Hook to fetch themes from endpoint generated by json-server
  // define Resource hook for requesting Themes
  const [themes, getThemes] = useResource(() => ({
    url: "/themes",
    method: "get",
  }));

  // Effect hook for requesting todoList when component loads
  useEffect(getThemes, []);

  // destructure themes : 'data' contains array of json theme objects returned by API
  const { data, isLoading } = themes;

  function isActive(t) {
    return (
      t.primaryColor === theme.primaryColor &&
      t.secondaryColor === theme.secondaryColor
    );
  }

  // render a link that is going to diplay both themes in the link; when onClick is called, it will use 'setTheme' to toggle between themes from THEMES[]
  return (
    <div>
      {/* display message when network request is still in progress */}
      {isLoading && " Loading themes..."}
      Change theme:
      {/* update map method to iterate over 'data' instead of hardcoded Themes list */}
      {data &&
        data.map((t, i) => (
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
