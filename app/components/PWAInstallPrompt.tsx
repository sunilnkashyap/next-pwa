'use client'

import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

// Detect iOS Safari
const isIOS = () => {
  if (typeof window === 'undefined') return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
}

// Detect if already installed (standalone mode)
const isStandalone = () => {
  if (typeof window === 'undefined') return false
  return (
    (window.navigator as any).standalone === true ||
    window.matchMedia('(display-mode: standalone)').matches
  )
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOSDevice, setIsIOSDevice] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [showIOSInstructions, setShowIOSInstructions] = useState(false)

  useEffect(() => {
    const ios = isIOS()
    const installed = isStandalone()
    setIsIOSDevice(ios)
    setIsInstalled(installed)

    // Don't show prompt if already installed
    if (installed) return

    // For iOS, show instructions after a delay
    if (ios) {
      const timer = setTimeout(() => {
        setShowIOSInstructions(true)
      }, 2000)
      return () => clearTimeout(timer)
    }

    // For other browsers, listen for beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    } else {
      console.log('User dismissed the install prompt')
    }

    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  // Don't show anything if already installed
  if (isInstalled) return null

  // Show iOS instructions
  if (isIOSDevice && showIOSInstructions) {
    return (
      <div className="fixed bottom-4 left-4 right-4 z-50 rounded-lg bg-black p-4 text-white shadow-lg md:left-auto md:right-4 md:max-w-md">
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-lg">Install App on iPhone</p>
            <p className="text-sm text-gray-300 mt-1">
              Add this app to your home screen for quick access
            </p>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs">
                1
              </span>
              <p className="text-gray-200">
                Tap the <span className="font-semibold">Share</span> button
                <svg
                  className="inline-block w-4 h-4 mx-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
                at the bottom of your screen
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs">
                2
              </span>
              <p className="text-gray-200">
                Scroll down and tap{' '}
                <span className="font-semibold">"Add to Home Screen"</span>
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs">
                3
              </span>
              <p className="text-gray-200">
                Tap <span className="font-semibold">"Add"</span> to confirm
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowIOSInstructions(false)}
            className="w-full rounded bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200 transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
    )
  }

  // Show standard install prompt for other browsers
  if (!showPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 rounded-lg bg-black p-4 text-white shadow-lg md:left-auto md:right-4 md:w-auto">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-semibold">Install App</p>
          <p className="text-sm text-gray-300">
            Install this app on your device for a better experience
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowPrompt(false)}
            className="rounded px-3 py-1 text-sm text-gray-300 hover:text-white"
          >
            Not now
          </button>
          <button
            onClick={handleInstallClick}
            className="rounded bg-white px-4 py-1 text-sm font-semibold text-black hover:bg-gray-200"
          >
            Install
          </button>
        </div>
      </div>
    </div>
  )
}
