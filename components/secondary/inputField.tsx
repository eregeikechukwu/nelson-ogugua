import { FormData, FormError, InputFieldProps } from "@/app/types";
import { Title } from "./title";

export function InputField({
  title,
  id,
  setFormData,
  formData,
  error,
  clearFieldError,
}: InputFieldProps) {
  return (
    <div className="relative flex flex-col gap-12">
      <Title font={12}>{title}</Title>
      <div className="w-full">
        <input
          type={id === "email" ? "email" : "text"}
          id={id}
          placeholder={`Enter your ${title.toLowerCase()}`}
          onChange={(e) => {
            setFormData((prev: FormData) => ({
              ...prev,
              [id]: e.target.value,
            }));
            if (error?.[id as keyof FormData]) {
              clearFieldError(id as keyof FormError);
            }
          }}
          value={formData[id as keyof FormData]}
          className="input-field"
        />

        {error && error[id as keyof FormError] && (
          <p className="input-field-error">{error[id as keyof FormError]}</p>
        )}
      </div>
    </div>
  );
}
