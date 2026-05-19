"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  Moon,
  Sun,
  Mic,
} from "lucide-react";

export default function Home() {
  const [message, setMessage] =
    useState("");
  const [messages, setMessages] =
    useState<
      {
        role: string;
        content: string;
      }[]
    >([]);
  const [loading, setLoading] =
    useState(false);
  const [darkMode, setDarkMode] =
    useState(true);

  async function sendMessage() {
    if (!message.trim()) return;

    const userMessage = {
      role: "user",
      content: message,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setMessage("");
    setLoading(true);

    try {
      const res = await fetch(
        "/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            message,
          }),
        }
      );

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong.",
        },
      ]);
    }

    setLoading(false);
  }

  function startVoiceInput() {
    const SpeechRecognition =
      (window as any)
        .webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Voice recognition not supported"
      );
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.onresult = (
      event: any
    ) => {
      setMessage(
        event.results[0][0].transcript
      );
    };

    recognition.start();
  }

  useEffect(() => {
    localStorage.setItem(
      "chat-history",
      JSON.stringify(messages)
    );
  }, [messages]);

  useEffect(() => {
    const saved =
      localStorage.getItem(
        "chat-history"
      );

    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  return (
    <main
      style={{
        display: "flex",
        height: "100vh",
        background: darkMode
          ? "#0f172a"
          : "#f1f5f9",
        color: darkMode
          ? "white"
          : "black",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: 260,
          background: darkMode
            ? "#111827"
            : "#e2e8f0",
          padding: 20,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2
          style={{
            fontSize: 22,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          ASASANTA AI
        </h2>

        <button
          style={{
            padding: 12,
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            marginBottom: 15,
          }}
          onClick={() =>
            setMessages([])
          }
        >
          New Chat
        </button>

        <div
          style={{
            fontSize: 14,
            opacity: 0.7,
          }}
        >
          Chat History Saved
        </div>
      </div>

      {/* Main */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Navbar */}
        <div
          style={{
            padding: 20,
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            borderBottom:
              "1px solid gray",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Menu />
            <h1>
              ASASANTA AI SUPPORT
            </h1>
          </div>

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
              color: darkMode
                ? "white"
                : "black",
            }}
          >
            {darkMode ? (
              <Sun />
            ) : (
              <Moon />
            )}
          </button>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 20,
          }}
        >
          {messages.map(
            (msg, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent:
                    msg.role ===
                    "user"
                      ? "flex-end"
                      : "flex-start",
                  marginBottom: 15,
                }}
              >
                <div
                  style={{
                    background:
                      msg.role ===
                      "user"
                        ? "#2563eb"
                        : darkMode
                        ? "#1e293b"
                        : "#cbd5e1",
                    padding: 15,
                    borderRadius: 15,
                    maxWidth: "75%",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            )
          )}

          {loading && (
            <div
              style={{
                background:
                  darkMode
                    ? "#1e293b"
                    : "#cbd5e1",
                padding: 15,
                borderRadius: 15,
                width: "fit-content",
              }}
            >
              Typing...
            </div>
          )}
        </div>

        {/* Input */}
        <div
          style={{
            padding: 20,
            display: "flex",
            gap: 10,
          }}
        >
          <input
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            placeholder="Type message..."
            style={{
              flex: 1,
              padding: 15,
              borderRadius: 12,
              border: "none",
              outline: "none",
              fontSize: 16,
              color: "black",
            }}
          />

          <button
            onClick={
              startVoiceInput
            }
            style={{
              padding: 15,
              borderRadius: 12,
              border: "none",
              cursor: "pointer",
            }}
          >
            <Mic />
          </button>

          <button
            onClick={sendMessage}
            style={{
              padding:
                "15px 25px",
              borderRadius: 12,
              border: "none",
              background:
                "#2563eb",
              color: "white",
              fontWeight:
                "bold",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}