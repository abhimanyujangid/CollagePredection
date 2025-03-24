import { Controller, ControllerProps } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface DropdownProps extends React.ComponentProps<typeof Select> {
    control: ControllerProps["control"];
    name: string;
    data: string[];
    placeholder: string;
    upperCase?: boolean;
}

const CustomDropdown = ({ control, data, placeholder,upperCase=false, name, ...props }: DropdownProps) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value || ""} {...props}>
                    <SelectTrigger ref={field.ref}>
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {data.map((item, index) => (
                            <SelectItem key={index} value={item}>
                                {upperCase ? item.toUpperCase() : item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}
        />
    );
};

export default CustomDropdown;
