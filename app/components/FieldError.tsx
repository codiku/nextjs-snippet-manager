import { ErrorMessage } from "@hookform/error-message";

export function FieldError(p: { errors: any; name: string }) {
  return (
    <div className="text-red-500">
      <ErrorMessage errors={p.errors} name={p.name} />
    </div>
  );
}
