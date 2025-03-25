export default {
  files: '{test/**/*.test.js,test/real-component-tests/**/*.test.js}',
  nodeResolve: true,
  playwright: {
    browsers: ['chromium', 'firefox', 'webkit'],
  },
  coverage: true,
  coverageConfig: {
    include: [
      'src/components/**/*.js',
      'test/**/*.js'
    ],
    exclude: [
      'src/components/**/*.test.js',
      'test/**/*.test.js',
      'src/translations/**/*.js',
      'src/config/**/*.js',
      'src/**/index.js',
      'test/test-utils/**/*.js'
    ],
    threshold: {
      statements: 40,
      branches: 40,
      functions: 20,
      lines: 40,
    },
    reportDir: 'coverage',
  },
  plugins: [
    {
      name: 'process-polyfill',
      transform(context) {
        if (context.response.is('js')) {
          return { 
            code: `
              // Polyfill process
              if (typeof process === 'undefined') {
                window.process = { 
                  env: { NODE_ENV: 'development' },
                  nextTick: (fn) => setTimeout(fn, 0),
                  browser: true
                };
              }
              
              // Handle immer
              if (typeof window !== 'undefined') {
                window.process = window.process || {};
                window.process.env = window.process.env || {};
                window.process.env.NODE_ENV = window.process.env.NODE_ENV || 'development';
                window.process.browser = true;
              }
              
              ${context.body}
            `
          };
        }
      }
    }
  ],
  testFramework: {
    config: {
      globals: {
        process: { 
          env: { NODE_ENV: 'development' },
          nextTick: (fn) => setTimeout(fn, 0),
          browser: true
        }
      }
    }
  },
  testRunnerHtml: testFramework => `
    <html>
      <head>
        <script>
          // Global process definition
          window.process = { 
            env: { NODE_ENV: 'development' },
            nextTick: (fn) => setTimeout(fn, 0),
            browser: true
          };
        </script>
        <script type="module">
          import { installOverrides } from './test/test-utils/override-imports.js';
          installOverrides();
        </script>
        <script type="module" src="${testFramework}"></script>
      </head>
      <body></body>
    </html>
  `,
}; 