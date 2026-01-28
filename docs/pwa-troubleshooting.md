# PWA Troubleshooting Guide

## What Was Added

1. **Service Worker** (`public/sw.js`)
   - Required for PWA install prompts in most browsers
   - Provides basic caching functionality

2. **Service Worker Registration** (`app/components/ServiceWorkerRegistration.tsx`)
   - Automatically registers the service worker on page load

3. **Install Prompt Component** (`app/components/PWAInstallPrompt.tsx`)
   - Shows a custom install prompt when the browser's `beforeinstallprompt` event fires
   - Provides a fallback UI for installation

4. **Updated Manifest** (`app/manifest.ts`)
   - Added `scope` property
   - Added both `maskable` and `any` purpose icons for better browser compatibility

## Common Issues and Solutions

### 1. Manifest Not Accessible

**Issue**: `/manifest.json` returns 404 or is not accessible

**Solutions**:
- Verify `app/manifest.ts` exists and exports correctly
- Check that the build completed successfully
- Clear Vercel cache and redeploy
- Verify the route is accessible: `https://your-domain.com/manifest.json`

**Next.js Note**: The `manifest.ts` file should automatically be served at `/manifest.json`. If it's not working, try:
- Restarting the dev server
- Running `npm run build` locally to verify
- Checking Vercel build logs for errors

### 2. Service Worker Not Registering

**Issue**: Service worker fails to register

**Solutions**:
- Verify `public/sw.js` exists and is accessible
- Check browser console for errors
- Ensure the site is served over HTTPS (Vercel provides this automatically)
- Check that the service worker file is not blocked by browser extensions

**Test**: Open DevTools → Application → Service Workers to see registration status

### 3. Install Prompt Not Appearing

**Issue**: No install prompt appears

**Common Causes**:
- **Service Worker Missing**: Most browsers require a service worker for install prompts
- **Already Installed**: The app may already be installed
- **Browser Requirements**: Some browsers have specific requirements:
  - Chrome/Edge: Requires service worker + valid manifest
  - Safari iOS: Requires user to manually add to home screen (no automatic prompt)
  - Firefox: Has specific PWA requirements

**Solutions**:
- Ensure service worker is registered (check DevTools → Application → Service Workers)
- Verify manifest is valid (check DevTools → Application → Manifest)
- Wait a few seconds after page load for the prompt to appear
- Try in an incognito/private window
- Check that you haven't already installed the app

### 4. Icons Not Showing

**Issue**: Icons don't appear in the install prompt or home screen

**Solutions**:
- Verify icon files exist in `public/` directory:
  - `manifest-icon-192.maskable.png`
  - `manifest-icon-512.maskable.png`
  - `apple-icon-180.png`
- Check that icon paths in manifest match actual file names
- Verify icons are accessible via direct URL (e.g., `https://your-domain.com/manifest-icon-192.maskable.png`)
- Ensure icons are valid PNG files

## Testing Checklist

After deployment, verify:

- [ ] `/manifest.json` is accessible and returns valid JSON
- [ ] Service worker is registered (DevTools → Application → Service Workers)
- [ ] Manifest is valid (DevTools → Application → Manifest)
- [ ] Icons are accessible (check direct URLs)
- [ ] Install prompt appears (or custom prompt component shows)
- [ ] App can be installed successfully
- [ ] Installed app opens in standalone mode

## Browser-Specific Notes

### Chrome/Edge
- Requires service worker for install prompt
- Shows install button in address bar after criteria are met
- Custom install prompt component will also work

### Safari (iOS)
- Does not show automatic install prompts
- Users must manually add to home screen via Share menu
- Requires Apple touch icon (`apple-icon-180.png`)

### Firefox
- Has specific PWA requirements
- May show install prompt in address bar

## Debugging Steps

1. **Check Browser Console**
   - Look for service worker registration messages
   - Check for manifest loading errors
   - Verify no CORS or network errors

2. **Use DevTools**
   - Application tab → Manifest (verify manifest loads)
   - Application tab → Service Workers (check registration)
   - Application tab → Storage (verify cache is working)

3. **Test Manifest**
   - Visit `/manifest.json` directly
   - Use [Web Manifest Validator](https://manifest-validator.appspot.com/)
   - Check that all required fields are present

4. **Verify Icons**
   - Test direct access to icon URLs
   - Ensure icons are proper size and format
   - Check that icons load without errors

## Next Steps

If issues persist:
1. Check Vercel deployment logs for build errors
2. Verify all files were deployed correctly
3. Test locally with `npm run build && npm start`
4. Check browser compatibility requirements
5. Review Next.js PWA documentation for latest updates
