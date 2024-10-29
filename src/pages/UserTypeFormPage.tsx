import { useState, useEffect } from "react";
import { useParams } from "wouter";

/* Components */
import Page from "../components/layouts/Page";
import UserTypeForm from "../components/Shared/UserTypeForm";

export default function UserTypeFormPage() {
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [titlePage, setTitlePage] = useState("Detalle Tipo de Usuario");
  const params = useParams();
  useEffect(() => {
    if (params.id) {
      setCurrentId(parseInt(params.id));
    } else {
      setTitlePage("Crear Tipo de Usuario");
    }
  });
  return (
    <Page titlePage={titlePage}>
      <UserTypeForm id={currentId} />
    </Page>
  );
}
