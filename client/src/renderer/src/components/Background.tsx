export default function Background() {
  return (
    <div className="w-screen h-screen fixed">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 800 800" opacity="0.81">
        <defs>
          <filter
            id="bbblurry-filter"
            x="-100%"
            y="-100%"
            width="400%"
            height="400%"
            filterUnits="objectBoundingBox"
            primitiveUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feGaussianBlur
              stdDeviation="130"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              in="SourceGraphic"
              edgeMode="none"
              result="blur"
            ></feGaussianBlur>
          </filter>
        </defs>
        <g filter="url(#bbblurry-filter)">
          <ellipse
            rx="150"
            ry="150"
            cx="252.47063202383637"
            cy="581.2655358439341"
            fill="hsla(185, 12%, 77%, 1.00)"
          ></ellipse>
          <ellipse
            rx="150"
            ry="150"
            cx="290.937744140625"
            cy="179.9987030029297"
            fill="hsla(340, 27%, 86%, 1.00)"
          ></ellipse>
          <ellipse
            rx="150"
            ry="150"
            cx="585.3543122775892"
            cy="623.8648710400646"
            fill="hsla(167, 35%, 82%, 1.00)"
          ></ellipse>
        </g>
      </svg>
    </div>
  )
}
