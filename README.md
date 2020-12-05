
# CC-EmmyLua-Docs

This little node js program is made to automaticly create a ComputerCraft API EmmyLua compatible Documentation for VSCode from [MCJack123's](https://github.com/MCJack123/vscode-computercraft/blob/master/data/classes.json) documentation.

# Generate Docs

Run on command line: (npm needed)

```
npm install
node .
```

or download release.

Put files somewhere static (e.g. `~/depot/cc-autocomplete`)

# Usage in VSCode

Install: [Sumenko's Lua Language Server](https://marketplace.visualstudio.com/items?itemName=sumneko.lua)

Add this setting to your settings.json file:
```json

	"Lua.workspace.library": {
		"/home/<username>/depot/cc-autocomplete": true
	},
```

Enjoy autocompletion.

# Credits

- Documentation `src-doc` was taken from [MCJack123/vscode-computercraft](https://github.com/MCJack123/vscode-computercraft/blob/master/data/classes.json) and modified by Sewbacca.