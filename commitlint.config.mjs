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

// Squash-Merge-Commits von GitHub: PR-Titel (Keyword groß) + " (#<PR-Nummer>)",
// z. B. "Feature: #ENT-18: Update Docker setup (#12)". Diese werden nicht geprüft.
const SQUASH_MERGE = /^[A-Z][a-z]+: #[A-Z][A-Z0-9]*-[1-9]\d*: .+ \(#\d+\)$/;

export default {
  // Zusätzlich zu den Standard-Ignores (z. B. "Merge branch ...")
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
            'Header muss so aussehen: "feature: #ENT-13: Add Eslint to project" ' +
              '(Keyword klein, Ticket ohne führende Nullen, z. B. ENT-13)',
          ];
        },
        'body-refs-ticket': (parsed) => {
          if (!parsed.ticket) return [true];
          const re = new RegExp(`^Refs ${parsed.ticket}\\b`, 'm');
          return [
            re.test(parsed.raw || ''),
            `Body muss die Zeile "Refs ${parsed.ticket}" enthalten (Leerzeile nach dem Header)`,
          ];
        },
      },
    },
  ],

  rules: {
    'header-format': [2, 'always'],
    'body-refs-ticket': [2, 'always'],
    'type-enum': [2, 'always', TYPES],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
    'body-leading-blank': [2, 'always'],
  },
};
