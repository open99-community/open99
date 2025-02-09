import asc from "assemblyscript/asc";

const { error, stdout, stderr, stats} = asc.main([
    "assembly/index.ts",
])