export function RotatingSVG() {
  return (
    <svg viewBox="30 30 140 140" className="w-full h-full">
      {/* <!-- Center image --> */}
      <image
        href="/images/profile.png"
        x="50"
        y="50"
        width="100"
        height="100"
      />

      {/* <!-- Rotating text --> */}
      <g className="rotatingText">
        <defs>
          <path
            id="circlePath"
            d="M 100,100 m -60,0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
          />
        </defs>

        <text className="circleText" textAnchor="middle">
          <textPath href="#circlePath" startOffset="50%" lengthAdjust="spacing">
            BRAND&nbsp;&nbsp;AND&nbsp;&nbsp;PRODUCT&nbsp;&nbsp;DESIGNER
          </textPath>
        </text>
      </g>
    </svg>
  );
}
