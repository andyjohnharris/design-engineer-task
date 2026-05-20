// NOTE:
// Created this definition file to get around some eslint errors
// Just a temporary fix to focus on the task at hand

/// <reference types="vite/client" />

import 'react';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    inert?: string | boolean;
  }
}
