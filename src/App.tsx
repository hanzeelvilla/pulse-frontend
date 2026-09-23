import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { io } from "socket.io-client";
import { z } from "zod";

const schema = z.object({
  text: z
    .string()
    .trim()
    .min(1, "Text is required")
    .max(100, "Max 100 characters"),
});

type FormValues = z.infer<typeof schema>;

const socket = io("/frontend");

export const App = () => {
  const [connected, setConnected] = useState(socket.connected);
  const [displayText, setDisplayText] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  useEffect(() => {
    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("display-text", setDisplayText);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("display-text", setDisplayText);
    };
  }, []);

  const onSubmit = ({ text }: FormValues) => socket.emit("set-free-text", text);

  return (
    <main className="mx-auto max-w-md space-y-4 p-6">
      <h1 className="text-2xl font-bold">Pulse</h1>
      <p className={connected ? "text-green-600" : "text-red-600"}>
        {connected ? "Connected" : "Disconnected"}
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <input
          {...register("text")}
          placeholder="Text to display"
          className="w-full rounded border p-2"
        />
        {errors.text && (
          <p className="text-sm text-red-600">{errors.text.message}</p>
        )}
        <button
          type="submit"
          disabled={!connected}
          className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          Send
        </button>
      </form>
      <p>
        Currently on display: <strong>{displayText}</strong>
      </p>
    </main>
  );
};
