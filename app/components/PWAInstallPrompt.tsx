'use client'

import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
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
