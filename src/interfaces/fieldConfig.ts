export interface FieldOption {
  label: string;
  value: string;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "email" | "select";
  options?: (string | FieldOption)[];
  maxLength?: number;
  required?: boolean;
  default: string;
  validations?: ValidationRule[];
}

export interface ValidationRule {
  type: "required" | "minLength" | "maxLength" | "regex" | "complex";
  message: string;
  value?: number;
  pattern?: string;
  rules?: {
    noNumbers?: boolean;
  };
}
