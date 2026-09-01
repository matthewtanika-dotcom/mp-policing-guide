/**
 * Icon Generator for MP Policing Guide
 * Creates 192x192 and 512x512 PNG icons on first load
 */

function generateAppIcons() {
  // Generate 192x192 icon
  generateIcon(192, 'icon-192.png');
  // Generate 512x512 icon
  generateIcon(512, 'icon-512.png');
  console.log('✓ App icons generated for home screen installation');
}

function generateIcon(size, filename) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#0A0A0A';
  ctx.fillRect(0, 0, size, size);

  // Gradient circle
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#C8102E');
  gradient.addColorStop(1, '#7A0D13');
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.45, 0, Math.PI * 2);
  ctx.fill();

  // Border
  ctx.strokeStyle = 'rgba(255,255,255,0.25)';
  ctx.lineWidth = Math.max(2, size / 96);
  ctx.stroke();

  // MP Text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold ${size * 0.45}px 'Barlow Condensed', sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = size * 0.05;
  ctx.fillText('MP', size / 2, size / 2 + size * 0.05);

  // Bottom accent line
  ctx.strokeStyle = '#F03A46';
  ctx.lineWidth = Math.max(3, size / 64);
  ctx.beginPath();
  ctx.moveTo(size * 0.26, size * 0.72);
  ctx.lineTo(size * 0.74, size * 0.72);
  ctx.stroke();

  // Convert to data URL and store
  const dataUrl = canvas.toDataURL('image/png');
  localStorage.setItem(filename, dataUrl);
}

// Run on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', generateAppIcons);
} else {
  generateAppIcons();
}
