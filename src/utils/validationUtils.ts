// Función para generar reglas de validación a partir de una lista de validaciones

export function generateRules(validations: any[]) {
  const rules: ((value: string) => true | string)[] = [];

  validations.forEach((validation) => {
    switch (validation.type) {
      case "required":
        rules.push((v) => !!v || validation.message);
        break;
      case "minLength":
        rules.push((v) => v?.length >= validation.value || validation.message);
        break;
      case "maxLength":
        rules.push((v) => v?.length <= validation.value || validation.message);
        break;
      case "regex":
        rules.push(
          (v) => new RegExp(validation.pattern).test(v) || validation.message
        );
        break;
      case "complex":
        if (validation.rules?.noNumbers) {
          rules.push((v) => !/\d/.test(v) || validation.message);
        }
        break;
    }
  });

  return rules;
}
