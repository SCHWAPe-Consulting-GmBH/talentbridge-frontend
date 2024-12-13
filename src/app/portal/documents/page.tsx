'use client';

import { useAuth } from "@/firebase/context/authContext";
import { useEffect, useState } from "react";

const PortalDocuments = () => {
  // const { currentUser } = useAuth();
  // const [document, setDocument] = useState(null);
  // useEffect(() => {
  //   const fetchMeeting = async (id) => {
  //     try {
  //       const documentData = await getDocumentByStudentId(id);
  //       setDocument(documentData);
  //     } catch (error) {
  //       console.error('Error fetching homework:', error);
  //     }
  //   };

  //   if (currentUser) fetchMeeting(currentUser.uid);
  // }, [currentUser]);
  return (
    <div className="mb-30px">
      <p>Documents</p>
    </div>
  );
};

export default PortalDocuments;
