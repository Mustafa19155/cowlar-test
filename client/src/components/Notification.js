import React, { useEffect, useState } from "react";
import { Button, Toast, ToastBody } from "reactstrap";

export default function Notification({ message, setmessage }) {
  useEffect(() => {
    let timeout = setTimeout(() => {
      setmessage(null);
    }, 15000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Toast
      className={`bg-${message?.success ? "secondary" : "danger"}`}
      isOpen={message ? true : false}
      style={{
        width: "280px",
        height: "60px",
      }}
    >
      <ToastBody className="d-flex justify-content-between align-items-center h-100">
        <h6 className="text-white p-0 m-0">{message?.message}</h6>
        <Button
          className="p-0 m-0 px-2 rounded bg-light text-dark fw-bold"
          onClick={() => {
            setmessage(null);
          }}
        >
          X
        </Button>
      </ToastBody>
    </Toast>
  );
}
