import * as React from "react"
import { ChevronDown, Check, Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchableSelectProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  options: { value: string; label: string }[]
  className?: string
  id?: string
  disabled?: boolean
}

const SearchableSelect = React.forwardRef<HTMLDivElement, SearchableSelectProps>(
  ({ 
    value, 
    onChange, 
    placeholder = "Select...", 
    searchPlaceholder = "Search...",
    options,
    className, 
    id, 
    disabled, 
    ...props 
  }) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [searchTerm, setSearchTerm] = React.useState("")
    const [selectedValue, setSelectedValue] = React.useState(value || "")
    const selectRef = React.useRef<HTMLDivElement>(null)
    const dropdownRef = React.useRef<HTMLDivElement>(null)
    const searchInputRef = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => {
      setSelectedValue(value || "")
    }, [value])

    // Focus search input when dropdown opens
    React.useEffect(() => {
      if (isOpen && searchInputRef.current) {
        searchInputRef.current.focus()
      }
    }, [isOpen])

    const handleSelect = (itemValue: string) => {
      setSelectedValue(itemValue)
      onChange?.(itemValue)
      setIsOpen(false)
      setSearchTerm("")
    }

    // Close dropdown when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setIsOpen(false)
          setSearchTerm("")
        }
      }

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [isOpen])

    // Position dropdown properly
    React.useEffect(() => {
      if (isOpen && dropdownRef.current && selectRef.current) {
        const selectRect = selectRef.current.getBoundingClientRect()
        const dropdownRect = dropdownRef.current.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        const spaceBelow = viewportHeight - selectRect.bottom
        const spaceAbove = selectRect.top

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

    // Filter options based on search term
    const filteredOptions = options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      option.value.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const selectedOption = options.find(option => option.value === selectedValue)

    return (
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
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className={cn("h-4 w-4 opacity-50 transition-transform", isOpen && "rotate-180")} />
        </button>
        
        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute left-0 right-0 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
            role="listbox"
          >
            {/* Search Input */}
            <div className="flex items-center border-b px-3 py-2">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <input
                ref={searchInputRef}
                className="flex h-6 w-full rounded-md bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Options List */}
            <div className="max-h-60 overflow-auto p-1">
              {filteredOptions.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  No results found.
                </div>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = selectedValue === option.value
                  return (
                    <div
                      key={option.value}
                      className={cn(
                        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        isSelected && "bg-accent text-accent-foreground"
                      )}
                      onClick={() => handleSelect(option.value)}
                      role="option"
                      aria-selected={isSelected}
                    >
                      {option.label}
                      {isSelected && (
                        <Check className="absolute right-2 h-4 w-4" />
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
)
SearchableSelect.displayName = "SearchableSelect"

export { SearchableSelect }