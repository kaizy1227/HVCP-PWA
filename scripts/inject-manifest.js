// scripts/inject-manifest.js
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'dist', 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('❌ Không tìm thấy dist/index.html. Bạn đã chạy build chưa?');
  process.exit(0); // để không fail build
}

let html = fs.readFileSync(indexPath, 'utf8');

// chèn manifest
if (!html.includes('rel="manifest"')) {
  html = html.replace(
    '</head>',
    '  <link rel="manifest" href="/manifest.json">\n</head>'
  );
}

// register service worker
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
console.log('✅ Manifest + SW đã được chèn vào dist/index.html');
