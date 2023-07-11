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
      className={`bg-${message?.success ? "success" : "danger"}`}
      isOpen={message ? true : false}
      style={{
        width: "280px",
        height: "60px",
      }}
    >
      <ToastBody>
        <h6 style={{ color: "white", display: "inline", marginRight: "20px" }}>
          {message?.message}
        </h6>
        <Button
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
