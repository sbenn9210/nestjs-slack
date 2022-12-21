export async function fetchItems(path: string) {
  const request = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${path}`);
  return await request.json();
}

export async function createChannel(values: any, path: string) {
  let { roomName, description } = values;

  roomName = roomName.trim();

  const newChannel = {
    name: roomName,
    description: description,
    public: false
  };

  const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newChannel)
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/${path}`,
    settings
  );
  const channel = await res.json();

  return channel;
}
