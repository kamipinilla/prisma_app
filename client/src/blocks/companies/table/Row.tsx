import ListItem from '../../../widgets/ListItem'

interface Props {
  firstCol: string
  secondCol: string

  isHeader?: boolean
  onClick?: () => void
}

const Row: React.FC<Props> = props => {
  const {
    firstCol,
    secondCol,
    onClick,
  } = props
  
  const isHeader = props.isHeader ?? false

  return (
    <ListItem onClick={onClick} bgColor={isHeader ? 'bg-gray-200' : undefined}>
      <div className={'grid grid-cols-4 gap-4' + (isHeader ? ' font-bold' : '')}>
        <div>{firstCol}</div>
        <div className="col-span-3">{secondCol}</div>
      </div>
    </ListItem>
  )
}

export default Row