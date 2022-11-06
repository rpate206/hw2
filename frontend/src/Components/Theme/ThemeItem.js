// accepting 'theme', 'active' & 'onClick' from ChangeTheme component
// Take primary color from 'theme' and set as Primary; take secondary color from 'theme' and set as Secondary
// set currently active theme to 'bold' and inactive them to 'normal'
export default function ThemeItem({ theme, active, onClick }) {
  return (
    <span
      onClick={onClick}
      style={{
        cursor: "pointer",
        paddingLeft: 8,
        fontWeight: active ? "bold" : "normal",
      }}
    >
      <span style={{ color: theme.primaryColor }}>Primary</span> /
      <span style={{ color: theme.secondaryColor }}>Secondary</span>
    </span>
  );
}
