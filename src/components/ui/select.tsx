import * as React from "react"
import { ChevronDown, Check } from "lucide-react"

import { cn } from "@/lib/utils"

interface SelectProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  children: React.ReactNode
  className?: string
  id?: string
  disabled?: boolean
}

interface SelectItemProps {
  value: string
  children: React.ReactNode
  onSelect?: () => void
}

const SelectContext = React.createContext<{
  value?: string
  onSelect: (value: string) => void
  onClose: () => void
}>({ onSelect: () => {}, onClose: () => {} })

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ value, onChange, placeholder, children, className, id, disabled, ...props }) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [selectedValue, setSelectedValue] = React.useState(value || "")
    const selectRef = React.useRef<HTMLDivElement>(null)
    const dropdownRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
      setSelectedValue(value || "")
    }, [value])

    const handleSelect = (itemValue: string) => {
      setSelectedValue(itemValue)
      onChange?.(itemValue)
      setIsOpen(false)
    }

    const handleClose = () => {
      setIsOpen(false)
    }

    // Close dropdown when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [isOpen])

    // Position dropdown properly on mobile
    React.useEffect(() => {
      if (isOpen && dropdownRef.current && selectRef.current) {
        const selectRect = selectRef.current.getBoundingClientRect()
        const dropdownRect = dropdownRef.current.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        const spaceBelow = viewportHeight - selectRect.bottom
        const spaceAbove = selectRect.top

        // If there's not enough space below and more space above, show dropdown above
        if (spaceBelow < dropdownRect.height && spaceAbove > spaceBelow) {
          dropdownRef.current.style.bottom = '100%'
          dropdownRef.current.style.top = 'auto'
          dropdownRef.current.style.marginBottom = '4px'
          dropdownRef.current.style.marginTop = '0'
        } else {
          dropdownRef.current.style.top = '100%'
          dropdownRef.current.style.bottom = 'auto'
          dropdownRef.current.style.marginTop = '4px'
          dropdownRef.current.style.marginBottom = '0'
        }
      }
    }, [isOpen])

    const selectedItem = React.Children.toArray(children).find(
      (child): child is React.ReactElement<SelectItemProps> => 
        React.isValidElement(child) && 
        typeof child.props === 'object' && 
        child.props !== null && 
        'value' in child.props && 
        child.props.value === selectedValue
    )

    return (
      <SelectContext.Provider value={{ value: selectedValue, onSelect: handleSelect, onClose: handleClose }}>
        <div className="relative" ref={selectRef} {...props}>
          <button
            type="button"
            id={id}
            className={cn(
              "flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            disabled={disabled}
          >
            <span className={selectedValue ? "" : "text-muted-foreground"}>
              {selectedItem ? selectedItem.props.children : placeholder || "Select..."}
            </span>
            <ChevronDown className={cn("h-4 w-4 opacity-50 transition-transform", isOpen && "rotate-180")} />
          </button>
          {isOpen && (
            <div
              ref={dropdownRef}
              className="absolute left-0 right-0 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
              role="listbox"
            >
              {children}
            </div>
          )}
        </div>
      </SelectContext.Provider>
    )
  }
)
Select.displayName = "Select"

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ value, children, onSelect, ...props }, ref) => {
    const context = React.useContext(SelectContext)
    const isSelected = context.value === value

    const handleClick = () => {
      context.onSelect(value)
      onSelect?.()
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          isSelected && "bg-accent text-accent-foreground"
        )}
        onClick={handleClick}
        role="option"
        aria-selected={isSelected}
        {...props}
      >
        {children}
        {isSelected && (
          <Check className="absolute right-2 h-4 w-4" />
        )}
      </div>
    )
  }
)
SelectItem.displayName = "SelectItem"

export { Select, SelectItem }