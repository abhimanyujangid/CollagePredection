import { Controller, Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

type NumberFormFieldProps = {
    control: Control<any>;
    name: string;
    label: string;
    placeholder?: string;
    loading?: boolean;
};

const NumberFormField: React.FC<NumberFormFieldProps> = ({ control, name, label, placeholder,loading }) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            type="number"
                            placeholder={placeholder}
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            loading={loading}
                        />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
            )}
        />
    );
};

export default NumberFormField;
