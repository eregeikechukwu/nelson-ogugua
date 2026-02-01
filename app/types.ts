export type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

export type FormError = {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  message?: string | null;
};

export type InputFieldProps = {
  title: string;
  id: string;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  formData: FormData;
  error: FormError | undefined;
  clearFieldError: (field: keyof FormError) => void;
};