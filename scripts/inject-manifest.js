// scripts/inject-manifest.js
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'dist', 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('❌ Không tìm thấy dist/index.html. Bạn đã chạy build chưa?');
  process.exit(1);
}

let html = fs.readFileSync(indexPath, 'utf8');

// chèn manifest + SW nếu chưa có
if (!html.includes('rel="manifest"')) {
  html = html.replace(
    '</head>',
    '  <link rel="manifest" href="/manifest.json">\n</head>'
  );
}

if (!html.includes('navigator.serviceWorker.register')) {
  html = html.replace(
    '</body>',
    `<script>
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(console.error);
  });
}
</script>
</body>`
  );
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('✅ Manifest + Service Worker đã được chèn vào dist/index.html');
