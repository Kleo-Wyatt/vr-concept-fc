import { DatePicker, Input, InputNumber, Select, TimePicker } from 'antd';
import type { ReactNode } from 'react';

import styles from './FormField.module.css';
import clsx from 'clsx';

export type FormFieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'tel'
  | 'url'
  | 'number'
  | 'textarea'
  | 'select'
  | 'date'
  | 'time';

export type FormFieldOption =
  | string
  | {
      value: string | number;
      label: ReactNode;
    };

export type FormFieldChangeEvent = {
  target: {
    name: string;
    value: unknown;
  };
};

export type FormFieldProps = {
  label?: string;
  name: string;
  type?: FormFieldType;
  value?: unknown;
  onChange?: (event: FormFieldChangeEvent) => void;
  required?: boolean;
  options?: FormFieldOption[];
  placeholder?: string;
  error?: string;
  rows?: number;
  className?: string;
  maxLength?: number;
  min?: number;
  max?: number;
};

function normalizeOptions(options: FormFieldOption[]) {
  return options.map((option) => {
    if (typeof option === 'string') {
      return {
        value: option,
        label: option,
      };
    }

    return option;
  });
}

export function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  options = [],
  placeholder = '',
  error = '',
  rows = 4,
  className = '',
  maxLength,
  min,
  max,
}: FormFieldProps) {
  const fieldClassName = clsx(styles.field, className);

  const emitChange = (nextValue: unknown) => {
    onChange?.({
      target: {
        name,
        value: nextValue,
      },
    });
  };

  const renderField = () => {
    if (type === 'textarea') {
      return (
        <Input.TextArea
          id={name}
          name={name}
          value={typeof value === 'string' ? value : ''}
          onChange={(event) => emitChange(event.target.value)}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          status={error ? 'error' : undefined}
        />
      );
    }

    if (type === 'number') {
      return (
        <InputNumber
          id={name}
          name={name}
          value={typeof value === 'number' ? value : undefined}
          onChange={emitChange}
          placeholder={placeholder}
          className={styles.fullWidth}
          min={min}
          max={max}
          status={error ? 'error' : undefined}
        />
      );
    }

    if (type === 'select') {
      return (
        <Select
          value={value || undefined}
          onChange={emitChange}
          placeholder={placeholder || 'Выберите...'}
          options={normalizeOptions(options)}
          status={error ? 'error' : undefined}
        />
      );
    }

    if (type === 'date') {
      return (
        <DatePicker
          className={styles.fullWidth}
          placeholder={placeholder || 'Выберите дату'}
          status={error ? 'error' : undefined}
          onChange={(_, dateString) => emitChange(dateString)}
        />
      );
    }

    if (type === 'time') {
      return (
        <TimePicker
          className={styles.fullWidth}
          placeholder={placeholder || 'Выберите время'}
          format="HH:mm"
          status={error ? 'error' : undefined}
          onChange={(_, timeString) => emitChange(timeString)}
        />
      );
    }

    return (
      <Input
        id={name}
        name={name}
        type={type}
        value={typeof value === 'string' ? value : ''}
        onChange={(event) => emitChange(event.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        status={error ? 'error' : undefined}
      />
    );
  };

  return (
    <div className={fieldClassName}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      {renderField()}

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
