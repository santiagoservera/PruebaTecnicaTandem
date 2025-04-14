// Importar las interfaces de configuración
import type { FieldConfig } from "@/interfaces/fieldConfig";

// Configuración inicial del formulario
export const initialFormConfig: FormConfig[] = [
  {
    formTitle: "Registro de Usuario",
    fields: [
      {
        name: "nombre",
        label: "Nombre y Apellido",
        type: "text",
        default: "",
        maxLength: 50,
        required: true,
        validations: [
          {
            type: "required",
            message: "El nombre es obligatorio.",
          },
          {
            type: "minLength",
            value: 3,
            message: "El nombre debe tener al menos 3 caracteres.",
          },
          {
            type: "complex",
            rules: {
              noNumbers: true,
            },
            message: "El nombre no debe contener números.",
          },
          {
            type: "regex",
            pattern: "^[a-zA-ZáéíóúÁÉÍÓÚ\\s]+$",
            message: "El nombre solo puede contener letras y espacios.",
          },
        ],
      },
      {
        name: "mail",
        label: "Mail",
        type: "email",
        default: "",
        maxLength: 30,
        required: true,
        validations: [
          {
            type: "required",
            message: "El mail es obligatorio.",
          },
          {
            type: "regex",
            pattern: "^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
            message: "El formato del mail es inválido.",
          },
        ],
      },
      {
        name: "codArea",
        label: "Código de Área",
        type: "text",
        default: "",
        maxLength: 4,
        required: true,
        validations: [
          {
            type: "required",
            message: "El código de área es obligatorio.",
          },
          {
            type: "maxLength",
            value: 4,
            message: "El código de área debe tener 4 dígitos.",
          },
        ],
      },
      {
        name: "telefono",
        label: "Teléfono",
        type: "tel",
        default: "",
        required: true,
        validations: [
          {
            type: "required",
            message: "El teléfono es obligatorio.",
          },
          {
            type: "minLength",
            value: 7,
            message: "El teléfono debe tener 7 dígitos.",
          },
        ],
      },
      {
        name: "vivienda",
        label: "Tipo de Vivienda",
        type: "select",
        default: "",
        required: true,
        options: [
          { label: "Casa", value: "casa" },
          { label: "Departamento", value: "departamento" },
        ],
        validations: [
          {
            type: "required",
            message: "Seleccionar el tipo de vivienda es obligatorio.",
          },
        ],
      },
      // {
      //   name: "ejemplo",
      //   label: "ejemplo add",
      //   type: "text",
      //   default: "",
      //   maxLength: 10,
      //   required: true,
      //   validations: [
      //     {
      //       type: "required",
      //       message: "El ej de la casa es obligatorio.",
      //     },
      //   ],
      // },
    ],
  },
];

// Crear una copia reactiva de la configuración inicial
import { ref } from "vue";
export const formConfig = ref<FormConfig[]>(
  JSON.parse(JSON.stringify(initialFormConfig))
);

// Función para obtener el campo condicional según el tipo de vivienda
export function getConditionalField(viviendaType: string): FieldConfig | null {
  if (viviendaType === "casa") {
    return {
      name: "numeroCasa",
      label: "Numeración de la Casa",
      type: "text",
      default: "",
      maxLength: 10,
      required: true,
      validations: [
        {
          type: "required",
          message: "La numeración de la casa es obligatoria.",
        },
      ],
    };
  } else if (viviendaType === "departamento") {
    return {
      name: "numeroDepartamento",
      label: "Número de Departamento",
      type: "text",
      default: "",
      maxLength: 10,
      required: true,
      validations: [
        {
          type: "required",
          message: "El número de departamento es obligatorio.",
        },
      ],
    };
  }
  return null;
}

// Función para actualizar la configuración del formulario con campos condicionales
export function updateFormConfig(viviendaType: string): void {
  // Restaurar la configuración inicial
  formConfig.value = JSON.parse(JSON.stringify(initialFormConfig));

  // Obtener el campo condicional
  const conditionalField = getConditionalField(viviendaType);

  // Si hay un campo condicional, añadirlo a la configuración
  if (conditionalField) {
    formConfig.value[0].fields.push(conditionalField);
  }
}
