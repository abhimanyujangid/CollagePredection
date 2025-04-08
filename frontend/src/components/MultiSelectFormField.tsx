import { useState } from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, ChevronDown } from "lucide-react";
import clsx from "clsx";

type MultiSelectFormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: string[];
  placeholder?: string;
  disabled?: boolean;
};

const MultiSelectFormField = <T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder = "Select options",
  disabled = false,
}: MultiSelectFormFieldProps<T>) => {
  const [open, setOpen] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const selectedValues: string[] = field.value || [];

        const toggleOption = (option: string) => {
          let updated: string[];
          if (selectedValues.includes(option)) {
            updated = selectedValues.filter((val) => val !== option);
          } else {
            updated = [...selectedValues, option];
          }
          field.onChange(updated);
        };

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                    disabled={disabled}
                  >
                    {selectedValues.length > 0
                      ? selectedValues.join(", ")
                      : placeholder}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full max-h-60 overflow-y-auto p-2 space-y-1">
                  {options.map((option) => {
                    const selected = selectedValues.includes(option);
                    return (
                      <div
                        key={option}
                        onClick={() => toggleOption(option)}
                        className={clsx(
                          "flex items-center justify-between py-1 px-2 rounded cursor-pointer",
                          selected ? "bg-muted font-medium" : "hover:bg-gray-100"
                        )}
                      >
                        <span>{option}</span>
                        <Checkbox checked={selected} readOnly />
                      </div>
                    );
                  })}
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage>{fieldState.error?.message}</FormMessage>
          </FormItem>
        );
      }}
    />
  );
};

export default MultiSelectFormField;
