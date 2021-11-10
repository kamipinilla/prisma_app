import React, { useCallback, useEffect, useState } from 'react'
import ReactSelect from 'react-select'

interface TagItem<IdType> {
  value: IdType
  label: string
}

interface Props<ItemType, IdType> {
  selectedItemId: IdType

  onSelectedItemIdChange: (itemId: IdType) => void

  getItems: () => Promise<ItemType[]>
  getItemId: (item: ItemType) => IdType
  getItemDisplayName: (item: ItemType) => string

  onKeyDown?: (key: string) => void
  placeholder?: string
  autofocus?: boolean
}

type ReactSelectItem = any

function Select<ItemType, IdType extends string | number>(props: Props<ItemType, IdType>) {
  const {
    selectedItemId,
    onSelectedItemIdChange,

    getItems,
    getItemId,
    getItemDisplayName,

    onKeyDown,
    placeholder,
    autofocus,
  } = props

  const itemToTagItem = useCallback((item: ItemType): TagItem<IdType> => ({
    value: getItemId(item),
    label: getItemDisplayName(item),
  }), [getItemId, getItemDisplayName])

  const [allItems, setAllItems] = useState<ItemType[] | null>(null)
  useEffect(function updateAllItems() {
    getItems().then(setAllItems)
  }, [getItems])

  const handleTagItemChange = useCallback((selectItem: ReactSelectItem) => {
    const selectedTagItem: TagItem<IdType> = selectItem
    const selectedId = selectedTagItem.value
    onSelectedItemIdChange(selectedId)
  }, [onSelectedItemIdChange])

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    const key = event.key
    if (onKeyDown) {
      onKeyDown(key)
    }
  }, [onKeyDown])

  const allDisplayItems = allItems ? allItems.map(itemToTagItem) : []
  const selectedTagItem = allDisplayItems.filter(item => item.value === selectedItemId)
  return (
    <div>
      <ReactSelect
        value={selectedTagItem}
        onChange={handleTagItemChange}
        options={allDisplayItems}
        onKeyDown={onKeyDown && handleKeyDown}

        placeholder={placeholder}
        autoFocus={autofocus} />
    </div>
  )
}

export default Select