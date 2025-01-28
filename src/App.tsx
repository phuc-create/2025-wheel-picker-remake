import React, { useState } from 'react'
import './App.css'
import { Menu } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem
} from './components/ui/dropdown-menu'
import { DropdownMenuShortcut } from './components/ui/dropdown-menu'
import { Button } from './components/ui/button'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from './components/ui/alert-dialog'
import Confetti from 'react-confetti'

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
const familyData: Edge[] = [
  { id: '1', money: 20000 },
  { id: '2', money: 50000 },
  { id: '3', money: 200000 },
  { id: '4', money: 1000000 },
  { id: '5', money: 500000 },
  { id: '6', money: 100000 }
]

const friendData: Edge[] = [
  { id: '1', money: 20000 },
  { id: '2', money: 10000 },
  { id: '3', money: 5000 },
  { id: '4', money: 30000 },
  { id: '5', money: 50000 },
  { id: '6', money: 0 }
]

const Header: React.FC<{ setMode: (f: boolean) => void }> = ({ setMode }) => {
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
            <DropdownMenuItem onClick={() => setMode(false)}>
              Vòng Quay Gia Đình
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setMode(true)}>
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
const WheelPicker: React.FC<{ data: Edge[] }> = ({ data }) => {
  const [randomDegree, setRandomDegree] = useState(0)
  // const isOpen = useRef(false)
  const [isOpen, setIsOpen] = useState(false)
  const [moneyReceived, setMoneyReceived] = useState(0)
  const length = data.length
  const degPerPart = 360 / length

  const getScore = (cur: number) => {
    // const i = Math((cur % 360) / degPerPart) % length
    const i =
      (Math.ceil((((cur + 90) % 360) % 360) / degPerPart + 0.5) - 1 + length) %
      length

    setMoneyReceived(() => i)
    console.log(i)
    setIsOpen(() => true)
  }
  const startSpinAnimation = () => {
    const luckyNumber = Math.floor(Math.random() * length)
    let curdeg = 0

    setRandomDegree(pre => {
      curdeg = pre + (degPerPart * luckyNumber + 360 * 7)
      return pre + (degPerPart * luckyNumber + 360 * 7 + 180)
    })
    setTimeout(() => {
      getScore(curdeg)
    }, 7000)
  }

  return (
    // wrapper
    <div className="relative overflow-hidden">
      {/* wheel */}
      <div
        className="relative h-[320px] w-[320px] bg-red-400 m-auto mt-7 rounded-full overflow-hidden"
        style={{
          transition: 'transform 7s',
          transform: `rotate(${randomDegree - degPerPart / 2}deg)`
        }}
      >
        {data.map((edge, idx) => {
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
      <div className="absolute top-[40%] left-1/2 w-7 h-10 border-b-[35px] border-x-[15px] border-x-transparent rounded-full border-b-red-500 -translate-x-1/2 -translate-y-1/2"></div>
      <Button
        className="rounded-sm mt-12"
        variant="secondary"
        onClick={startSpinAnimation}
      >
        Quay
      </Button>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="overflow-hidden">
          <Confetti tweenDuration={5000} />
          <AlertDialogHeader>
            <AlertDialogTitle>Horray</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn nhận được <br />
              <h1 className="text-3xl font-semibold">
                {data[moneyReceived].money.toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'VND'
                })}
              </h1>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function App() {
  const [isFriendMode, setIsFriendMode] = useState(false)
  const setMode = (isFriend: boolean) => {
    setIsFriendMode(() => isFriend)
  }
  return (
    <div className="bg-background/95 w-full h-full">
      <Header setMode={setMode} />
      <WheelPicker data={isFriendMode ? friendData : familyData} />
    </div>
  )
}

export default App
