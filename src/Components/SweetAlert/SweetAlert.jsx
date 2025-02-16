import Swal from "sweetalert2";
import { useEffect } from "react";

export default function SweetAlert({ title, text, icon, trigger }) {
  useEffect(() => {
    if (trigger) {
      Swal.fire({
        title,
        text,
        icon,
        confirmButtonText: "Close",
      });
    }
  }, [trigger]);

  return null; // الكومبوننت مش بيرجع UI، مجرد تنفيذ التأثير
}