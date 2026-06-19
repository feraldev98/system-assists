import { useEffect, useRef, useState, useCallback } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { HiXMark } from "react-icons/hi2";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { Title } from "../../atoms/title";

function ModalScanner({ onScan, closeModal }) {
  const scannerRef = useRef(null);
  const isProcessingRef = useRef(false);
  const [cameraError, setCameraError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastScanned, setLastScanned] = useState(null);

  const stableOnScan = useCallback(
    (code) => onScan(code),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    const scanner = new Html5Qrcode("reader");
    scannerRef.current = scanner;

    Html5Qrcode.getCameras()
      .then(async (devices) => {
        if (!devices.length) {
          setCameraError("No se encontró ninguna cámara disponible.");
          setIsLoading(false);
          return;
        }

        const backCamera =
          devices.find((d) => d.label.toLowerCase().includes("back")) ||
          devices.find((d) => d.label.toLowerCase().includes("rear")) ||
          devices[0];

        await scanner.start(
          backCamera.id,
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            // Evitar escaneos duplicados en ráfaga
            if (isProcessingRef.current) return;
            isProcessingRef.current = true;

            setLastScanned(decodedText);
            stableOnScan(decodedText);

            // Desbloquear después de 2s para poder escanear otro
            setTimeout(() => {
              isProcessingRef.current = false;
            }, 2000);
          }
        );

        setIsLoading(false);
      })
      .catch(() => {
        setCameraError("No se pudo acceder a la cámara. Verifique los permisos.");
        setIsLoading(false);
      });

    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, [stableOnScan]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 border border-blue/20">
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 text-blue hover:text-red-500 transition-colors"
        >
          <HiXMark size={28} />
        </button>

        <div className="flex items-center gap-3 text-blue mb-4">
          <MdOutlineQrCodeScanner size={36} />
          <div>
            <Title level="h3" weight="bold" text="Escanear asistencia" />
            <p className="text-gray-500 text-sm">
              Apunte la cámara hacia el QR del estudiante.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-blue/20 p-4 bg-gray-50 min-h-[280px] flex items-center justify-center">
          {isLoading && !cameraError && (
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <div className="w-8 h-8 border-4 border-blue/30 border-t-blue rounded-full animate-spin" />
              <p className="text-sm">Iniciando cámara...</p>
            </div>
          )}
          {cameraError && (
            <div className="flex flex-col items-center gap-2 text-center text-red-500">
              <MdOutlineQrCodeScanner size={36} className="opacity-50" />
              <p className="text-sm font-medium">{cameraError}</p>
              <p className="text-xs text-gray-400">
                Asegúrese de conceder permisos de cámara en su navegador.
              </p>
            </div>
          )}
          <div id="reader" className={isLoading || cameraError ? "hidden" : "w-full"} />
        </div>

        {/* Último escaneado */}
        {lastScanned && (
          <div className="mt-4 flex items-center gap-2 bg-green-50 border border-green-200 rounded-2xl px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <p className="text-green-700 text-sm font-medium">
              Último escaneado:{" "}
              <span className="font-mono font-bold">{lastScanned}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export { ModalScanner };