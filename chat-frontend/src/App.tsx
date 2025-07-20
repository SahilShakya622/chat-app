import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

const API_URL = import.meta.env.VITE_FUNCTION_APP_URL;

function App() {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!isConnected || connection) return;

    const connect = async () => {
      try {
        const res = await fetch(`${API_URL}/api/negotiate`);
        const { url, accessToken } = await res.json();

        const newConnection = new signalR.HubConnectionBuilder()
          .withUrl(url, {
            accessTokenFactory: () => accessToken,
          })
          .withAutomaticReconnect()
          .build();

        newConnection.on("newMessage", (data: any) => {
          const { userId, message } = data;
          setMessages((prev) => [...prev, `${userId}: ${message}`]);
        });

        await newConnection.start();
        setConnection(newConnection);
        console.log("✅ SignalR connected!");
      } catch (err) {
        console.error("❌ SignalR connection error:", err);
      }
    };

    connect();
  }, [isConnected]);

  const joinChat = () => {
    if (name.trim()) {
      setIsConnected(true);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    await fetch(`${API_URL}/api/broadcast`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: name,
        message: message,
      }),
    });

    setMessage("");
  };

  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif", backgroundColor: "#f5f7fa", minHeight: "100vh", padding: 20 }}>
      <div style={{ maxWidth: 600, margin: "0 auto", backgroundColor: "#fff", padding: 24, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        {!isConnected ? (
          <div style={{ textAlign: "center" }}>
            <h2 style={{ color: "#333" }}>🚀 Join the Chat</h2>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                padding: "10px 14px",
                fontSize: 16,
                width: "70%",
                borderRadius: 8,
                border: "1px solid #ccc",
                marginBottom: 12,
              }}
            />
            <br />
            <button
              onClick={joinChat}
              style={{
                padding: "10px 24px",
                fontSize: 16,
                backgroundColor: "#0078d4",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              Join Chat
            </button>
          </div>
        ) : (
          <>
            <h2 style={{ color: "#333" }}>Welcome, {name} 👋</h2>

            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: 8,
                padding: 12,
                height: 300,
                overflowY: "auto",
                marginBottom: 16,
                backgroundColor: "#fafafa",
              }}
            >
              {messages.length === 0 ? (
                <p style={{ color: "#888" }}>No messages yet...</p>
              ) : (
                messages.map((msg, index) => (
                  <div key={index} style={{ marginBottom: "8px", color: "#333" }}>
                    {msg}
                  </div>
                ))
              )}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  flexGrow: 1,
                  padding: "10px",
                  fontSize: 16,
                  borderRadius: 8,
                  border: "1px solid #ccc",
                }}
              />
              <button
                onClick={sendMessage}
                style={{
                  padding: "10px 20px",
                  fontSize: 16,
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
