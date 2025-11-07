export interface WidgetDefinition {
  id: string;
  version?: string;
  parameters?: Record<string, string>;
  sharedParameters?: Record<string, string>;
  state?: string;
}

export interface Button {
  label: string;
  value: string;
}

export type ButtonType = 'DEFAULT' | 'DELETE' | 'NUMBER' | 'ACTION';
