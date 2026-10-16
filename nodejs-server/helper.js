async function parseBody(req, { limitBytes = 1e6 } = {}) {
  const chunks = [];
  let totalSize = 0;

  for await (const chunk of req) {
    totalSize += chunk.length;
    if (totalSize > limitBytes) {
      throw Object.assign(new Error('Payload Too Large'), { statusCode: 413 });
    }
    chunks.push(chunk);
  }

  const rawBuffer = Buffer.concat(chunks);
  const rawString = rawBuffer.toString('utf-8');
  const contentType = req.headers['content-type'] || '';

  if (contentType.includes('application/json')) {
    return JSON.parse(rawString);
  }
  if (contentType.includes('application/x-www-form-urlencoded')) {
    return Object.fromEntries(new URLSearchParams(rawString));
  }
  return rawString; // Plain text or fallback
}

module.exports = parseBody