import { useCallback, useEffect, useRef, useState } from 'react'
import ReactSelect, { SelectInstance } from 'react-select'

interface TagItem<IdType> {
  value: IdType
  label: string
}

interface Props<ItemType, IdType> {
  selectedItemsIds: IdType[]

  onSelectedItemsIdsChange: (items: IdType[]) => void

  getItems: () => Promise<ItemType[]>
  getItemId: (item: ItemType) => IdType
  getItemDisplayName: (item: ItemType) => string

  onKeyDown?: (key: string) => void
  onTriggeredFocusDone?: () => void
  placeholder?: string
  autofocus?: boolean
  triggerFocus?: boolean
}

type ReactSelectItems = any

function SelectMultiple<ItemType, IdType extends string | number>(props: Props<ItemType, IdType>) {
  const {
    selectedItemsIds,
    onSelectedItemsIdsChange,

    getItems,
    getItemId,
    getItemDisplayName,

    onTriggeredFocusDone,
    onKeyDown,
    placeholder,
    autofocus,
  } = props
  
  const triggerFocus = props.triggerFocus ?? false
  const reactSelectRef = useRef<SelectInstance<TagItem<IdType>> | null>(null)

  useEffect(function onTriggerFocusChange() {
    if (triggerFocus && reactSelectRef && reactSelectRef.current) {
      reactSelectRef.current.focus()
      if (onTriggeredFocusDone) {
        onTriggeredFocusDone()
      }
    }
  }, [triggerFocus, onTriggeredFocusDone])

  const itemToTagItem = useCallback((item: ItemType): TagItem<IdType> => ({
    value: getItemId(item),
    label: getItemDisplayName(item),
  }), [getItemId, getItemDisplayName])

  const [allItems, setAllItems] = useState<ItemType[] | null>(null)
  useEffect(function updateAllItems() {
    getItems().then(setAllItems)
  }, [getItems])

  const handleTagItemsChange = useCallback((selectItems: ReactSelectItems) => {
    const selectedTagItems: TagItem<IdType>[] = selectItems
    const selectedIds = selectedTagItems.map(tagItem => tagItem.value)
    onSelectedItemsIdsChange(selectedIds)
  }, [onSelectedItemsIdsChange])

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    const key = event.key
    if (onKeyDown) {
      onKeyDown(key)
    }
  }, [onKeyDown])

  const allDisplayItems = allItems ? allItems.map(itemToTagItem) : []
  const selectedTagItems = allDisplayItems.filter(item => selectedItemsIds.includes(item.value))
  return (
    <div>
      <ReactSelect
        ref={reactSelectRef}
        
        isMulti
        value={selectedTagItems}
        onChange={handleTagItemsChange}
        options={allDisplayItems}
        onKeyDown={onKeyDown && handleKeyDown}

        placeholder={placeholder}
        autoFocus={autofocus} />
    </div>
  )
}

export default SelectMultiple