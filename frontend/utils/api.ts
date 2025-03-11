export const saveMessage = async (sender: string, message: string) => {
    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender, message }),
    });
  };
  
  export const fetchMessages = async () => {
    const response = await fetch("/api/messages");
    return response.json();
  };
  