import { z } from 'zod';
import type { FormValues, FormErrors } from '@vue-composition-form/core';

export type Resolver = <T extends z.Schema<any, any>>(
  schema: T,
) => <Values extends FormValues = FormValues>(
  values: Values,
) => Promise<FormErrors<any> | void>;
