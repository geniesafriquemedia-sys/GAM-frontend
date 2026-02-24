const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Tailles de splash screens pour différents appareils
const SPLASH_SIZES = [
  // iPhone
  { width: 1242, height: 2688, name: 'iphone-xs-max' },
  { width: 1125, height: 2436, name: 'iphone-x' },
  { width: 828, height: 1792, name: 'iphone-xr' },
  { width: 1242, height: 2208, name: 'iphone-8-plus' },
  { width: 750, height: 1334, name: 'iphone-8' },
  
  // iPad
  { width: 2048, height: 2732, name: 'ipad-pro-12' },
  { width: 1668, height: 2388, name: 'ipad-pro-11' },
  { width: 1536, height: 2048, name: 'ipad-air' },
  
  // Android (générique)
  { width: 1080, height: 1920, name: 'android-fhd' },
  { width: 1440, height: 2560, name: 'android-qhd' },
];

const inputLogo = path.join(__dirname, '../public/images/logo.png');
const outputDir = path.join(__dirname, '../public/splash');

// Créer le dossier de sortie
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateSplashScreens() {
  console.log('🎨 Génération des splash screens PWA...\n');

  for (const size of SPLASH_SIZES) {
    try {
      // Créer un fond avec dégradé (simulé avec couleur unie)
      const background = await sharp({
        create: {
          width: size.width,
          height: size.height,
          channels: 4,
          background: { r: 255, g: 255, b: 255, alpha: 1 } // Fond blanc
        }
      }).png();

      // Redimensionner le logo (30% de la largeur du splash screen)
      const logoWidth = Math.floor(size.width * 0.3);
      const logo = await sharp(inputLogo)
        .resize(logoWidth, null, { 
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toBuffer();

      const logoMetadata = await sharp(logo).metadata();
      
      // Centrer le logo
      const left = Math.floor((size.width - logoMetadata.width) / 2);
      const top = Math.floor((size.height - logoMetadata.height) / 2);

      // Composer le splash screen
      const outputPath = path.join(outputDir, `splash-${size.name}.png`);
      await background
        .composite([{
          input: logo,
          left: left,
          top: top
        }])
        .png()
        .toFile(outputPath);

      console.log(`✅ ${size.name}: ${size.width}x${size.height}px`);
    } catch (error) {
      console.error(`❌ Erreur pour ${size.name}:`, error.message);
    }
  }

  console.log('\n✨ Splash screens générés avec succès!');
  console.log(`📁 Dossier: ${outputDir}\n`);
}

generateSplashScreens().catch(console.error);
