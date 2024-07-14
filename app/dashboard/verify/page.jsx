// "use client";

// import React, { useEffect, useState } from "react";
// import { useAccount } from "wagmi";
// import { Reclaim } from "@reclaimprotocol/js-sdk";
// import QRCode from "react-qr-code";
// import Options from "./Options";

// const AccountPage = () => {
//   const { address } = useAccount();
//   const [url, setUrl] = useState("");
//   const [proofVerified, setProofVerified] = useState(false);
//   const [selectedProofValue, setSelectedProofValue] = useState("LinkedIn");

//   //By default LinkedIn APP ID
//   let APP_ID = "0xcf6215e623818d0c4112a42E6d48B34B5507E19b";
//   //BY Default LinkedIn Provider ID
//   let providerId = "03cdff35-6c27-4626-8231-2b298c3538c0";
//   let AppSecret =
//     "0x4a8595336029aba9aada516be890c0046fde8cd3cd54e0723246eb0a80afc337";

//   if (selectedProofValue === "Github") {
//     APP_ID = "0xda8A667447350d646d90aB54DAcb04dB25730E12";
//     providerId = "c94476a0-8a75-4563-b70a-bf6124d7c59b";
//     AppSecret =
//       "0x7c07ef05bee71a8ac6de07f6d02140721f504ea4afddaba781089f4701adaf2f";
//   }

//   const reclaimClient = new Reclaim.ProofRequest(APP_ID);

//   async function generateVerificationRequest() {
//     await reclaimClient.buildProofRequest(providerId);

//     reclaimClient.setSignature(
//       await reclaimClient.generateSignature(AppSecret)
//     );

//     const { requestUrl, statusUrl } =
//       await reclaimClient.createVerificationRequest();

//     setUrl(requestUrl);

//     await reclaimClient.startSession({
//       onSuccessCallback: (proof) => {
//         console.log("Verification success", proof);
//         const { data } = proof.claimData;
//         console.log("Data : ", data);
//         setProofVerified(true);
//       },
//       onFailureCallback: (error) => {
//         console.error("Verification failed", error);
//       },
//     });
//   }

//   const handleValueChange = (value) => {
//     setSelectedProofValue(value);
//   };

//   useEffect(() => {
//     const runGenerateVerificationRequest = async () => {
//       await generateVerificationRequest();
//     };

//     runGenerateVerificationRequest();
//   }, [selectedProofValue]);

//   return (
//     <>
//       <div className="min-h-screen bg-gray-50 flex flex-col justify-start items-center p-6">
//         <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
//           <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
//             {proofVerified
//               ? "Proof Verified Successfully"
//               : "Verify Your Proof"}
//           </h1>
//           <p className="text-gray-600 text-center mb-4 ">
//             Verify your MetaMask account using Reclaim protocol. It is safe and
//             secure. Don't worry, we will not access your personal info. It is
//             totally secure.
//           </p>
//           {proofVerified && (
//             <h2 className="text-green-600 text-center mb-4">
//               Your proof with Kaggle has been verified!
//             </h2>
//           )}
//           <div className="flex flex-col items-center m-5">
//             {!url ? (
//               <button
//                 onClick={generateVerificationRequest}
//                 className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full mb-4 shadow-md transform transition duration-300 hover:scale-105"
//               >
//                 Create Claim QR Code
//               </button>
//             ) : (
//               <div className="mt-4">
//                 <QRCode value={url} size={200} />
//                 <p className="text-gray-600 text-center mt-4">
//                   Scan the QR code with your MetaMask wallet to verify your
//                   proof.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="min-h-screen bg-gray-50 flex flex-col justify-start items-center p-6">
//         <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
//           <div className="flex items-center justify-between mb-6">
//             <Options onValueChange={handleValueChange} />
//             <h1 className="flex-1 text-2xl font-bold text-gray-900 text-center">
//               {proofVerified
//                 ? "Proof Verified Successfully"
//                 : "Verify Your Proof"}
//             </h1>
//           </div>
//           <p className="text-gray-600 text-center mb-4 ">
//             Verify your MetaMask Account using Reclaim protocol. It is safe and
//             secure. Don't worry, we will not access your personal info. It is
//             totally secure.
//           </p>
//           {/*  */}

//           <div>Selected Value: {selectedProofValue}</div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AccountPage;

"use client";

import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Reclaim } from "@reclaimprotocol/js-sdk";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";
import Options from "./Options";

const AccountPage = () => {
  const router = useRouter();

  const { address } = useAccount();
  const [url, setUrl] = useState("");
  const [proofVerified, setProofVerified] = useState(false);
  const [selectedProofValue, setSelectedProofValue] = useState("LinkedIn");

  useEffect(() => {
    if (!address) {
      router.push("/dashboard");
    }
  }, [address, router]);

  // Function to get credentials based on selected proof value
  const getCredentials = (proofValue) => {
    // Default LinkedIn credentials
    let APP_ID = "0xcf6215e623818d0c4112a42E6d48B34B5507E19b";
    let providerId = "03cdff35-6c27-4626-8231-2b298c3538c0";
    let AppSecret =
      "0x4a8595336029aba9aada516be890c0046fde8cd3cd54e0723246eb0a80afc337";

    if (selectedProofValue === "LinkedIn") {
      APP_ID = "0xcf6215e623818d0c4112a42E6d48B34B5507E19b";
      providerId = "03cdff35-6c27-4626-8231-2b298c3538c0";
      AppSecret =
        "0x4a8595336029aba9aada516be890c0046fde8cd3cd54e0723246eb0a80afc337";
    }

    if (selectedProofValue === "Github") {
      APP_ID = "0x9Bc5b367367A8628850f89A44DAEd3627FAF5086";
      providerId = "eea88931-af56-471f-bbc0-5df8330e52f8";
      AppSecret =
        "0xf1a6d95f6c09255fb299156630801a5422ca754339dd6e53a335b2071051facc";
    }

    if (selectedProofValue === "Twitter") {
      APP_ID = "0x9F77Fd5dFeC57890C6ca76C3AEda4153a69b8247";
      providerId = "39c31ffd-0be0-4e45-9a18-1eb3cb8099e1";
      AppSecret =
        "0x6be19b524b1f16a3394f5ff4a8285742c1b353e2f921530f811067e1b97f14b6";
    }

    return { APP_ID, providerId, AppSecret };
  };

  const reclaimClient = new Reclaim.ProofRequest(
    getCredentials(selectedProofValue).APP_ID
  );

  async function generateVerificationRequest() {
    const { APP_ID, providerId, AppSecret } =
      getCredentials(selectedProofValue);
    const reclaimClient = new Reclaim.ProofRequest(APP_ID);

    try {
      await reclaimClient.buildProofRequest(providerId);
      reclaimClient.setSignature(
        await reclaimClient.generateSignature(AppSecret)
      );

      const { requestUrl } = await reclaimClient.createVerificationRequest();
      setUrl(requestUrl);

      if (requestUrl) {
        await reclaimClient.startSession({
          onSuccessCallback: (proof) => {
            console.log("Verification success", proof);
            setProofVerified(true);
          },
          onFailureCallback: (error) => {
            console.error("Verification failed", error);
          },
        });
      }
    } catch (error) {
      console.error("Error generating verification request: ", error);
    }
  }

  const handleValueChange = (value) => {
    setSelectedProofValue(value);
  };

  useEffect(() => {
    generateVerificationRequest();
  }, [selectedProofValue]);

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-start items-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <div className="flex items-center justify-between mb-6">
            <Options onValueChange={handleValueChange} />
            <h1 className="flex-1 text-2xl font-bold text-gray-900 text-center">
              {proofVerified
                ? "Proof Verified Successfully"
                : "Verify Your Proof"}
            </h1>
          </div>
          <p className="text-gray-600 text-center mb-4">
            Verify your MetaMask account using Reclaim protocol. It is safe and
            secure. Don't worry, we will not access your personal info. It is
            totally secure.
          </p>
          <div>Selected Value: {selectedProofValue}</div>
          {proofVerified && (
            <h2 className="text-green-600 text-center mb-4">
              Your proof with {selectedProofValue} has been verified!
            </h2>
          )}
          <div className="flex flex-col items-center m-5">
            {!url ? (
              <button
                onClick={generateVerificationRequest}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full mb-4 shadow-md transform transition duration-300 hover:scale-105"
              >
                Create Claim QR Code
              </button>
            ) : (
              <div className="mt-4">
                <QRCode value={url} size={200} />
                <p className="text-gray-600 text-center mt-4">
                  Scan the QR code with your MetaMask wallet to verify your
                  proof.
                </p>

                <p className="text-gray-600 text-center mt-4">url: {url}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
