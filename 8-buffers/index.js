const buf = Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f]);
console.log(buf.toString());

const buffer = Buffer.alloc(100);
buffer.write('hello');
console.log(buffer.toString()); // Output: hello (with extra zero bytes at the end)
