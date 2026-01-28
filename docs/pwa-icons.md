# PWA Icon Requirements

## Required Icons

To complete the PWA setup, you need to add the following icon files to the `public/` directory:

1. **`public/icon-192x192.png`** - 192x192 pixels
2. **`public/icon-512x512.png`** - 512x512 pixels

## Icon Specifications

- **Format**: PNG (recommended) or any format supported by browsers
- **Sizes**: 
  - Small icon: 192x192 pixels (minimum for Android)
  - Large icon: 512x512 pixels (recommended for all platforms)
- **Design**: 
  - Icons should be square
  - Important content should be centered
  - Avoid text or fine details that won't be visible at small sizes
  - Use high contrast for better visibility

## Tools to Generate Icons

You can use the following tools to generate PWA icons:

1. **PWA Asset Generator** - [GitHub](https://github.com/onderceylan/pwa-asset-generator)
   - Command-line tool that generates all required PWA assets from a single source image
   - Usage: `npx pwa-asset-generator <source-image> <output-directory>`

2. **RealFaviconGenerator** - [Website](https://realfavicongenerator.net/)
   - Web-based tool that generates icons for multiple platforms
   - Supports PWA manifest icons

3. **Favicon.io** - [Website](https://favicon.io/)
   - Simple tool to generate favicons and app icons
   - Can create PWA-compatible icons

4. **PWA Builder Image Generator** - [Website](https://www.pwabuilder.com/imageGenerator)
   - Specialized tool for generating PWA assets

## Quick Start

1. Create or find a square source image (at least 512x512 pixels)
2. Use one of the tools above to generate the required icon sizes
3. Place the generated `icon-192x192.png` and `icon-512x512.png` files in the `public/` directory
4. The manifest file (`app/manifest.ts`) is already configured to reference these icons

## Verification

After adding the icons, you can verify they're working by:

1. Building the project: `npm run build`
2. Starting the production server: `npm start`
3. Opening browser DevTools → Application tab → Manifest
4. Checking that the icons are listed and accessible

## Additional Icon Sizes (Optional)

For better device support, you can also add:
- `icon-144x144.png` - Windows tiles
- `icon-256x256.png` - Additional Android support
- `icon-384x384.png` - Additional Android support

If you add more icon sizes, update the `icons` array in `app/manifest.ts`.
