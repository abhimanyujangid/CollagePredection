import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

type FormFieldProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    type?: string; // Optional type prop to specify input type
    loading?: boolean;
};

const FormFieldComponent = <T extends FieldValues>({ control, name, label, placeholder, type, loading }: FormFieldProps<T>) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input type={type || "text"} placeholder={placeholder} {...field} loading={loading}/>
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
            )}
        />
    );
};

export default FormFieldComponent;
