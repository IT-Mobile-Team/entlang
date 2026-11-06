const TYPES = [
  'build',
  'docs',
  'chore',
  'feature',
  'fix',
  'performance',
  'refactor',
  'revert',
  'security',
  'style',
  'test',
  'update',
];

// GitHub squash merge commits: PR title (capitalized keyword) + " (#<PR number>)",
// e.g. "Feature: #ENT-18: Update Docker setup (#12)". These are not linted.
const SQUASH_MERGE = /^[A-Z][a-z]+: #[A-Z][A-Z0-9]*-[1-9]\d*: .+ \(#\d+\)$/;

export default {
  // In addition to the default ignores (e.g. "Merge branch ...")
  ignores: [(message) => SQUASH_MERGE.test(message.split('\n')[0].trim())],

  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w+): #([A-Z][A-Z0-9]*-[1-9]\d*): (\[breaking-change\] )?(.+)$/,
      headerCorrespondence: ['type', 'ticket', 'breaking', 'subject'],
    },
  },

  plugins: [
    {
      rules: {
        'header-format': (parsed) => {
          const ok = Boolean(parsed.type && parsed.ticket && parsed.subject);
          return [
            ok,
            'Header must look like this: "feature: #ENT-13: Add Eslint to project" ' +
              '(lowercase keyword, ticket without leading zeros, e.g. ENT-13)',
          ];
        },
        'body-refs-ticket': (parsed) => {
          if (!parsed.ticket) return [true];
          const re = new RegExp(`^Refs ${parsed.ticket}\\b`, 'm');
          return [
            re.test(parsed.raw || ''),
            `Body should contain the line "Refs ${parsed.ticket}" (blank line after the header)`,
          ];
        },
      },
    },
  ],

  rules: {
    'header-format': [2, 'always'],
    'body-refs-ticket': [1, 'always'],
    'type-enum': [2, 'always', TYPES],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
    'body-leading-blank': [2, 'always'],
  },
};
