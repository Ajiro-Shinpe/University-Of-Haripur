import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaDownload } from 'react-icons/fa';

const InstallPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if the app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || 
        window.navigator.standalone === true) {
      setIsInstalled(true);
      return;
    }

    // Check if the app was previously installed
    const wasInstalled = localStorage.getItem('appInstalled');
    if (wasInstalled) {
      setIsInstalled(true);
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    // Listen for successful installation
    const handleAppInstalled = () => {
      setIsInstalled(true);
      localStorage.setItem('appInstalled', 'true');
      setShowPrompt(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Show prompt after a short delay if not installed
    const timer = setTimeout(() => {
      if (!isInstalled && !localStorage.getItem('installPromptShown')) {
        setShowPrompt(true);
        localStorage.setItem('installPromptShown', 'true');
      }
    }, 3000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      clearTimeout(timer);
    };
  }, [isInstalled]);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        localStorage.setItem('appInstalled', 'true');
      }
      setDeferredPrompt(null);
    }
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Show again after 24 hours
    setTimeout(() => {
      localStorage.removeItem('installPromptShown');
    }, 24 * 60 * 60 * 1000);
  };

  if (isInstalled) return null;

  return (
    <Modal
      show={showPrompt}
      onHide={handleDismiss}
      centered
      backdrop="static"
      className="install-prompt-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <FaDownload className="me-2" />
          Install Exam Portal
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Install the Exam Portal app for a better experience:</p>
        <ul>
          <li>Quick access from your home screen</li>
          <li>Works offline after first visit</li>
          <li>Faster loading times</li>
          <li>Better exam experience</li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleDismiss}>
          Maybe Later
        </Button>
        <Button variant="primary" onClick={handleInstall}>
          Install Now
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InstallPrompt; 