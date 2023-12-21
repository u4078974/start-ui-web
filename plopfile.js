module.exports = function (plop) {
  // create your generators here
  plop.setGenerator('new-locale-file', {
    description: 'New locale module file',
    prompts: [
      {
        type: 'input',
        name: 'filename',
        message: 'Locale module to create name',
      },
    ],
    actions: ['ar', 'en', 'fr', 'sw'].flatMap((locale) => [
      {
        type: 'add',
        path: `src/locales/${locale}/{{filename}}.json`,
        data: {},
      },
      {
        type: 'append',
        path: `src/locales/${locale}/index.ts`,
        pattern: /\/\/ PLOP ADD NEW IMPORT HERE/gi,
        template: "import {{filename}} from './{{filename}}.json';",
      },
      {
        type: 'append',
        path: `src/locales/${locale}/index.ts`,
        pattern: /\/\/ PLOP ADD NEW EXPORT HERE/gi,
        template: '{{filename}},',
      },
    ]),
  });
};
