import {
  inject,
  getCurrentInstance,
  InjectionKey,
  WritableComputedRef,
} from 'vue';
import { FieldValidator, FieldProps } from '../types';

function injectMaybeSelf<T>(
  key: InjectionKey<T>,
  def: T | undefined = undefined,
): T | undefined {
  const vm = getCurrentInstance() as any;
  return vm?.provides[key as any] || inject(key, def);
}

export interface FromContextValuse {
  registerField: (
    name: string,
    options: { validate?: FieldValidator<any> },
  ) => void;

  registerFieldArray: (
    name: string,
    options: { validate?: FieldValidator<any>; reset: () => void },
  ) => void;

  getFieldValue: <Value>(name: string) => WritableComputedRef<Value>;
  getFieldProps: (name: string) => FieldProps;
  setFieldValue: (name: string, value: any) => void;
}

export const FormContextKey: InjectionKey<FromContextValuse> = Symbol(
  'vue-composition-form',
);

export function useFormContext() {
  const context = injectMaybeSelf(FormContextKey) as FromContextValuse;
  return context;
}