import {
  ControllerProps,
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
  useForm,
  useFormContext,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export function InputField({
  className,
  name,
  label,
  as,
  ...rest
}: {
  name: string;
  label: string;
  as?: typeof Textarea | typeof Input;
} & DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) {
  const form = useFormContext();
  const InputComponent = as || Input;
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <InputComponent {...field} className={className} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
      {...rest}
    />
  );
}
