import { Controller, Control } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

type TextareaFormFieldProps = {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
};

const TextareaFormField: React.FC<TextareaFormFieldProps> = ({ control, name, label, placeholder }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} className="resize-none" {...field} />
          </FormControl>
         <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};

export default TextareaFormField;
