import Pill from './Pill'

const ExitKeyMessage: React.FC = () => {
  return (
    <div className="flex space-x-1">
      <div>Press</div>
      <Pill>Escape</Pill>
      <div>to exit</div>
    </div>
  )
}

export default ExitKeyMessage