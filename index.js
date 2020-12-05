
var fs = require("fs")
var src = JSON.parse(fs.readFileSync("src-doc.json"))
var out

function write(text)
{
	fs.writeSync(out, text)
}

function format(ret)
{
	ret = ret.replace("[", "")
	ret = ret.replace("]", " | nil")
	if(ret.indexOf("...") != -1)
	{
		ret = ret.replace("...", "")
		ret = "..." + ret
	}
	
	return ret;
}

function genfunc(mod)
{
	write(`--- ${mod.doc}\n`)
	var args = []
	for(let arg in mod.args)
	{
		var data = mod.args[arg]
		arg = arg.replace("[", "")
		arg = arg.replace("]", "")
		arg = arg.replace(" ", "_")
		arg = arg.replace("-", "_")

		data.doc = data.doc.replace("\n", "\\n");

		if (arg == "...")
		{
			write(`---@vararg ${data.type} @ ${data.doc}\n`)
		}
		else
			write(`---@param ${arg} ${data.type} @ ${data.doc}\n`)
		args.push(arg)
	}

	if(mod.returns != "nil")
		write(`---@return ${format(mod.returns)}\n`);
	
	write(`function ${mod.name}(`)

	for(let i = 0; i < args.length; ++i)
	{
		let arg = args[i]
		write(arg)
		if(i != args.length - 1)
		{
			write(", ")
		}
	}
	
	write(`) end\n\n`)
}

function genmod(module)
{
	write(`--- ${module.doc}\n`)
	write(`---@class ${module.name}\n`)

	for(let property in module.properties)
	{
		let data = module.properties[property]
		if(data.type == "field")
		{
			write(`---@param ${data.name} ${data.type} @ ${data.doc}\n`)
		}
	}

	write(`_G.${module.name} = { }\n`)

	for(let property in module.properties)
	{
		let data = module.properties[property]
		if(data.type == "function")
		{
			data.name = `${module.name}.${data.name}`
			genfunc(data)
		}
	}
}

if (!fs.existsSync("doc"))
	fs.mkdirSync("doc");
for(name in src)
{
	out = fs.openSync("doc/" + name + ".lua", "w");
	let module = src[name]
	
	if(module.type == "aliases")
	{
		for(let i = 0; i < module.aliases.length; ++i)
		{
			let name = module.aliases[i][0]
			let alias = module.aliases[i][1]
			write(`---@alias ${name} ${alias}`)
		}
	}
	else if (module.type == "function")
		genfunc(module)
	else if (module.type == "field")
		genmod(module)
	

	fs.closeSync(out);
}