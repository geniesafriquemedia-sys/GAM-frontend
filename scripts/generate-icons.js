const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const inputFile = path.join(__dirname, '../public/images/logo.png');
const outputDir = path.join(__dirname, '../public/icons');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('🎨 Génération des icônes PWA avec Sharp...\n');

Promise.all(
  sizes.map(size =>
    sharp(inputFile)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(path.join(outputDir, `icon-${size}x${size}.png`))
      .then(() => console.log(`✅ Généré: icon-${size}x${size}.png`))
      .catch(err => console.error(`❌ Erreur pour ${size}x${size}:`, err.message))
  )
).then(() => {
  console.log('\n✨ Toutes les icônes PWA ont été générées avec succès!');
  console.log(`📁 Emplacement: ${outputDir}\n`);
}).catch(err => {
  console.error('\n❌ Erreur lors de la génération:', err);
});
