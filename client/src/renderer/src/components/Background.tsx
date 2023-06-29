export default function Background() {
  return (
    <div className="w-screen h-screen absolute top-0 left-0 z-20 bg-gradient-to-t from-neutral-950 via-zinc-950 to-gray-950 bg-opacity-10">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" version="1.1" opacity={0.4}>
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
            rx="149"
            ry="249.5"
            cx="168.0704066384616"
            cy="439.7667910661276"
            fill="hsla(270, 49%, 20%, 1.00)"
          ></ellipse>
          <ellipse
            rx="300"
            ry="249.5"
            cx="308.06611098044823"
            cy="34.54235951688278"
            fill="hsla(270, 54%, 15%, 1.00)"
          ></ellipse>
          <ellipse
            rx="149"
            ry="249.5"
            cx="704.3464965820312"
            cy="169.07562255859375"
            fill="hsla(270, 40%, 20%, .9)"
          ></ellipse>
        </g>
      </svg>
    </div>
  )
}
