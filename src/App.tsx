import React, { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Toggle } from './components/ui/toggle'
import { Menu } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent
} from './components/ui/dropdown-menu'
import { DropdownMenuShortcut } from './components/ui/dropdown-menu'
import { Button } from './components/ui/button'
type Edge = {
  id: string
  money: number
}

const colorPalette2025 = [
  '#D2042D', // Cherry Red
  '#6B498F', // Aura Indigo
  '#7E9B76', // Dill Green
  '#D2C1A5', // Alpine Oat
  '#8B645A', // Mocha Mousse
  '#A3B5C9' // Serene Blues and Greens
]
const mockEdges: Edge[] = [
  { id: '20', money: 20000 },
  { id: '50', money: 50000 },
  { id: '30', money: 200000 },
  { id: '100', money: 100000 },
  { id: '500', money: 500000 },
  { id: '10', money: 10000 }
]

const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-between w-full p-4 border-b">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        2025
      </h3>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Menu className="h-6 w-6 cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4 w-64">
          <DropdownMenuLabel className="flex flex-col">
            Happy New Year
            <span className="mt-2">Một sản phẩm của Phúc</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => console.log('hit me')}>
              Rút Quẻ Đầu Năm
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Vòng Quay Gia Đình
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Vòng Quay Bạn Bè
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* </Toggle> */}
    </div>
  )
}
const Edge: React.FC = () => {
  return <div className="h-">tEST</div>
}
const WheelPicker: React.FC = () => {
  const [randomDegree, setRandomDegree] = useState(360)
  const curDeg = useRef(360)
  const length = mockEdges.length
  const degPerPart = 360 / length

  const getScore = () => {
    const index = 0
  }
  const startSpinAnimation = () => {
    const luckyNumber = Math.floor(Math.random() * mockEdges.length) + 1
    console.log(luckyNumber)

    curDeg.current = curDeg.current + ((360 / length) * luckyNumber + 1440 * 3)
    setTimeout(() => {
      getScore()
    }, 7000)
  }
  return (
    // wrapper
    <div className="relative">
      {/* wheel */}
      <div
        className="relative h-[320px] w-[320px] bg-red-400 m-auto mt-7 rounded-full overflow-hidden"
        style={{
          transition: 'transform 7s',
          transform: `rotate(${curDeg.current - 360 / mockEdges.length / 2}deg)`
        }}
      >
        {mockEdges.map((edge, idx) => {
          const color =
            colorPalette2025[
            Math.floor(Math.random() * colorPalette2025.length)
            ]
          return (
            <div
              className="absolute top-1/2 w-1/2"
              key={idx}
              style={{
                height:
                  Math.tan(((degPerPart / 2) * Math.PI) / 180) * 100 + '%',
                // Math.tan(((degPerPart / 2) * Math.PI) / 100) * 100 + '%',
                transform: `translateY(-50%) rotate(${idx * degPerPart * -1}deg)`,
                transformOrigin: 'center right',
                clipPath: 'polygon(0 0, 0 100%, 100% 50%)',
                backgroundColor: color
              }}
            >
              <span className="w-full h-full pr-16 pl-4 flex items-center text-red-500 text-sm font-bold">
                {edge.money.toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'VND'
                })}
              </span>
            </div>
          )
        })}
      </div>
      <div className="absolute top-[38%] left-1/2 w-7 h-10 border-b-[35px] border-x-[15px] border-x-transparent rounded-full border-b-red-500 -translate-x-1/2 -translate-y-1/2"></div>
      <Button
        className="rounded-sm mt-6"
        variant="secondary"
        onClick={startSpinAnimation}
      >
        Quay
      </Button>
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-background/95 w-full h-full">
      <Header />
      <WheelPicker />
    </div>
  )
}

export default App
