// Increase timeout for async operations
jest.setTimeout(10000)

import '@testing-library/jest-dom'
import { TextDecoder, TextEncoder } from 'util'
import messages from './messages/es.json'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver

// Mock IntersectionObserver
class IntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.IntersectionObserver = IntersectionObserver

// Helper function to get nested value from object using dot notation
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
}

// Mock next-intl hooks
jest.mock('next-intl', () => ({
  useTranslations: (namespace) => (key, params = {}) => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    const value = getNestedValue(messages, fullKey);

    if (typeof value === 'string') {
      return Object.entries(params).reduce((str, [param, value]) => {
        return str.replace(`{${param}}`, value);
      }, value);
    }

    return fullKey;
  },
  useFormatter: () => ({
    dateTime: () => 'mocked date',
    number: () => 'mocked number',
  }),
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }
  },
  usePathname() {
    return '';
  },
}))

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />
  },
}))

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})
