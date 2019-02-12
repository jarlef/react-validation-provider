# Changelog

## v0.1.17

### Breaking changes

- Rules will not receive null or undefined unless `handlesNull: true` (ref [required](https://github.com/jarlef/react-validation-provider/blob/master/src/rules/required.js)) rule. This prevents all rules from having to handle null and undefined.

### Added features

- Added a standard set of rules in src/rules. These rules can be imported using:

```javascript
import { required } from 'react-validation-provider/rules';
```

### Other features

- Code now complies to airbnb eslint rules.
- Linting is automatically performed during `npm run build`.
- Added `.editorconfig` and prettier to format code.
