export function StaggerRevealText({ children = "", className = "" }) {
  return (
    <div className="stagger-reveal-container">
      {children.split(" ").map((item, i) => {
        return (
          <span key={`div-${i}`} className={`  paragraph-text  ${className}`}>
            <span key={`span-${i}`} className="word">
              {item}&nbsp;
            </span>
          </span>
        );
      })}
    </div>
  );
}
