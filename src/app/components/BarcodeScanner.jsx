// import { useState, useRef, useEffect } from 'react';

// const BarcodeScanner = ({ onBarcodeScanned }) => {
//   const videoRef = useRef();

//   useEffect(() => {
//     const startScanner = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         videoRef.current.srcObject = stream;

//         const codeReader = new ZXing.BrowserBarcodeReader();
//         codeReader.decodeFromVideoDevice(undefined, videoRef.current, (result, err) => {
//           if (result) {
//             onBarcodeScanned(result.text);
//           } else {
//             console.error(err);
//           }
//         });
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     startScanner();

//     return () => {
//     };
//   }, [onBarcodeScanned]);

//   return (
//     <video ref={videoRef} playsInline autoPlay />
//   );
// };

// const IndexPage = () => {
//   const [scannedBarcode, setScannedBarcode] = useState('');

//   const handleBarcodeScanned = (barcode) => {
//     setScannedBarcode(barcode);

//     alert(`Barcode terpindai: ${barcode}`);
//   };

//   return (
//     <div>
//       <h1>Next.js Barcode Scanner</h1>
//       <BarcodeScanner onBarcodeScanned={handleBarcodeScanned} />
//       <p>Barcode terpindai: {scannedBarcode}</p>
//     </div>
//   );
// };

// export default BarcodeScanner;
