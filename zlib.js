const zlib = require('zlib');
const gzip = zlib.createGzip();
const fs = require('fs');
 const inp = fs.ReadStream('input.txt');
 const out = fs.WriteStream('input.txt.gz')
 inp.pipe(gzip).pipe(out);
 