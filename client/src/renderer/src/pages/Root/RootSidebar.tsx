import { IoMdHeart } from 'react-icons/io'
import { MdHomeFilled, MdMusicNote, MdSettings } from 'react-icons/md'
import { Link } from 'react-router-dom'

export default function RootSidebar() {
  return (
    <div className="space-y-8 flex flex-col items-center">
      <button className="text-white ">
        <MdHomeFilled size={23} className="candle" />
      </button>
      <button className="text-woodsmoke-600">
        <MdMusicNote
          className="svg-shadow hover:text-neutral-200 transition-all ease-in-out duration-[400]"
          size={23}
        />
      </button>
      <Link to={'/liked'}>
        <button className="text-woodsmoke-600">
          <IoMdHeart
            className="svg-shadow hover:text-neutral-200 transition-all ease-in-out duration-[400]"
            size={23}
          />
        </button>
      </Link>
      <button className="text-woodsmoke-600">
        <MdSettings
          className="svg-shadow hover:text-neutral-200 transition-all ease-in-out duration-[400]"
          size={23}
        />
      </button>
    </div>
  )
}
