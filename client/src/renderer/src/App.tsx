import DefaultButton from './components/Lib/Buttons/Default'
import { Link } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'

export default function App() {
  return (
    <main className="w-screen h-screen bg-neutral-950 relative">
      {/* <Background /> */}
      <div className="w-full h-full flex justify-center items-center flex-col gap-y-4">
        <h1 className="text-[66px] text-neutral-200">Let's play a Song?</h1>
        <Link to={'/songs'}>
          <DefaultButton
            text="Explore"
            icon={{ asset: <BsArrowRight size={22} />, side: 'right' }}
          />
        </Link>
      </div>
    </main>
  )
}
