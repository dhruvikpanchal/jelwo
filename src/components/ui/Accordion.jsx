import { createContext, useContext, useState } from "react";
import { Plus, Minus } from "lucide-react";

const AccordionContext = createContext(null);

export function Accordion({
  type = "single",
  collapsible = true,
  value,
  defaultValue = null,
  onValueChange,
  children,
  className = "",
}) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const activeValue = value !== undefined ? value : internalValue;

  const toggleItem = (itemValue) => {
    let nextValue;
    if (type === "single") {
      if (activeValue === itemValue) {
        nextValue = collapsible ? null : activeValue;
      } else {
        nextValue = itemValue;
      }
    } else {
      const currentArray = Array.isArray(activeValue) ? activeValue : [];
      if (currentArray.includes(itemValue)) {
        nextValue = currentArray.filter((v) => v !== itemValue);
      } else {
        nextValue = [...currentArray, itemValue];
      }
    }

    if (value === undefined) {
      setInternalValue(nextValue);
    }
    if (onValueChange) {
      onValueChange(nextValue);
    }
  };

  return (
    <AccordionContext.Provider value={{ activeValue, toggleItem, type }}>
      <div className={`w-full divide-y divide-gray-200 border-t border-b border-gray-200 ${className}`}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

const AccordionItemContext = createContext(null);

export function AccordionItem({ value, children, className = "" }) {
  return (
    <AccordionItemContext.Provider value={{ value }}>
      <div className={`py-1 ${className}`}>{children}</div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({ children, className = "" }) {
  const { activeValue, toggleItem } = useContext(AccordionContext);
  const { value } = useContext(AccordionItemContext);
  const isOpen = activeValue === value;

  return (
    <button
      type="button"
      onClick={() => toggleItem(value)}
      className={`w-full py-4 sm:py-5 flex items-center justify-between text-left group transition-colors cursor-pointer select-none ${className}`}
      aria-expanded={isOpen}
    >
      <span className="text-[13.5px] sm:text-[14.5px] md:text-[15px] font-medium tracking-wide uppercase text-[#1c1b1b] group-hover:text-[#ca7b64] transition-colors pr-4 leading-relaxed font-sans">
        {children}
      </span>

      <span className="shrink-0 flex items-center justify-center text-gray-500 group-hover:text-[#ca7b64] transition-colors ml-2">
        {isOpen ? (
          <Minus className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.8] transition-transform duration-200" />
        ) : (
          <Plus className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.8] transition-transform duration-200" />
        )}
      </span>
    </button>
  );
}

export function AccordionContent({ children, className = "" }) {
  const { activeValue } = useContext(AccordionContext);
  const { value } = useContext(AccordionItemContext);
  const isOpen = activeValue === value;

  if (!isOpen) return null;

  return (
    <div
      className={`pb-5 pt-1 text-[13.5px] sm:text-[14px] text-gray-600 leading-relaxed font-normal animate-in fade-in slide-in-from-top-1 duration-200 ${className}`}
    >
      {children}
    </div>
  );
}

export default Accordion;
